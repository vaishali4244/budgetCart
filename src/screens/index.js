import { Routes, Route } from "react-router-dom";
import Homepage from "./homepage";
import Login from "./login";
import { useState } from "react";



const Screen = () => {
    const [token, setToken] = useState()

    return (
        <Routes>

            {token ?
                <Route path='/homepage' element={<Homepage />} />
                : null}
            <Route path='/' element={<Login setToken={setToken} />} />

        </Routes>
    )
}

export default Screen;