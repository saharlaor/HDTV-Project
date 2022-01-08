// External
import React from "react";
import reactReplace from "react-string-replace";

// Internal
import "./Item.css";

// Constants
const IMAGE_API_URL = "https://ws-na.amazon-adsystem.com/widgets/q";
const PRODUCT_CODE_REGEX =
  /((?<=https:\/\/www\.amazon\.com\/([a-zA-Z0-9]+\/)+)[a-zA-Z0-9]+(?=\?))/;
const LINK_REGEX = /https?:\/\/www\.[\S]+\.[\S]+\/[\S]*/g;
const SITE_REGEX = /www\.[^/\s]+\.[^/\s]+/;

function Item({ title, content }) {
  const getImage = () => {
    const productCode = content.match(PRODUCT_CODE_REGEX);
    const imageURL = `${IMAGE_API_URL}?_encoding=UTF8&MarketPlace=US&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=SL500&ASIN=${productCode}`;
    return imageURL;
  };

  const getLinkedContent = () => {
    const links = content.match(LINK_REGEX);
    const siteTuples = links.map((link) => [link, link.match(SITE_REGEX)[0]]);
    const cont = reactReplace(content, /(?<=^|[^\n])\n(?=!\n)/g, (_, i) => (
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
    return <div className="Item__content">{newContent}</div>;
    // console.log(`temp`, <div>{temp}</div>);
  };

  return (
    <div className="Item">
      <img src={getImage()} alt={title} />
      <h3 className="Item__title">{title}</h3>
      {getLinkedContent()}
    </div>
  );
}

export default Item;
