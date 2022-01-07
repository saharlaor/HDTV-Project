// External
import React from "react";

// Internal
import "./Item.css";

// Constants
const PRODUCT_CODE_REGEX =
  /((?<=https:\/\/www\.amazon\.com\/([a-zA-Z0-9]+\/)+)[a-zA-Z0-9]+(?=\?))/;
const IMAGE_API_URL = "https://ws-na.amazon-adsystem.com/widgets/q";

function Item({ title, content }) {
  const getImage = () => {
    const productCode = content.match(PRODUCT_CODE_REGEX);
    const imageURL = `${IMAGE_API_URL}?_encoding=UTF8&MarketPlace=US&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=SL500&ASIN=${productCode}`;
    return imageURL;
  };

  return (
    <div className="Item">
      <img src={getImage()} alt={title} />
      <h3 className="title">{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default Item;
