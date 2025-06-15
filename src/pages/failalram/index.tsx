'use client';

import styles from './index.module.css';
import { useRouter } from 'next/router';

export default function FailAlarmPage() {
  const router = useRouter();

  // router.push 이후 로딩 상태를 렌더링하지 않게 하기
const handleRetry = () => {
  router.push('/main'); // 아무 상태 변화 없이 바로 전환
};


  return (
    <div className={styles.container}>
      <img src="/images/cancelalram.png" alt="Fail Alarm" className={styles.image} />
      <p className={styles.text}>
        알람 설정에<br />실패했습니다.
      </p>
      <button className={styles.nextButton} onClick={handleRetry}>
        확인
      </button>
    </div>
  );
}
