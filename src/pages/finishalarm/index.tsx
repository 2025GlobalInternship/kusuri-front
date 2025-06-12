'use client';

import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { useRouter } from 'next/router';

export default function FinishAlarmPage() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [payload, setPayload] = useState({
    start_day: '',
    last_day: '',
    time: '',
    day_type: '',
    medicine: '',
    timeslot: '',
  });

  useEffect(() => {
    if (router.isReady) {
      const { start_day, last_day, time, day_type, medicine, timeslot } = router.query;

      if (!start_day || !last_day || !time || !day_type) {
        alert('필수 데이터가 누락되어 있습니다.');
        return;
      }

      const payload = {
        start_day,
        last_day, 
        time,
        day_type,
        medicine_id: router.query.medicine_id, // 추가 필요
        medicine: medicine || '약 이름 없음',
      };

      setIsReady(true);
    }
  }, [router.isReady, router.query]);

  const handleNextClick = async () => {
    if (!isReady || submitting) return;

    setIsClicked(true);
    setSubmitting(true);

    try {
      const res = await fetch('/api/alarms/alarm-setting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API 오류: ${res.status} - ${text}`);
      }

      // 성공 시 다음 페이지 이동
      router.push('/main');
    } catch (e: any) {
      alert(`알람 저장 실패: ${e.message}`);
      console.error('알람 저장 실패:', e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <img src="/images/alarm-finish.png" alt="Finish Alarm" className={styles.image} />
      <p className={styles.text}>
        성공적으로<br />알람이 예약됐습니다.
      </p>
      <button
        className={`${styles.nextButton} ${isClicked ? styles.clicked : ''}`}
        onClick={handleNextClick}
        disabled={submitting || !isReady}
      >
        {submitting ? '저장 중...' : '다음'}
      </button>
    </div>
  );
}
