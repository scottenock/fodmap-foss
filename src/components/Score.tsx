type ScoreProps = {
  className?: string;
  children?: React.ReactNode;
  text: string;
  score: number;
  reversed?: boolean;
};

const badgeStyles = [
  "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400",
];

const Score: React.FC<ScoreProps> = ({ text, score }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${badgeStyles[score] ?? badgeStyles[3]}`}
  >
    {text}
  </span>
);

export default Score;
