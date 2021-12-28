import React, { useEffect, useState } from "react";
import parse from "../../api/mainRSSFeed";
import "./App.css";

// const PROXY_URL = "https://intense-mesa-62220.herokuapp.com/";
// const API_URL = "https://htmag.co.il/";

// const test = () => {
// try {
//   let req = new XMLHttpRequest();
//   req.open(
//     "GET",
//     `${PROXY_URL}${API_URL}rss.php?aff=2&count=5&forum=107&image=2`,
//     true
//   );
//   req.send(null);
//   console.log(req);
//   req.onreadystatechange = () => {
//     console.log(req.responseXML.documentElement);
//   };
// } catch (err) {
//   console.log(err);
// }

// const data = await rss.get("rss.php", {
//   params: {
//     aff: 2,
//     count: 5,
//     forum: 107,
//     image: 2,
//   },
// });
// console.log(`data`, data);
// return <div></div>;
// };

function App() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    (async () => {
      const tempItems = await fetchItems();
      console.log(`tempItems`, tempItems);
      setItems(
        tempItems.map((item) => {
          return { title: item.title, content: item.contentSnippet };
        })
      );
    })();
  }, [items]);

  const fetchItems = async () => {
    const { items } = await parse();
    return items;
  };

  return !items ? <div>nothing</div> : <div className="App">something</div>;
}

export default App;
