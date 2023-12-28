import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const loginFunc =() => {
       fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
            //   username: 'kminchelle',
            //   password: '0lelplR',
            })
          })
          .then(res =>res.json())
          .then(data =>{
            if(data?.message){
                alert(data?.message)
            }else{
            props.setToken(data?.token);
            navigate(data?.token?"homepage":"/")
            }
            })
    }

    return (
        <div className="login">
            <h1>LOGIN PAGE</h1>
            <div className="details">
                <p>User Name : </p>
                <input type="text" placeholder="username" onChange={(e) => { setUsername(e?.target?.value) }} value={username} />
                <br />
                <p>Password : </p>
                <input type="password" placeholder="password" onChange={(e) => { setPassword(e?.target?.value) }} value={password} />
                <br />
            </div>
            <button onClick={loginFunc}>Submit</button>
           
        </div>

    )
}

export default Login;