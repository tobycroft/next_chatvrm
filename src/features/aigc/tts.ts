export async function aigc_tts(
    apiKey:string,
    message: string,
    style: "talk" | "happy" | "sad",
) {
    // Request body

    const fd = new URLSearchParams();
    fd.append("text", message)
    const koeiroRes = await fetch(
        "http://10.0.0.182:84/v1/tts/tts/text?token=" + apiKey,
        {
            method: "POST",
            body: fd,
        }
    );

    const data = (await koeiroRes.json()) as any;

    return {audio: data.echo};
}
