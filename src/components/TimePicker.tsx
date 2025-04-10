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
    shouldRepeat = true
) => {
    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const itemHeight = 40;
        const scrollToCenter = () => {
            if (shouldRepeat) {
                const offsetIndex = items.length;
                container.scrollTop = offsetIndex * itemHeight;
            } else {
                container.scrollTop = 0;
            }
        };

        scrollToCenter();

        let timeout: NodeJS.Timeout;

        const handleScroll = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const children = Array.from(container.children) as HTMLDivElement[];
                const containerCenter = container.getBoundingClientRect().top + container.clientHeight / 2;

                let closest = { index: 0, distance: Infinity };
                children.forEach((child, index) => {
                    const rect = child.getBoundingClientRect();
                    const itemCenter = rect.top + rect.height / 2;
                    const distance = Math.abs(containerCenter - itemCenter);
                    if (distance < closest.distance) {
                        closest = { index, distance };
                    }
                });

                const selected = children[closest.index]?.textContent;
                if (selected !== undefined) {
                    setSelected(isNaN(Number(selected)) ? selected : Number(selected));
                }
            }, 100); // scroll 멈춘 뒤에 체크
        };

        container.addEventListener("scroll", handleScroll);
        return () => {
            container.removeEventListener("scroll", handleScroll);
            clearTimeout(timeout);
        };
    }, [ref, items, setSelected, shouldRepeat]);
};

const TimePicker = () => {
    const baseHours = Array.from({ length: 12 }, (_, i) => i + 1);
    const baseMinutes = Array.from({ length: 60 }, (_, i) => i);
    const ampm = ["AM", "PM"];

    const hourItems = generateLoopArray(1, 12);
    const minuteItems = generateLoopArray(0, 59);

    const hourRef = useRef<HTMLDivElement>(null);
    const minuteRef = useRef<HTMLDivElement>(null);
    const ampmRef = useRef<HTMLDivElement>(null);

    const [selectedHour, setSelectedHour] = useState(8);
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [selectedAMPM, setSelectedAMPM] = useState("PM");

    useCenteredScroll(hourRef, baseHours, setSelectedHour);
    useCenteredScroll(minuteRef, baseMinutes, setSelectedMinute);
    useCenteredScroll(ampmRef, ampm, setSelectedAMPM, false); // 반복 안함

    return (
        <div className={styles.wrapper}>
            <div className={styles.column} ref={hourRef}>
                {hourItems.map((hour, idx) => (
                    <div
                        key={`${hour}-${idx}`}
                        className={`${styles.item} ${hour === selectedHour ? styles.selected : ""}`}
                    >
                        {hour}
                    </div>
                ))}
            </div>
            <div className={styles.column} ref={minuteRef}>
                {minuteItems.map((minute, idx) => (
                    <div
                        key={`${minute}-${idx}`}
                        className={`${styles.item} ${minute === selectedMinute ? styles.selected : ""}`}
                    >
                        {minute.toString().padStart(2, "0")}
                    </div>
                ))}
            </div>
            <div className={styles.column} ref={ampmRef}>
                {ampm.map((value) => (
                    <div
                        key={value}
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
