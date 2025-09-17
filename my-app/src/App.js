import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/hello")
            .then((res) => res.text())
            .then((data) => setMessage(data));
    }, []);

    return (
        <div>
            <h1>프론트엔드 → 백엔드 연동 테스트</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
