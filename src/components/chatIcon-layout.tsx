import style from "./chatIcon-layout.module.css";
import Image from "next/image";

import chatIcon from "../../public/images/chatIcon.png";
import chatText from "../../public/images/chatTxt.png";
import { useEffect, useRef } from "react";

export default function ChatIconLayout() {
    const chatBubbleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chatBubbleRef.current) return;
        const chatBubble = chatBubbleRef.current;
        chatBubble?.classList.add(style.fadein);
        chatBubble.addEventListener("animationend", () => {
            if(chatBubble) {
                chatBubble.classList.remove(style.fadein);
                setTimeout(() => {
                    if(chatBubble) {
                        chatBubble.classList.add(style.fadeout);
                    }
                }, 5000);
            }
        })
    }, []);

    return (
        <div className={style.chatCon}>
            <div className={style.chatBubbleCon} ref={chatBubbleRef} >
                <Image id={style.chatBubble} src={chatText} alt="말풍선" priority />
                <span id={style.chatBubbleTxt}>더 자세한 증상은 AI와 대화해 보세요!</span>
            </div>
            <Image id={style.chatIcon} src={chatIcon} alt="챗" />
        </div>
    )
}