import { useState } from "react";
import Image from "next/image";
import style from "./index.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isActive = username !== "" && password !== "";

  const handleLoginClick = async () => {
    if (!isActive) return;
    setErrorMessage("");

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // ✅ 로그인 성공
        router.push("/information");
      } else {
        // ❌ 로그인 실패
        setErrorMessage(data.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      setErrorMessage("서버와 연결할 수 없습니다.");
      console.error(error);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLoginClick();
  };

  return (
    <div className={style.container}>
      <div className={style.icon}>
        <Image
          src="/images/Frame 2814.png"
          alt="아이콘"
          width={120}
          height={120}
        />
      </div>
      <form onSubmit={onSubmit}>
        <div className={style.form}>
          <input
            type="text"
            name="userid"
            placeholder="아이디 작성하기"
            className={style.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호 작성하기"
            className={style.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <div className={style.errorMessage}>{errorMessage}</div>
          )}
          <button
            type="submit"
            disabled={!isActive}
            className={`${style.signupButton} ${isActive ? style.active : ""}`}
          >
            로그인
          </button>
          <Link href="/signup">
            <span className={style.signupLink}>회원가입</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
