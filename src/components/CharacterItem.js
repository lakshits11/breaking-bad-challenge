import React from "react";

const CharacterItem = ({ item }) => {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <img
            src={
              item.char_id !== 39
                ? item.img
                : "https://tvline.com/wp-content/uploads/2013/09/breaking-bad-holly-elanor-anne-wenrich-dw.jpg"
            }
            alt=""
          />
        </div>
        <div className="card-back">
          <h1>{item.name}</h1>
          <ul>
            <li>
              <strong>Played By:</strong> {item.portrayed}
            </li>
            <li>
              <strong>Nickname:</strong> {item.nickname}
            </li>
            <li>
              <strong>Birthday:</strong> {item.birthday}
            </li>
            <li>
              <strong>Life Status:</strong> {item.status}
            </li>
            <li>
              <strong>Occupation:</strong> {item.occupation.join(", ")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterItem;
