import React, { useState } from 'react';
import styles from './index.module.css';
import NavigationVarLayout from "@/components/navigation_var-layout";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 18)); // 2025년 3월 시작

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const month = currentMonth.toLocaleString('ko-KR', { month: 'long' });
  const year = currentMonth.getFullYear();
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);

  const days: (number | null)[][] = [];
  let week: (number | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    week.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    week.push(i);
    if (week.length === 7) {
      days.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    days.push(week);
  }

  return (
    <>
      {/* 헤더 */}
      <div className={styles.headerContainer}>전체 캘린더</div>

      {/* 헤더 아래 여백 */}
      <div className={styles.headerSpacer}></div>

      {/* 캘린더 */}
      <div className={styles.calendarContainer}>
        <div className={styles.monthHeader}>
          {/* 이전 달 이동 버튼 */}
          <span className={styles.arrow} onClick={goToPreviousMonth}>{"<"}</span>
          <span>{year} {month}</span>
          {/* 다음 달 이동 버튼 */}
          <span className={styles.arrow} onClick={goToNextMonth}>{">"}</span>
        </div>

        <div className={styles.daysOfWeek}>
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>

        {days.map((week, index) => (
          <div key={index} className={styles.week}>
            {week.map((day, dayIndex) => (
              <div key={dayIndex} className={styles.day}>
                {day}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default function Page() {
  return (
    <>
      <Calendar />
    </>
  );
}
