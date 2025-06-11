'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';
import HeaderLayout from '@/components/header-layout';
import { useRouter } from 'next/router';

const ITEM_HEIGHT = 40;
const VISIBLE_COUNT = 5;
const CENTER_INDEX = Math.floor(VISIBLE_COUNT / 2);

const repeatOptions = [
  '매일 반복',
  '격일로 반복',
  '월요일마다 반복',
  '화요일마다 반복',
  '수요일마다 반복',
  '목요일마다 반복',
  '금요일마다 반복',
  '토요일마다 반복',
  '일요일마다 반복',
];

const AddTime = () => {
  const router = useRouter();
  const [hour, setHour] = useState('08');
  const [minute, setMinute] = useState('00');
  const [ampm, setAmpm] = useState('AM');
  const [selectedRepeat, setSelectedRepeat] = useState('');
  const [repeatOpen, setRepeatOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const start_day = router.query.start_day as string;
  const last_day = router.query.last_day as string;

  const isComplete = hour && minute && ampm && selectedRepeat;

  const hoursRaw = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutesRaw = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  const ampmRaw = ['AM', 'PM'];

  const repeatCount = 30;

  const hours = Array.from({ length: hoursRaw.length * repeatCount }, (_, i) => hoursRaw[i % hoursRaw.length]);
  const minutes = Array.from({ length: minutesRaw.length * repeatCount }, (_, i) => minutesRaw[i % minutesRaw.length]);
  const ampmList = ['', '', 'AM', 'PM', '', ''];

  const renderWheel = (
    items: string[],
    selected: string,
    onSelect: (val: string) => void,
    isAmpm = false
  ) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref.current) {
        const selectedIndex = items.findIndex(item => item === selected);
        const scrollTop = (selectedIndex - CENTER_INDEX) * ITEM_HEIGHT;
        ref.current.scrollTop = scrollTop >= 0 ? scrollTop : 0;
      }
    }, [items.length]);

    const handleScroll = () => {
      if (!ref.current) return;

      const scrollTop = ref.current.scrollTop;
      const index = Math.round(scrollTop / ITEM_HEIGHT) + CENTER_INDEX;

      if (index >= 0 && index < items.length) {
        const value = items[index];
        if (value && value !== selected && value !== '') {
          onSelect(value);
        }
      }

      if (!isAmpm && items.length > 20) {
        const buffer = ITEM_HEIGHT * 20;
        if (
          scrollTop < buffer ||
          scrollTop > ref.current.scrollHeight - ref.current.clientHeight - buffer
        ) {
          const visibleCount = items.length / repeatCount;
          const offset = (index - CENTER_INDEX) % visibleCount;
          const base =
            Math.floor(items.length / 2) - (Math.floor(items.length / 2) % visibleCount);
          ref.current.scrollTop = (base + offset) * ITEM_HEIGHT - CENTER_INDEX * ITEM_HEIGHT;
        }
      }
    };

    return (
      <div
        className={styles.wheelContainer}
        onScroll={handleScroll}
        ref={ref}
        style={{ height: ITEM_HEIGHT * VISIBLE_COUNT }}
      >
        {items.map((item, i) => {
          const centerIndex = Math.round(ref.current?.scrollTop! / ITEM_HEIGHT) + CENTER_INDEX;
          const isSelected = i === centerIndex && item !== '';
          return (
            <div
              key={i}
              className={`${styles.wheelItem} ${isSelected ? styles.selected : ''}`}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  const handleSubmit = async () => {
    if (!isComplete || !start_day || !last_day) return;

    setSubmitting(true);

    // AM/PM + 시/분 → 24시간 변환
    let parsedHour = parseInt(hour);
    if (ampm === 'PM' && parsedHour !== 12) parsedHour += 12;
    if (ampm === 'AM' && parsedHour === 12) parsedHour = 0;

    const timeString = `${String(parsedHour).padStart(2, '0')}:${minute}`;

    const payload = {
      start_day,
      last_day,
      time: timeString,
      day_type: selectedRepeat,
    };

    try {
      const response = await fetch('/api/alarms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('서버 오류');

      router.push('/finishalarm');
    } catch (error) {
      alert('알람 저장에 실패했습니다.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <HeaderLayout>알람추가</HeaderLayout>
      <div className={styles.wrapper}>
        <div className={styles.wheelWrapper}>
          <div className={styles.centerOverlay} />
          {renderWheel(hours, hour, setHour)}
          {renderWheel(minutes, minute, setMinute)}
          {renderWheel(ampmList, ampm, setAmpm, true)}
        </div>

        <div className={styles.dropdownWrapper}>
          <div
            className={styles.selectedBox}
            onClick={() => setRepeatOpen((prev) => !prev)}
          >
            {selectedRepeat || '반복 설정 선택'}
            <span className={styles.arrow}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: repeatOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#ccc"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {repeatOpen && (
            <div className={styles.optionList}>
              {repeatOptions.map((option) => (
                <div
                  key={option}
                  className={styles.optionItem}
                  onClick={() => {
                    setSelectedRepeat(option);
                    setRepeatOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.nextButtonContainer}>
        <button
          className={`${styles.nextButton} ${isComplete ? styles.clicked : ''}`}
          onClick={handleSubmit}
          disabled={!isComplete || submitting}
        >
          {submitting ? '저장 중...' : '다음'}
        </button>
      </div>
    </>
  );
};

export default AddTime;
