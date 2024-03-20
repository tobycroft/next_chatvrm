import {Configuration, OpenAIApi} from "openai";
import {Message} from "../messages/messages";

export async function getChatResponse(messages: Message[], apiKey: string) {
    if (!apiKey) {
        throw new Error("Invalid API Key");
    }

    const configuration = new Configuration({
        apiKey: apiKey,
    });
    // ブラウザからAPIを叩くときに発生するエラーを無くすworkaround
    // https://github.com/openai/openai-node/issues/6#issuecomment-1492814621
    delete configuration.baseOptions.headers["User-Agent"];

    const openai = new OpenAIApi(configuration);

    const {data} = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
    });

    const [aiRes] = data.choices;
    const message = aiRes.message?.content || "エラーが発生しました";

    return {message: message};
}

export async function getChatResponseStream(
    messages: Message[],
    apiKey: string
) {
    if (!apiKey) {
        throw new Error("Invalid API Key");
    }
    console.log("message", messages[messages.length - 1].content)
    const data = new URLSearchParams();
    data.append("text", messages[messages.length - 1].content)
    const res = await fetch("http://10.0.0.182:84/v1/aigc/gemini/test?token=" + apiKey, {
        method: "POST",
        body: data,
    })

    const reader = res.body?.getReader();
    if (res.status !== 200 || !reader) {
        throw new Error("Something went wrong");
    }

    const stream = new ReadableStream({
        async start(controller: ReadableStreamDefaultController) {
            const decoder = new TextDecoder("utf-8");
            try {
                while (true) {
                    const {done, value} = await reader.read();
                    if (done) break;
                    const data = decoder.decode(value);
                    const chunks = JSON.parse(data)["echo"].split("\n")
                    console.log("echo:", JSON.parse(data)["echo"])
                    // .filter((val) => !!val && val.trim() !== "[DONE]");

                    for (const chunk of chunks) {
                        // console.log(chunk)
                        controller.enqueue(chunk)
                        //sleep for 1000ms
                        // await new Promise((resolve) => setTimeout(resolve, 1000));
                    }
                }
            } catch (error) {
                controller.error(error);
            } finally {
                reader.releaseLock();
                controller.close();
            }
        },
    });

    return stream;
}
