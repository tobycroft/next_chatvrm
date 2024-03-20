import { TalkStyle } from "../messages/messages";

export async function koeiromapV0(
  message: string,
  speakerX: number,
  speakerY: number,
  style: TalkStyle
) {
  const param = {
    method: "POST",
    body: JSON.stringify({
      text: message,
      speaker_x: speakerX,
      speaker_y: speakerY,
      style: style,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const koeiroRes = await fetch(
    "https://api.rinna.co.jp/models/cttse/koeiro",
    param
  );

  const data = (await koeiroRes.json()) as any;

  return { audio: data.audio };
}

export async function koeiromapFreeV1(
  message: string,
  speakerX: number,
  speakerY: number,
  style: "talk" | "happy" | "sad",
  apiKey: string
) {
  // Request body

  const fd = new URLSearchParams();
  fd.append("text",message)
  const koeiroRes = await fetch(
    "http://10.0.0.182:84/v1/tts/tts/text?token="+apiKey,
    {
      method: "POST",
      body: fd,
    }
  );

  const data = (await koeiroRes.json()) as any;

  return { audio: data.echo };
}
