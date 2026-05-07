type ScoreProps = {
  text: string;
  score: number;
  reversed?: boolean;
};

const badgeStyles = [
  "bg-green-100 text-green-700",
  "bg-orange-100 text-orange-700",
  "bg-red-100 text-red-700",
  "bg-gray-100 text-gray-500",
];

const Score: React.FC<ScoreProps> = ({ text, score }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${badgeStyles[score] ?? badgeStyles[3]}`}
  >
    {text}
  </span>
);

export default Score;
