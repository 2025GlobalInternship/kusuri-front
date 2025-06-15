import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import HeaderLayout from "@/components/header-layout";

type Alarm = {
  id: number;
  user_id: string;
  medicine: string;
  time: string;
  timeslot: string;
  days: string;
  start_day: string;
  last_day: string;
  state: string;
};

const Calendar = () => {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 18)); // 2025년 6월 시작
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  useEffect(() => {
    fetch('/api/alarms/alarm')
      .then(res => res.json())
      .then(data => setAlarms(data))
      .catch(err => console.error("알람 데이터를 가져오는 중 오류:", err));
  }, []);

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

  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isAlarmDay = (day: number): boolean => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return alarms.some(alarm => {
      const start = new Date(alarm.start_day);
      const end = new Date(alarm.last_day);
      return date >= start && date <= end;
    });
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
              className={`${styles.day} ${day !== null && isToday(day) ? styles.today : ""}`}
            >
              {day !== null && (
                <>
                  {day}
                  {isAlarmDay(day) && (
                    <img
                      src="/images/greenmedicine.png"
                      alt="alarm"
                      className={styles.alarmIcon}
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function Page() {
  return (
    <>
      <HeaderLayout>전체 캘린더</HeaderLayout>
      <Calendar />
    </>
  );
}
