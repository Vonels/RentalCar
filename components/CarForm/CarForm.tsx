"use client";

import { useState } from "react";
import Calendar from "../Calendar/Calendar";
import styles from "./CarForm.module.css";
import dayjs from "dayjs";
import { useRef, useEffect } from "react";

export default function CarForm() {
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form className={styles.form}>
      <h3 className={styles.title}>Book your car now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <input className={styles.input} placeholder="Name*" />
      <input className={styles.input} placeholder="Email*" />

      {/* 👇 НАШ КАЛЕНДАРЬ */}
      <div className={styles.dateWrapper} ref={wrapperRef}>
        <input
          className={styles.input}
          placeholder="Booking date"
          readOnly
          value={date ? dayjs(date).format("DD/MM/YYYY") : ""}
          onClick={() => setOpen(true)}
        />

        {open && (
          <Calendar
            value={date}
            onChange={(d) => {
              setDate(d);
            }}
          />
        )}
      </div>

      <textarea className={styles.textarea} placeholder="Comment" />
      <button className={styles.button}>Send</button>
    </form>
  );
}
