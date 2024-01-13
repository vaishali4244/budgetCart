import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const loginFunc = () => {
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
                // username: 'kminchelle',
                // password: '0lelplR',
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.message) {
                    alert(data?.message)
                } else {
                    props.setToken(data?.token);
                    navigate(data?.token ? "homepage" : "/")
                }
            })
    }
    const recruitFunc = () => {
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'kminchelle',
                password: '0lelplR',
            })
        })
            .then(res => res.json())
            .then(data => {
                    props.setToken(data?.token);
                    navigate(data?.token ? "homepage" : "/")
            })
    }

    return (
        <div className="login">
            <header className="heading">
                <h1>BudgetCart.com</h1>
            </header>
            <div className="details">
                <h2>LOGIN HERE</h2>
                <label>User Name : </label>
                <input type="text" placeholder="username" onChange={(e) => { setUsername(e?.target?.value) }} value={username} />
                <br />
                <label>Password : </label>
                <input type="password" placeholder="password" onChange={(e) => { setPassword(e?.target?.value) }} value={password} />
                <br />
                <button onClick={loginFunc}>Submit</button>
            </div>
<div>
   <button className="recruit-btn" onClick={recruitFunc}>Recruiter Click Here</button> 
</div>
        </div>

    )
}

export default Login;