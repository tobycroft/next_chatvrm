import type {NextApiRequest, NextApiResponse} from "next";
import {aigc_tts} from "@/features/aigc/tts";

type Data = {
    audio: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const message = req.body.message;
    const style = req.body.style;
    const apiKey = req.body.apiKey;

    const voice = await aigc_tts(
        apiKey,
        message,
        style
    );

    res.status(200).json(voice);
}
