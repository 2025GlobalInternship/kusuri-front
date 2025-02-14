import style from "./chatIcon-layout.module.css";
import Image from "next/image";

import chatIcon from "../../public/images/chatIcon.png";
import chatText from "../../public/images/chatText.png";

export default function ChatIconLayout() {
    return (
        <div className={style.chatCon}>
            <div className={style.chatBubbleCon}>
                <Image id={style.chatBubble} src={chatText} alt="말풍선" />
                <span id={style.chatBubbleTxt}>더 자세한 증상은 AI와 대화해 보세요!</span>
            </div>
            <Image id={style.chatIcon} src={chatIcon} alt="챗" />
        </div>
    )
}