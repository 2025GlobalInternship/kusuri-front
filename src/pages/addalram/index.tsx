import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import HeaderLayout from '@/components/header-layout';

const Calendar = () => {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 18));
  const [selectedDates, setSelectedDates] = useState<(number | null)[]>([]);

  const today = new Date();

  const isToday = (day: number) =>
    selectedDates.length === 0 &&
    today.getFullYear() === currentMonth.getFullYear() &&
    today.getMonth() === currentMonth.getMonth() &&
    today.getDate() === day;

  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const goToPreviousMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));

  const goToNextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const handleDateClick = (day: number) => {
    let updated = [...selectedDates];
    if (updated.length < 2) updated.push(day);
    else updated = [day];
    setSelectedDates(updated);
  };

  const isSelectedDate = (day: number) => selectedDates.includes(day);

  const isBetweenSelectedDates = (day: number) => {
    if (selectedDates.length === 2) {
      const [start, end] = selectedDates;
      return start !== null && end !== null && day > start && day < end;
    }
    return false;
  };

  const formatDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const month = date.toLocaleString('ko-KR', { month: 'long' });
    return `${month} ${day}일`;
  };

  const goToNextPage = () => {
    if (selectedDates.length !== 2) return;

    const [s, e] = selectedDates.sort((a, b) => (a! - b!));
    const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), s!);
    const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), e!);

    const start = startDate.toISOString().split('T')[0];
    const last = endDate.toISOString().split('T')[0];

    router.push({
      pathname: '/addtime',
      query: { start_day: start, last_day: last },
    });
  };

  const month = currentMonth.toLocaleString('ko-KR', { month: 'long' });
  const year = currentMonth.getFullYear();
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  const days: (number | null)[][] = [];
  let week: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) week.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    week.push(i);
    if (week.length === 7) {
      days.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    days.push(week);
  }

  return (
    <>
      <div className={styles.calendarContainer}>
        <div className={styles.monthHeader}>
          <span className={styles.arrow} onClick={goToPreviousMonth}>{'<'}</span>
          <span>{year} {month}</span>
          <span className={styles.arrow} onClick={goToNextMonth}>{'>'}</span>
        </div>
        <div className={styles.daysOfWeek}>
          {['일','월','화','수','목','금','토'].map((d, i) => <div key={i}>{d}</div>)}
        </div>
        {days.map((week, i) => (
          <div key={i} className={styles.week}>
            {week.map((day, j) => (
              <div
                key={j}
                className={`
                  ${styles.day} 
                  ${day && isToday(day) ? styles.today : ''} 
                  ${day && isBetweenSelectedDates(day) ? styles.selectedBetween : ''} 
                  ${day && isSelectedDate(day) ? styles.selected : ''}
                `}
                onClick={() => day && handleDateClick(day)}
              >
                {day}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.dateRangeContainer}>
        {selectedDates.length === 0 ? (
          <span>기간을 선택해주세요!</span>
        ) : (
          <div className={styles.dateRange}>
            <span className={styles.selectedDate}>
              {selectedDates[0] ? formatDate(selectedDates[0]) : <span className={styles.emptyDate}>가짜 날짜</span>}
            </span>
            <span className={styles.dateSeparator}> - </span>
            <span className={styles.selectedDate}>
              {selectedDates[1] ? formatDate(selectedDates[1]) : <span className={styles.emptyDate}>가짜 날짜</span>}
            </span>
          </div>
        )}
      </div>

      <div className={styles.nextButtonContainer}>
        <button
          className={`${styles.nextButton} ${selectedDates.length === 2 ? styles.clicked : ''}`}
          onClick={goToNextPage}
          disabled={selectedDates.length !== 2}
        >
          다음
        </button>
      </div>
    </>
  );
};

export default function Page() {
  return (
    <>
      <HeaderLayout>알람추가</HeaderLayout>
      <Calendar />
    </>
  );
}
