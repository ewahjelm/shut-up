import { useState } from 'react';
import { Link } from 'react-router-dom';
import  LoginForm  from '../components/LoginForm'
import InputField from '../components/InputField';
import Button from '../components/Button';
 
const Login = () => {
    const [values, setValues] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Mock delay för test
        setTimeout(() => {
        setLoading(false);
        setError("Felaktig inloggning!");
        }, 1000);
    };

    return (
        <div>
           <h3>Välkommen till Shut-up chat-app</h3>
            <LoginForm
                values={values}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
           <p>Har du inget konto?</p>
            <Link to="/register">Registrera dig här</Link>
        </div>
    )
}

export default Login;