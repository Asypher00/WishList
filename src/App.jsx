import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./styles.css";

function WishList() {
  function wishListSetter() {
    const dataFromStorage = JSON.parse(localStorage.getItem("myData"));
    if (dataFromStorage === null) {
      return [];
    } else {
      return dataFromStorage;
    }
  }
  // const dataFromStorage = localStorage.getItem("myData");
  const [wishText, setWishText] = useState("");
  const [wishList, setWishList] = useState(wishListSetter());

  const handleWishAdd = () => {
    setWishList((list) => list.concat({ id: uuid(), wish: wishText }));
    setWishText("");
  };

  const handleWishInput = (event) => setWishText(event.target.value);
  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(wishList));
  }, [wishList]);
  // useEffect(() => {
  //   localStorage.getItem("myData");
  // }, []);

  const deleteHandler = (id) => {
    setWishList((list) => list.filter((item) => item.id !== id));
  };

  return (
    <div>
      <input
        onChange={handleWishInput}
        value={wishText}
        placeholder={"I wish..."}
      />
      <button onClick={handleWishAdd}>Add </button>
      <ul>
        {wishList.map(({ id, wish }) => (
          <li key={id}>
            {wish}
            <button onClick={() => deleteHandler(id, wish)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1 className="app-header">wishing well</h1>
      <div className="app-body">
        <WishList />
      </div>
    </div>
  );
}
