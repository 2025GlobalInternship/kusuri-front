import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import NavigationVarLayout from "@/components/navigation_var-layout";

const Calendar = () => {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 18)); // 2025년 6월 시작
  const [selectedDates, setSelectedDates] = useState<(number | null)[]>([]); // 선택된 날짜 상태 관리
  const [buttonClicked, setButtonClicked] = useState(false); // 버튼 클릭 상태 추가
  
  const today = new Date();
  const isToday = (day: number) => {
    return (
      today.getFullYear() === currentMonth.getFullYear() &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getDate() === day
    );
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
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

  const handleDateClick = (day: number) => {
    let updatedSelectedDates = [...selectedDates];
    if (updatedSelectedDates.length < 2) {
      updatedSelectedDates.push(day);
    } else {
      updatedSelectedDates = [day]; // 날짜 선택 2개를 넘지 않게 처리
    }
    setSelectedDates(updatedSelectedDates);
  };

  const isBetweenSelectedDates = (day: number) => {
    if (selectedDates.length === 2) {
      const [startDate, endDate] = selectedDates;
      if (startDate !== null && endDate !== null) {
        return day > startDate && day < endDate;
      }
    }
    return false;
  };

  const isSelectedDate = (day: number) => {
    return selectedDates.includes(day);
  };

  // 날짜 포맷팅 함수 (예: 2025년 6월 18일 -> "6월 18일")
  const formatDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const month = date.toLocaleString('ko-KR', { month: 'long' });
    const dayOfMonth = date.getDate();
    return `${month} ${dayOfMonth}일`;
  };

  // '다음' 버튼 클릭시 이동할 함수
  const goToNextPage = () => {
    setButtonClicked(true);  // 버튼 클릭 상태를 true로 변경
    router.push('/dayalram'); // 'dayalram/index.tsx'로 이동
  };

  return (
    <>
      <div className={styles.headerContainer}>
        <span className={styles.backArrow} onClick={() => router.push("/alram")}>
          {"<"}
        </span>
        <span className={styles.headerTitle}>알람 추가</span>
      </div>

      <div className={styles.headerSpacer}></div>

      <div className={styles.calendarContainer}>
        <div className={styles.monthHeader}>
          <span className={styles.arrow} onClick={goToPreviousMonth}>{"<"}</span>
          <span>{year} {month}</span>
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
              <div
                key={dayIndex}
                className={`${styles.day} 
                  ${isToday(day!) ? styles.today : ''} 
                  ${isBetweenSelectedDates(day!) ? styles.selectedBetween : ''} 
                  ${isSelectedDate(day!) ? styles.selected : ''}`}
                onClick={() => day && handleDateClick(day)}
              >
                {day}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 날짜 선택 범위 표시 */}
      <div className={styles.dateRangeContainer}>
        {selectedDates.length === 0 ? (
          <span>기간을 선택해주세요!</span>
        ) : (
          <div className={styles.dateRange}>
            <span className={styles.selectedDate}>
              {selectedDates[0] && formatDate(selectedDates[0])} 
              <span className={styles.dateSeparator}> - </span>
              {selectedDates[1] && formatDate(selectedDates[1])}
            </span>
          </div>
        )}
      </div>

      {/* "다음" 버튼 */}
      <div className={styles.nextButtonContainer}>
        <button
          className={`${styles.nextButton} ${buttonClicked ? styles.clicked : ''}`}
          onClick={goToNextPage}
          disabled={selectedDates.length !== 2}  // 날짜가 2개 선택되지 않으면 비활성화
        >
          다음
        </button>
      </div>
    </>
  );
};

export default function Page() {
  return (
    <Calendar />
  );
}
