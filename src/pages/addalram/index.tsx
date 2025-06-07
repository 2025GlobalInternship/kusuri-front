import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import HeaderLayout from "@/components/header-layout";

const Calendar = () => {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 18)); // 2025년 6월
  const [selectedDates, setSelectedDates] = useState<(number | null)[]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const today = new Date();

  const isToday = (day: number) => {
    return (
      selectedDates.length === 0 &&
      today.getFullYear() === currentMonth.getFullYear() &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getDate() === day
    );
  };

  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    let updatedSelectedDates = [...selectedDates];
    if (updatedSelectedDates.length < 2) {
      updatedSelectedDates.push(day);
    } else {
      updatedSelectedDates = [day];
    }
    setSelectedDates(updatedSelectedDates);
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

  const goToNextPage = async () => {
    if (selectedDates.length !== 2) return;

    const [startDay, endDay] = selectedDates;
    const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), startDay!);
    const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), endDay!);

    const payload = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };

    try {
      const response = await fetch('http://localhost/kusuri-back/alarm/alarm-setting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      setButtonClicked(true);
      router.push('/addtime');
    } catch (error) {
      console.error('날짜 저장 실패:', error);
      alert('날짜 저장에 실패했습니다. 다시 시도해주세요.');
    }
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
          <span className={styles.arrow} onClick={goToPreviousMonth}>{"<"}</span>
          <span>{year} {month}</span>
          <span className={styles.arrow} onClick={goToNextMonth}>{">"}</span>
        </div>

        <div className={styles.daysOfWeek}>
          {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => <div key={i}>{d}</div>)}
        </div>

        {days.map((week, i) => (
          <div key={i} className={styles.week}>
            {week.map((day, j) => (
              <div
                key={j}
                className={`${styles.day} 
                  ${day && isToday(day) ? styles.today : ''} 
                  ${day && isBetweenSelectedDates(day) ? styles.selectedBetween : ''} 
                  ${day && isSelectedDate(day) ? styles.selected : ''}`}
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
