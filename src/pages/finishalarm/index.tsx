'use client';

import styles from './index.module.css';
import { useRouter } from 'next/router';

export default function FinishAlarmPage() {
  const router = useRouter();

  const handleGoMain = () => {
    router.push('/main');
  };

  return (
    <div className={styles.container}>
      <img src="/images/alarm-finish.png" alt="Finish Alarm" className={styles.image} />
      <p className={styles.text}>
        성공적으로<br />알람이 예약됐습니다.
      </p>
      <button className={styles.nextButton} onClick={handleGoMain}>
        다음
      </button>
    </div>
  );
}
