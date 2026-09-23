"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

export default function DatePickerModal({ value, onChange, onClose }) {
  const initialDate = new Date(2026, 8, 16);
  const [currentDate, setCurrentDate] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  const [startDate, setStartDate] = useState(new Date(2026, 8, 16));
  const [endDate, setEndDate] = useState(new Date(2026, 8, 18));

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const formatDateLabel = (date) =>
    new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);

  const isSameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const getDaysArray = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }

    return days;
  };

  const handleDateClick = (day) => {
    if (!day) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
      return;
    }

    if (day < startDate) {
      setStartDate(day);
      setEndDate(null);
      return;
    }

    setEndDate(day);
    const rangeText = `${formatDateLabel(startDate)} - ${formatDateLabel(day)}`;
    onChange(rangeText);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getDaysArray(year, month);

  return (
    <div className="absolute left-0 top-full mt-2 w-full sm:w-[300px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-4 sm:p-5 animate-in fade-in slide-in-from-top-2 duration-150 text-[#191e3b]">
      
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-3 px-1">
        <button
          type="button"
          onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h4 className="text-sm font-bold text-[#191e3b]">
          {monthNames[month]} {year}
        </h4>
        <button
          type="button"
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 text-center gap-1 mb-2">
        {daysOfWeek.map((d, i) => (
          <span key={i} className="text-[11px] font-semibold text-gray-400 py-1">
            {d}
          </span>
        ))}
        {days.map((day, i) => {
          if (!day) {
            return <div key={i} className="h-8" />;
          }

          const isSelectedStart = startDate && isSameDay(day, startDate);
          const isSelectedEnd = endDate && isSameDay(day, endDate);
          const isInRange = startDate && endDate && day > startDate && day < endDate;

          let btnClass = "h-8.5 w-8.5 mx-auto rounded-full text-xs font-semibold flex items-center justify-center transition-all ";
          if (isSelectedStart || isSelectedEnd) {
            btnClass += "bg-[#006ce4] text-white font-bold shadow-xs";
          } else if (isInRange) {
            btnClass += "bg-blue-100 text-[#006ce4] rounded-none w-full";
          } else {
            btnClass += "hover:bg-gray-100 text-gray-800";
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleDateClick(day)}
              className={btnClass}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      {/* Footer Done action */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
        <div className="text-xs text-gray-600 font-medium">
          {startDate && endDate
            ? `${Math.max(0, Math.round((endDate - startDate) / 86400000))} night stay`
            : "Select checkout date"}
        </div>
        <button
          type="button"
          onClick={() => {
            if (startDate && endDate) {
              onChange(`${formatDateLabel(startDate)} - ${formatDateLabel(endDate)}`);
            }
            onClose();
          }}
          className="px-5 py-2 bg-[#006ce4] hover:bg-[#0057b8] text-white text-xs font-bold rounded-full shadow-xs transition-colors"
        >
          Apply dates
        </button>
      </div>
    </div>
  );
}
