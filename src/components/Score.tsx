type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  text: string;
  score: number;
};

const colours = ["bg-green-400", "bg-orange-400", "bg-red-500", "bg-grey-300"];

const Score: React.FC<ButtonProps> = ({ text, score }) => {
  return (
    <div className="flex items-center my-1">
      <span className={`rounded-full w-3 h-3 block mr-2 ${colours[score]} `} />
      <p className="text-base font-light">{text}</p>
    </div>
  );
};

export default Score;
