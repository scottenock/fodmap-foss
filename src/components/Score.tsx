type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  text: string;
  score: number;
  reversed?: boolean;
};

const colours = ["bg-green-400", "bg-orange-400", "bg-red-500", "bg-grey-300"];

const Score: React.FC<ButtonProps> = ({ text, score, reversed = false }) => {
  return (
    <div className="flex items-center my-1">
      {reversed && <p className="text-base font-light mr-2">{text}</p>}
      <span className={`rounded-full w-3 h-3 block ${colours[score]} `} />
      {!reversed && <p className="text-base font-light ml-2">{text}</p>}
    </div>
  );
};

export default Score;
