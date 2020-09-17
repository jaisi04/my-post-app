import React from 'react';
import './style.css';

const Login = ({ username, password, btnDisabled, error, loginUser, updateField}) => {
    return (
        <form className="wrapper">
            <label>Username</label>
            <input type="text" name="username" value={username} onChange={updateField} required />

            <label>Password</label>
            <input type="password" name="password" value={password} onChange={updateField} required />

            <button type="submit" disabled={btnDisabled} onClick={loginUser}>Login</button>
            {error && <p>{error}</p>}
        </form>

    );
};

export default Login;