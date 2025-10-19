import styles from './Button.module.css';

const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.btn}
    >
      {children}
    </button>
  );
};

export default Button;
