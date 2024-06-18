type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onClick: () => void;
};

const styles = {
  button: "border rounded border-gray-800 px-2 py-1",
};

const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  onClick,
}) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
