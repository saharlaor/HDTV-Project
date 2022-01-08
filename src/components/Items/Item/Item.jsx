// External
import React from "react";
import reactReplace from "react-string-replace";

// Internal
import "./Item.css";

// Constants
const LINK_REGEX = /https?:\/\/[^/\s]+\.[\S]+\.[\S]+\/[\S]*/g;
const SITE_REGEX = /[^/\s]+\.[^/\s]+\.[^/\s]+/;

function Item({ title, content, image }) {
  const getLinkedContent = () => {
    const links = content.match(LINK_REGEX);
    const siteTuples = links.map((link) => [link, link.match(SITE_REGEX)[0]]);
    const cont = reactReplace(content, /(?:^|[^\n])\n(?=!\n)/g, (_, i) => (
      <br key={i} />
    ));
    const newContent = siteTuples.reduce(
      (tempContent, [link, site]) =>
        reactReplace(tempContent, link, (match, i) => (
          <a key={site + i} href={match}>
            {site}
          </a>
        )),
      cont
    );
    return newContent;
  };

  return (
    <div className="Item">
      <img src={image} alt={title} />
      <h3 className="Item__title">{title}</h3>
      <div className="Item__content">{getLinkedContent()}</div>
    </div>
  );
}

export default Item;
