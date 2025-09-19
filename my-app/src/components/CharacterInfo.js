import React, { useState } from "react";

const CharacterInfo = () => {
    const [nickname, setNickname] = useState("");
    const [characterData, setCharacterData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [error, setError] = useState("");

    const handleFetch = async () => {
        if (!nickname) return;

        setLoading(true);
        setCharacterData(null);
        setSelectedItem(null);
        setError("");

        try {
            const response = await fetch(`http://localhost:8080/api/maple/character?name=${nickname}`);

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text);
            }
            const data = await response.json();
            setCharacterData(data);
        } catch (err) {
            setError(err.message || "API 호출 실패");
        } finally {
            setLoading(false);
        }
    };

    const handleItemSelect = (e) => {
        const itemName = e.target.value;
        const item = characterData.items.find((i) => i.item_name === itemName);
        setSelectedItem(item || null);
    };

    return (
        <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>메이플 캐릭터 조회</h2>

            {/* 닉네임 입력 */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="닉네임 입력"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                    }}
                />
                <button
                    onClick={handleFetch}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                >
                    조회
                </button>
            </div>

            {/* 로딩 */}
            {loading && <p style={{ textAlign: "center" }}>조회 중...</p>}

            {/* 에러 */}
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            {/* 캐릭터 정보 */}
            {characterData && characterData.basic && (
                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "20px",
                        borderRadius: "10px",
                        maxWidth: "500px",
                        margin: "20px auto",
                        background: "#f9f9f9",
                    }}
                >
                    {/* 캐릭터 이미지 */}
                    {characterData.basic.character_image && (
                        <div style={{ textAlign: "center", marginBottom: "15px" }}>
                            <img
                                src={characterData.basic.character_image}
                                alt="캐릭터 이미지"
                                style={{
                                    width: "150px",
                                    height: "auto",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                }}
                            />
                        </div>
                    )}

                    <h3>🎮 캐릭터 기본 정보</h3>
                    <h3>{characterData.basic.character_name}</h3>
                    <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: "1.8" }}>
                        <li>
                            <strong>월드명:</strong> {characterData.basic.world_name}
                        </li>
                        <li>
                            <strong>직업:</strong> {characterData.basic.character_class}
                        </li>
                        <li>
                            <strong>레벨:</strong> {characterData.basic.character_level}
                            {" (" + characterData.basic.character_exp_rate + "%)"}
                        </li>
                        <li>
                            <strong>길드:</strong> {characterData.basic.character_guild_name || "없음"}
                        </li>
                        <li>
                            <strong>해방 상태:</strong>{" "}
                            {(() => {
                                const val = parseInt(characterData.basic.liberation_quest_clear, 10);
                                if (val === 0) return "해방 X";
                                if (val === 1) return "제네시스 해방 완료";
                                if (val === 2) return "데스티니 해방 완료";
                                return "알 수 없음";
                            })()}
                        </li>
                    </ul>
                </div>
            )}

            {/* 아이템 목록 SelectBox */}
            {characterData && characterData.items && characterData.items.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                    <h3>🛡️ 착용 아이템 목록</h3>
                    <select
                        onChange={handleItemSelect}
                        defaultValue=""
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                        }}
                    >
                        <option value="" disabled>
                            아이템을 선택하세요
                        </option>
                        {characterData.items.map((item, index) => (
                            <option key={index} value={item.item_name}>
                                {item.item_name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* 선택된 아이템 정보 */}
            {selectedItem && (
                <div
                    style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>📦 아이템 상세 정보</h3>
                    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                        {Object.entries(selectedItem).map(([key, value]) => (
                            <li key={key} style={{ marginBottom: "8px" }}>
                                <strong>{key}:</strong> {String(value)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CharacterInfo;
