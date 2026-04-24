import { useEffect, useState } from "react";

type MonthCalendarProps = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  maxDate: string;
};

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const parseDate = (dateStr: string) => dateStr.split("-").map(Number) as [number, number, number];

const MonthCalendar: React.FC<MonthCalendarProps> = ({ selectedDate, onSelectDate, maxDate }) => {
  const [selYear, selMonth] = parseDate(selectedDate);
  const [viewYear, setViewYear] = useState(selYear);
  const [viewMonth, setViewMonth] = useState(selMonth);

  useEffect(() => {
    const [y, m] = parseDate(selectedDate);
    if (y !== viewYear || m !== viewMonth) {
      setViewYear(y);
      setViewMonth(m);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const [maxYear, maxMonth, maxDay] = parseDate(maxDate);
  const nextMonthDisabled = viewYear === maxYear && viewMonth === maxMonth;

  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth - 1, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 1) { setViewYear((y) => y - 1); setViewMonth(12); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (nextMonthDisabled) return;
    if (viewMonth === 12) { setViewYear((y) => y + 1); setViewMonth(1); }
    else setViewMonth((m) => m + 1);
  };

  const isDisabled = (day: number) => {
    if (viewYear > maxYear) return true;
    if (viewYear === maxYear && viewMonth > maxMonth) return true;
    if (viewYear === maxYear && viewMonth === maxMonth && day > maxDay) return true;
    return false;
  };

  const isSelected = (day: number) => {
    const [sy, sm, sd] = parseDate(selectedDate);
    return sy === viewYear && sm === viewMonth && sd === day;
  };

  const handleDayClick = (day: number) => {
    if (isDisabled(day)) return;
    const dateStr = `${viewYear}-${String(viewMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onSelectDate(dateStr);
  };

  const monthName = new Date(viewYear, viewMonth - 1, 1).toLocaleString("default", {
    month: "long",
  });

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDayOfWeek }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="px-3 pt-3 pb-2 border-b border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1" aria-label="Previous month">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="text-sm font-semibold text-gray-700">{monthName} {viewYear}</p>
        <button
          onClick={nextMonth}
          disabled={nextMonthDisabled}
          className={`p-1 ${nextMonthDisabled ? "opacity-30" : ""}`}
          aria-label="Next month"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d) => (
          <p key={d} className="text-center text-xs text-gray-400 font-medium py-1">{d}</p>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) =>
          day === null ? (
            <div key={`empty-${i}`} />
          ) : (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              disabled={isDisabled(day)}
              className={`mx-auto flex items-center justify-center w-8 h-8 rounded-full text-sm transition-colors
                ${isSelected(day) ? "bg-green-400 text-white font-semibold" : ""}
                ${isDisabled(day) ? "text-gray-300 cursor-default" : !isSelected(day) ? "text-gray-700 active:bg-gray-100" : ""}
              `}
            >
              {day}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default MonthCalendar;
