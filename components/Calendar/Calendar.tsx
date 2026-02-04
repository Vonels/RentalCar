"use client";

import { DatePicker } from "@mantine/dates";
import css from "./Calendar.module.css";

interface Props {
  value: Date | null;
  onChange: (value: Date | null) => void;
}

export default function Calendar({ value, onChange }: Props) {
  return (
    <div className={css.dropdown}>
      <DatePicker
        value={value} // ✅ ИСПОЛЬЗУЕМ value
        onChange={(val) => onChange(val as Date | null)}
        firstDayOfWeek={1}
        allowDeselect={false}
        weekdayFormat="ddd"
        previousIcon={<span className={css.arrow}>‹</span>}
        nextIcon={<span className={css.arrow}>›</span>}
        classNames={{
          calendarHeader: css.calendarHeader,
          calendarHeaderLevel: css.calendarHeaderLevel,
          calendarHeaderControl: css.headerControl,

          weekdaysRow: css.weekdaysRow,
          weekday: css.weekday,

          day: css.day,
          month: css.month,
          monthsListCell: css.monthsListCell,
          monthsListControl: css.monthsListControl,
          yearsListCell: css.yearsListCell,
          yearsListControl: css.yearsListControl,
        }}
      />
    </div>
  );
}
