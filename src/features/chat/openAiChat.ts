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
    console.log(messages[messages.length - 1].content)
    const data = new URLSearchParams();
    data.append("text", messages[messages.length - 1].content)
    const res = await fetch("http://10.0.0.182:84/v1/aigc/gemini/text?token=" + apiKey, {
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
                controller.enqueue(decoder);
                while (true) {
                    const {done, value} = await reader.read();
                    if (done) break;
                    const data = decoder.decode(value);
                    // console.log(data)
                    const chunks = JSON.parse(data)["echo"]
                        .split("\\r\\n")
                        // .filter((val) => !!val && val.trim() !== "[DONE]");
                    for (const chunk of chunks) {
                        // const json = JSON.parse(chunk);
                        // console.log(chunk)
                        // const messagePiece = json.choices[0].delta.content;
                        // if (!!messagePiece) {
                        //     controller.enqueue(messagePiece);
                        // }

                        controller.enqueue(chunk)
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
