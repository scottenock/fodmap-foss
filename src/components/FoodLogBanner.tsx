type FoodLogBannerProps = {
  date: string;
  onPrevDay: () => void;
  onNextDay: () => void;
  nextDayDisabled?: boolean;
  count: number;
  onLog: () => void;
  onUnlog: () => void;
};

const formatDate = (dateStr: string): string =>
  new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const FoodLogBanner: React.FC<FoodLogBannerProps> = ({
  date,
  onPrevDay,
  onNextDay,
  nextDayDisabled = false,
  count,
  onLog,
  onUnlog,
}) => (
  <section className="border-t-2 border-gray-200 mt-2">
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
      <button onClick={onNextDay} disabled={nextDayDisabled} className={`p-1 ${nextDayDisabled ? "opacity-30" : ""}`} aria-label="Next day">
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
    <div className="px-4 py-4">
      {count === 0 ? (
        <button
          onClick={onLog}
          className="w-full bg-green-400 text-white rounded-lg py-3 font-medium"
        >
          + Log food
        </button>
      ) : (
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={onUnlog}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl text-gray-600"
            aria-label="Remove one serving"
          >
            −
          </button>
          <span className="text-3xl font-medium w-8 text-center">{count}</span>
          <button
            onClick={onLog}
            className="w-10 h-10 rounded-full bg-green-400 border-2 border-green-400 flex items-center justify-center text-xl text-white"
            aria-label="Add one serving"
          >
            +
          </button>
        </div>
      )}
    </div>
  </section>
);

export default FoodLogBanner;
