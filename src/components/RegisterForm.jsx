import InputField from './InputField';
import Button from './Button';
import UserFeedback from './UserFeedback';
import styles from './RegisterForm.module.css';

const RegisterForm = ({
  values = { username: '', email: '', password: '', avatar: '' },
  onChange = () => {},
  onSubmit = () => {},
  loading = false,
  error = null,
  success = null,
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h2>Registrera dig</h2>

      <InputField
        name="username"
        label="Användarnamn"
        value={values.username}
        onChange={onChange}
      />

      <InputField
        name="email"
        label="E-post"
        type="email"
        value={values.email}
        onChange={onChange}
      />

      <InputField
        name="password"
        label="Lösenord"
        type="password"
        value={values.password}
        onChange={onChange}
      />

      <InputField
        name="avatar"
        label="Avatar (valfritt)"
        value={values.avatar}
        onChange={onChange}
      />

      {error && <UserFeedback feedback={error} />}
      {success && <UserFeedback feedback={success} />}

      <Button type="submit" disabled={loading} className={styles.btn}>
        {loading ? "Registrerar..." : "Registrera"}
      </Button>
    </form>
  );
};

export default RegisterForm;
