import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
           <h3>Logga in</h3>
           {/* <LoginForm/> */}
           <p>Har du inget konto?</p>
            <Link to="/register">Registrera dig här</Link>
        </div>
    )
}

export default Login;