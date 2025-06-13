'use client';

import styles from './index.module.css';
import { useRouter } from 'next/router';

export default function FailAlarmPage() {
  const router = useRouter();

  const handleRetry = () => {
    router.push('/main')
  };

  return (
    <div className={styles.container}>
      <img src="/images/calcelalram.png" alt="Fail Alarm" className={styles.image} />
      <p className={styles.text}>
        알람 설정에<br />실패했습니다.
      </p>
      <button className={styles.nextButton} onClick={handleRetry}>
        확인
      </button>
    </div>
  );
}
