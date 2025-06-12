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
    timeslot: '', // ✅ 추가
  });

  useEffect(() => {
    if (router.isReady) {
      const { start_day, last_day, time, day_type, medicine, timeslot } = router.query;

      if (!start_day || !last_day || !time || !day_type || !timeslot) {
        alert('필수 데이터가 누락되어 있습니다.');
        return;
      }

      setPayload({
        start_day: Array.isArray(start_day) ? start_day[0] : start_day,
        last_day: Array.isArray(last_day) ? last_day[0] : last_day,
        time: Array.isArray(time) ? time[0] : time,
        day_type: Array.isArray(day_type) ? day_type[0] : day_type,
        medicine: medicine ? (Array.isArray(medicine) ? medicine[0] : medicine) : '약 이름 없음',
        timeslot: Array.isArray(timeslot) ? timeslot[0] : timeslot, // ✅ 추가
      });

      setIsReady(true);
    }
  }, [router.isReady, router.query]);

  const handleNextClick = async () => {
    if (!isReady || submitting) return;

    setIsClicked(true);
    setSubmitting(true);

    console.log(payload); // payload 확인용

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
