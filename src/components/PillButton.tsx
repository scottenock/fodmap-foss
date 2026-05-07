type PillButtonProps = {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const PillButton: React.FC<PillButtonProps> = ({
  active = false,
  onClick,
  children,
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`rounded-full text-sm border transition-colors ${
      active
        ? "bg-green-400 text-white border-green-400"
        : "bg-white text-gray-600 border-gray-300"
    } ${className}`}
  >
    {children}
  </button>
);

export default PillButton;
