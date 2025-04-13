'use client';

import { useState, useEffect, useRef } from "react";
import styles from "./TimePicker.module.css";

const generateLoopArray = (start: number, end: number, repeat = 3) => {
    const base = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    return Array(repeat).fill(base).flat();
};

const useCenteredScroll = (
    ref: React.RefObject<HTMLDivElement>,
    items: any[],
    setSelected: (val: any) => void,
    shouldRepeat = true,
    initialValue?: any
) => {
    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const itemHeight = 40;

        const scrollToCenter = () => {
            let index = items.indexOf(initialValue);
            if (index === -1) index = 0;

            if (shouldRepeat) {
                const offsetIndex = items.length + index;
                container.scrollTop = offsetIndex * itemHeight;
            } else {
                container.scrollTop = index * itemHeight;
            }
        };

        scrollToCenter();

        let timeout: NodeJS.Timeout;

        const handleScrollEnd = () => {
            const children = Array.from(container.children) as HTMLDivElement[];
            const containerTop = container.getBoundingClientRect().top;
            const containerCenter = containerTop + container.clientHeight / 2;

            let closest = { index: 0, distance: Infinity };
            children.forEach((child, index) => {
                const rect = child.getBoundingClientRect();
                const itemCenter = rect.top + rect.height / 2;
                const distance = Math.abs(containerCenter - itemCenter);
                if (distance < closest.distance) {
                    closest = { index, distance };
                }
            });

            const selectedItem = children[closest.index];
            const selected = selectedItem?.textContent;

            if (selected !== undefined) {
                // 정확히 중앙으로 정렬
                const scrollOffset = selectedItem.offsetTop - container.clientHeight / 2 + itemHeight / 2;
                container.scrollTo({ top: scrollOffset, behavior: "smooth" });

                // 선택 값 업데이트
                setSelected(isNaN(Number(selected)) ? selected : Number(selected));
            }
        };

        const handleScroll = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                handleScrollEnd();
            }, 100); // 100ms 뒤에 멈췄다고 판단
        };

        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
            clearTimeout(timeout);
        };
    }, [ref, items, setSelected, shouldRepeat, initialValue]);
};


const TimePicker = () => {
    const now = new Date();
    const initialHour = now.getHours() % 12 || 12;
    const initialMinute = now.getMinutes();
    const initialAMPM = now.getHours() >= 12 ? "PM" : "AM";

    const baseHours = Array.from({ length: 12 }, (_, i) => i + 1);
    const baseMinutes = Array.from({ length: 60 }, (_, i) => i);
    const ampm = ["AM", "PM"];

    const repeatCount = 3; // 반복 횟수 (각각 한 개만 보이도록 적당히 반복)
    const hourItems = generateLoopArray(1, 12, repeatCount);
    const minuteItems = generateLoopArray(0, 59, repeatCount);
    const ampmItems = ["AM", "PM"];

    const hourRef = useRef<HTMLDivElement>(null);
    const minuteRef = useRef<HTMLDivElement>(null);
    const ampmRef = useRef<HTMLDivElement>(null);

    const [selectedHour, setSelectedHour] = useState(initialHour);
    const [selectedMinute, setSelectedMinute] = useState(initialMinute);
    const [selectedAMPM, setSelectedAMPM] = useState(initialAMPM);

    useCenteredScroll(hourRef, baseHours, setSelectedHour, true, initialHour);
    useCenteredScroll(minuteRef, baseMinutes, setSelectedMinute, true, initialMinute);
    useCenteredScroll(ampmRef, ampmItems, setSelectedAMPM, true, initialAMPM); // AM/PM 스크롤이 가능하게 설정

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const newHour = now.getHours() % 12 || 12;
            const newMinute = now.getMinutes();
            const newAMPM = now.getHours() >= 12 ? "PM" : "AM";

            setSelectedHour(newHour);
            setSelectedMinute(newMinute);
            setSelectedAMPM(newAMPM);

            const hourIndex = baseHours.indexOf(newHour);
            const minuteIndex = baseMinutes.indexOf(newMinute);
            const ampmIndex = ampmItems.indexOf(newAMPM);

            const itemHeight = 40;

            if (hourRef.current) {
                const baseLength = hourItems.length / repeatCount;
                const targetIndex = baseLength * Math.floor(repeatCount / 2) + hourIndex;
                hourRef.current.scrollTo({ top: targetIndex * itemHeight, behavior: "smooth" });
            }
            if (minuteRef.current) {
                const baseLength = minuteItems.length / repeatCount;
                const targetIndex = baseLength * Math.floor(repeatCount / 2) + minuteIndex;
                minuteRef.current.scrollTo({ top: targetIndex * itemHeight, behavior: "smooth" });
            }
            if (ampmRef.current) {
                const baseLength = ampmItems.length;
                const targetIndex = ampmIndex;
                ampmRef.current.scrollTo({ top: targetIndex * itemHeight, behavior: "smooth" });
            }
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.column} ref={hourRef}>
                {hourItems.map((hour, idx) => (
                    <div
                        key={`hour-${idx}`}
                        className={`${styles.item} ${hour === selectedHour ? styles.selected : ""}`}
                    >
                        {hour}
                    </div>
                ))}
            </div>
            <div className={styles.column} ref={minuteRef}>
                {minuteItems.map((minute, idx) => (
                    <div
                        key={`minute-${idx}`}
                        className={`${styles.item} ${minute === selectedMinute ? styles.selected : ""}`}
                    >
                        {minute.toString().padStart(2, "0")}
                    </div>
                ))}
            </div>
            <div className={styles.column} ref={ampmRef}>
                {ampmItems.map((value, idx) => (
                    <div
                        key={`ampm-${idx}`}
                        className={`${styles.item} ${value === selectedAMPM ? styles.selected : ""}`}
                    >
                        {value}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimePicker;
