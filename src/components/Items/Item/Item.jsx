// External
import React, { useEffect, useRef, useState } from "react";
import reactReplace from "react-string-replace";

// Internal
import "./Item.css";

// Constants
const LINK_REGEX = /https?:\/\/[^/\s]+\.[\S]+\.[\S]+\/[\S]*/g;
const SITE_REGEX = /[^/\s]+\.[^/\s]+\.[^/\s]+/;

function Item({ title, content, image }) {
  const [spans, setSpans] = useState(null);
  const itemRef = useRef(null);

  useEffect(() => {
    itemRef.current.children[0].addEventListener("load", () =>
      setSpans(Math.ceil(itemRef.current.clientHeight / 4) + 8)
    );
  }, []);

  const getLinkedContent = () => {
    const links = content.match(LINK_REGEX);
    const siteTuples = links.map((link) => [link, link.match(SITE_REGEX)[0]]);
    const cont = reactReplace(content, /(?:^|[^\n])\n(?=!\n)/g, (_, i) => (
      <br key={i} />
    ));
    const newContent = siteTuples.reduce(
      (tempContent, [link, site]) =>
        reactReplace(tempContent, link, (match, i) => (
          <a key={match} href={match}>
            {site}
          </a>
        )),
      cont
    );
    return newContent;
  };

  return (
    <div className="Item" ref={itemRef} style={{ gridRowEnd: `span ${spans}` }}>
      <img src={image} alt={title} />
      <h3 className="Item__title">{title}</h3>
      <hr />
      <div className="Item__content">{getLinkedContent()}</div>
    </div>
  );
}

export default Item;
