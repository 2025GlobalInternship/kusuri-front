import React, { useState } from 'react';
import styles from './index.module.css';
import Link from 'next/link';

export default function FinishAlarmPage() {
  const [isClicked, setIsClicked] = useState(false);

  const handleNextClick = () => {
    setIsClicked(true);
  };

  return (
    <div className={styles.container}>
      <img src="/images/alarm-finish.png" alt="Finish Alarm" className={styles.image} />
      <p className={styles.text}>성공적으로<br />알람이 예약됐습니다.</p>

      <Link href="/next-page">
        <button
          className={`${styles.nextButton} ${isClicked ? styles.clicked : ''}`}
          onClick={handleNextClick}
        >
          다음
        </button>
      </Link>
    </div>
  );
}
