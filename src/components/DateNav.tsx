type DateNavProps = {
  date: string;
  onPrevDay: () => void;
  onNextDay: () => void;
  nextDayDisabled?: boolean;
};

export const formatDate = (dateStr: string): string =>
  new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const DateNav: React.FC<DateNavProps> = ({
  date,
  onPrevDay,
  onNextDay,
  nextDayDisabled = false,
}) => (
  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
    <button onClick={onPrevDay} className="p-1" aria-label="Previous day">
      <svg
        className="w-5 h-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <p className="text-sm font-medium text-gray-700">{formatDate(date)}</p>
    <button
      onClick={onNextDay}
      disabled={nextDayDisabled}
      className={`p-1 ${nextDayDisabled ? "opacity-30" : ""}`}
      aria-label="Next day"
    >
      <svg
        className="w-5 h-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
);

export default DateNav;
