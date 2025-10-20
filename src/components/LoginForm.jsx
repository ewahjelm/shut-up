import InputField  from './InputField';
import Button from './Button';
import UserFeedback  from './UserFeedback';
import styles from './LoginForm.module.css';

const LoginForm = ({ 
  values = { username: '', password: '' },
  onChange = () => {},
  onSubmit = () => {},
  loading = false,
  error = null,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={styles.form}
    >
      <h2>Logga in</h2>

      <InputField
        name="username"
        label="Användarnamn"
        value={values.username}
        onChange={onChange}
      />

      <InputField
        name="password"
        label="Lösenord"
        type="password"
        value={values.password}
        onChange={onChange}
      />

      {error && <UserFeedback feedback={error} />}
      <Button type="submit" disabled={loading} className={styles.btn}>
        {loading ? "Loggar in..." : "Logga in"}
      </Button>
    </form>
 ) ;
};

export default LoginForm;