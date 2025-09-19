import React, { useState } from "react";

const CharacterInfo = () => {
    const [nickname, setNickname] = useState("");
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const handleFetch = async () => {
        if (!nickname) return;

        setLoading(true);
        setCharacter(null);
        setSelectedItemIndex(null);

        try {
            const response = await fetch(`http://localhost:8080/api/maple/character?name=${nickname}`);
            const data = await response.json();

            if (response.ok) {
                setCharacter(data);
            } else {
                setCharacter({ error: data.error || "조회 실패" });
            }
        } catch (error) {
            setCharacter({ error: "API 호출 실패" });
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

            {character && character.error && <p style={{ color: "red" }}>결과: {character.error}</p>}

            {character && character.basic && (
                <div style={{ marginTop: "20px" }}>
                    <h3>캐릭터: {character.basic.character_name}</h3>

                    <label>
                        착용 아이템:
                        <select
                            onChange={(e) => setSelectedItemIndex(e.target.value)}
                            defaultValue=""
                            style={{ marginLeft: "10px" }}
                        >
                            <option value="">선택하세요</option>
                            {character.items &&
                                character.items.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item.item_name}
                                    </option>
                                ))}
                        </select>
                    </label>

                    {selectedItemIndex !== null && selectedItemIndex !== "" && character.items[selectedItemIndex] && (
                        <div style={{ marginTop: "20px" }}>
                            <h4>{character.items[selectedItemIndex].item_name}</h4>
                            <img
                                src={character.items[selectedItemIndex].item_icon}
                                alt={character.items[selectedItemIndex].item_name}
                            />
                            <p>{character.items[selectedItemIndex].item_description}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CharacterInfo;
