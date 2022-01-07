// External
import React, { useEffect, useState } from "react";

// Internal
import parse from "../../api/mainRSSFeed";
import Item from "./Item/Item";
import "./Items.css";

function Items() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    (async () => {
      const tempItems = await fetchItems();
      setItems(
        tempItems.map(({ guid, title, contentSnippet }) => {
          return { id: guid, title: title, content: contentSnippet };
        })
      );
    })();
  }, []);

  const fetchItems = async () => {
    const { items } = await parse();
    return items;
  };

  const generateItemElements = () => {
    return items.map(({ id, title, content }) => {
      return <Item key={id} title={title} content={content} />;
    });
  };

  return items ? (
    <div className="Items">{generateItemElements()}</div>
  ) : (
    <div className="Items">Loading...</div>
  );
}

export default Items;
