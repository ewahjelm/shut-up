import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const { success: ok, status, message } = await register(
      values.username,
      values.email,
      values.password,
      values.avatar
    );

    setLoading(false);

    if (ok && status === 201) {
      setSuccess("Registrering lyckades! Du redirectas till inloggning...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError(message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <RegisterForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        success={success}
      />
    </div>
  );
}
