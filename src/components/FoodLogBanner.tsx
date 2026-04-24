import DateNav from "./DateNav";

type FoodLogBannerProps = {
  date: string;
  onPrevDay: () => void;
  onNextDay: () => void;
  nextDayDisabled?: boolean;
  count: number;
  onLog: () => void;
  onUnlog: () => void;
};

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
    <DateNav
      date={date}
      onPrevDay={onPrevDay}
      onNextDay={onNextDay}
      nextDayDisabled={nextDayDisabled}
    />
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
