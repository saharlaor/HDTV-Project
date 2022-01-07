// External
import React from "react";

// Internal
import "./Item.css";

// Constants
const PRODUCT_CODE_REGEX = /((?<=\/)[a-zA-Z0-9]+(?=\?))/;
const IMAGE_API_URL = "https://ws-na.amazon-adsystem.com/widgets/q";

function Item({ title, content }) {
  const getImage = () => {
    const amazonURL = content.split(" ").reverse()[0]; // Last "word" in the content
    const productCode = amazonURL.match(PRODUCT_CODE_REGEX)[0];
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
