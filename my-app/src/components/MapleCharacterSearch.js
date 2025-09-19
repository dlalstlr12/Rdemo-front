import React, { useState } from "react";

function MapleCharacterSearch() {
    const [name, setName] = useState("");
    const [character, setCharacter] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const searchCharacter = async () => {
        const res = await fetch(`/character?name=${name}`);
        const data = await res.json();
        setCharacter(data);
        setSelectedItem(null);
    };

    return (
        <div>
            <h1>캐릭터 검색</h1>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="닉네임 입력" />
            <button onClick={searchCharacter}>검색</button>

            {character && character.basic && (
                <div>
                    <h2>{character.basic.character_name}</h2>

                    <select onChange={(e) => setSelectedItem(e.target.value)}>
                        <option value="">아이템 선택</option>
                        {character.items &&
                            character.items.map((item, i) => (
                                <option key={i} value={i}>
                                    {item.item_name}
                                </option>
                            ))}
                    </select>

                    {selectedItem !== null && character.items[selectedItem] && (
                        <div>
                            <h3>{character.items[selectedItem].item_name}</h3>
                            <img
                                src={character.items[selectedItem].item_icon}
                                alt={character.items[selectedItem].item_name}
                            />
                            <p>{character.items[selectedItem].item_description}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default MapleCharacterSearch;
