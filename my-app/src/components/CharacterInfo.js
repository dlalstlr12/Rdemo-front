import React, { useState } from "react";

const CharacterInfo = () => {
    const [nickname, setNickname] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFetch = async () => {
        if (!nickname) return;

        setLoading(true);
        setResult("");

        try {
            const response = await fetch(`http://localhost:8080/api/maple/nickname?name=${nickname}`);
            const text = await response.text(); // 문자열 그대로 가져오기

            setResult(text); // 성공/실패 메시지 모두 표시
        } catch (error) {
            setResult("API 호출 실패");
            console.error(error);
        }

        setLoading(false);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>메이플 캐릭터 조회</h2>
            <input
                type="text"
                placeholder="닉네임 입력"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                style={{ padding: "5px", width: "200px", marginRight: "10px" }}
            />
            <button onClick={handleFetch} style={{ padding: "5px 10px" }}>
                조회
            </button>

            {loading && <p>조회 중...</p>}
            {result && <p>결과: {result}</p>}
        </div>
    );
};

export default CharacterInfo;
