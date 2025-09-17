import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
    const [inputName, setInputName] = useState(""); // 사용자가 입력한 닉네임
    const [nickname, setNickname] = useState(""); // API에서 받아온 닉네임
    const [error, setError] = useState(""); // 에러 메시지

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/api/maple/nickname?name=${inputName}`)
            .then((res) => {
                if (!res.ok) throw new Error("API 호출 실패");
                return res.text();
            })
            .then((data) => {
                setNickname(data);
                setError("");
            })
            .catch((err) => {
                setError(err.message);
                setNickname("");
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>메이플 닉네임 조회</h1>

            {/* 닉네임 입력 폼 */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="닉네임 입력"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                />
                <button type="submit">조회</button>
            </form>

            {/* 결과 출력 */}
            {nickname && <p>닉네임: {nickname}</p>}
            {error && <p style={{ color: "red" }}>에러: {error}</p>}
        </div>
    );
}

export default App;
