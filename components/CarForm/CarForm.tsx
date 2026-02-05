"use client";

import { useState, useRef, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import styles from "./CarForm.module.css";
import dayjs from "dayjs";
import toast from "react-hot-toast";

export default function CarForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error("Please fill in required fields");
      return;
    }

    toast.success("Form successfully sent 🚗");

    setName("");
    setEmail("");
    setComment("");
    setDate(null);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Book your car now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <input
        className={styles.input}
        placeholder="Name*"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className={styles.input}
        placeholder="Email*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

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

      <textarea
        className={styles.textarea}
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className={styles.button} type="submit">
        Send
      </button>
    </form>
  );
}
