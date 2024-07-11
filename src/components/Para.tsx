type ParaProps = {
  className?: string;
  children?: React.ReactNode;
};

const styles = {
  paragraph: "mb-3",
};

const Para: React.FC<ParaProps> = ({ className = "", children }) => {
  return <p className={`${styles.paragraph} ${className}`}>{children}</p>;
};

export default Para;
