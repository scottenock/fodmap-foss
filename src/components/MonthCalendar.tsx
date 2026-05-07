import { useEffect, useState } from "react";
import { MealLog, SymptomEntry, SymptomLog } from "../context/AppContext";

type MonthCalendarProps = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  maxDate: string;
  meals?: MealLog;
  symptoms?: SymptomLog;
};

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MEAL_DOTS: { meal: "breakfast" | "lunch" | "dinner"; color: string }[] = [
  { meal: "breakfast", color: "bg-yellow-400" },
  { meal: "lunch",     color: "bg-orange-400" },
  { meal: "dinner",    color: "bg-indigo-400" },
];

const SEVERITY_RING: Record<"low" | "medium" | "high", string> = {
  low:    "ring-2 ring-green-400",
  medium: "ring-2 ring-orange-400",
  high:   "ring-2 ring-red-500",
};

const daySeverity = (entries: SymptomEntry[]): "low" | "medium" | "high" | null => {
  if (!entries || entries.length === 0) return null;
  let worst = 0;
  for (const entry of entries) {
    const severityMax = Math.max(entry.bloating, entry.gas, entry.stomachPain, entry.urgency);
    const stoolDev = Math.abs(entry.stoolConsistency - 3);
    const stoolScore = stoolDev === 0 ? 1 : stoolDev === 1 ? 3 : 5;
    worst = Math.max(worst, severityMax, stoolScore);
  }
  if (worst >= 4) return "high";
  if (worst >= 3) return "medium";
  return "low";
};

const parseDate = (dateStr: string) => dateStr.split("-").map(Number) as [number, number, number];

const MonthCalendar: React.FC<MonthCalendarProps> = ({
  selectedDate,
  onSelectDate,
  maxDate,
  meals = {},
  symptoms = {},
}) => {
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

  const dayKey = (day: number) =>
    `${viewYear}-${String(viewMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const handleDayClick = (day: number) => {
    if (isDisabled(day)) return;
    onSelectDate(dayKey(day));
  };

  const monthName = new Date(viewYear, viewMonth - 1, 1).toLocaleString("default", { month: "long" });

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDayOfWeek }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="px-3 pt-3 pb-2 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1" aria-label="Previous month">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{monthName} {viewYear}</p>
        <button
          onClick={nextMonth}
          disabled={nextMonthDisabled}
          className={`p-1 ${nextMonthDisabled ? "opacity-30" : ""}`}
          aria-label="Next month"
        >
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d) => (
          <p key={d} className="text-center text-xs text-gray-400 dark:text-gray-500 font-medium py-1">{d}</p>
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
              className="mx-auto flex flex-col items-center gap-1"
            >
              {(() => {
                const severity = daySeverity(symptoms[dayKey(day)] ?? []);
                const ring = severity ? SEVERITY_RING[severity] : "";
                return (
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm transition-colors ${ring}
                      ${isSelected(day) ? "bg-green-400 text-white font-semibold" : ""}
                      ${isDisabled(day) ? "text-gray-300 dark:text-gray-600 cursor-default" : !isSelected(day) ? "text-gray-700 dark:text-gray-200 active:bg-gray-100 dark:active:bg-gray-700" : ""}
                    `}
                  >
                    {day}
                  </span>
                );
              })()}
              <span className="flex gap-0.5 h-1.5">
                {MEAL_DOTS.map(({ meal, color }) =>
                  meals[dayKey(day)]?.[meal]?.length > 0 ? (
                    <span key={meal} className={`w-1.5 h-1.5 rounded-full ${color}`} />
                  ) : null
                )}
              </span>
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default MonthCalendar;
