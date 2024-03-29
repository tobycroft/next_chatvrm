import React from "react";
import {IconButton} from "./iconButton";
import {Message} from "@/features/messages/messages";
import {KoeiroParam} from "@/features/constants/koeiroParam";

type Props = {
    username: string;
    password: string;
    openAiKey: string;
    systemPrompt: string;
    chatLog: Message[];
    koeiroParam: KoeiroParam;
    koeiromapKey: string;
    onClickClose: () => void;
    onChangeAiKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeSystemPrompt: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onChangeChatLog: (index: number, text: string) => void;
    onChangeKoeiroParam: (x: number, y: number) => void;
    onClickOpenVrmFile: () => void;
    onClickResetChatLog: () => void;
    onClickResetSystemPrompt: () => void;
    onChangeKoeiromapKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Settings = ({
                             username,
                             password,
                             openAiKey,
                             chatLog,
                             systemPrompt,
                             koeiroParam,
                             koeiromapKey,
                             onClickClose,
                             onChangeSystemPrompt,
                             onChangeAiKey,
                             onChangeChatLog,
                             onChangeKoeiroParam,
                             onClickOpenVrmFile,
                             onClickResetChatLog,
                             onClickResetSystemPrompt,
                             onChangeKoeiromapKey,
                         }: Props) => {
    return (
        <div className="absolute z-40 w-full h-full bg-white/80 backdrop-blur ">
            <div className="absolute m-24">
                <IconButton
                    iconName="24/Close"
                    isProcessing={false}
                    onClick={onClickClose}
                ></IconButton>
            </div>
            <div className="max-h-full overflow-auto">
                <div className="text-text1 max-w-3xl mx-auto px-24 py-64 ">
                    <div className="my-24 typography-32">登录</div>
                    <div className="my-24">
                        <div className="my-16 typography-20">username：</div>
                        <input
                            className="text-ellipsis px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
                            type="text"
                            placeholder="这里填写用户名"
                            value={username}
                            onChange={onChangeAiKey}
                        />

                        <div className="my-16 typography-20">password：</div>
                        <input
                            className="text-ellipsis px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
                            type="password"
                            placeholder="这里填写密码"
                            value={password}
                            onChange={onChangeAiKey}
                        />
                        <div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    // 在这里处理提交逻辑
                                    alert("提交成功");
                                }}
                            >
                                提交
                            </button>
                        </div>
                    </div>

                    {/* 其他部分的代码注释掉了 */}
                </div>
            </div>
        </div>
    );
};
