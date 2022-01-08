// External
import React, { useEffect, useState } from "react";

// Internal
import parse from "../../api/mainRSSFeed";
import Loader from "../Loader/Loader";
import Item from "./Item/Item";
import "./Items.css";

function Items() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    (async () => {
      const tempItems = await fetchItems();
      setItems(
        tempItems.map(({ guid, title, description, image }) => {
          return { id: guid, title, description, image };
        })
      );
    })();
  }, []);

  const fetchItems = async () => {
    const resultItems = await parse();
    return resultItems;
  };

  const generateItemElements = () => {
    return items.map(({ id, title, description, image }) => {
      return (
        <Item
          key={id}
          title={title}
          content={description}
          image={decodeURIComponent(image)}
        />
      );
    });
  };

  return items ? (
    <div className="Items ready">{generateItemElements()}</div>
  ) : (
    <div className="Items loading">
      <Loader />
    </div>
  );
}

export default Items;
