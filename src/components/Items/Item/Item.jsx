// External
import React, { useEffect, useRef, useState } from "react";
import reactReplace from "react-string-replace";
import { AiOutlineStar, AiFillStar, AiOutlineUpload } from "react-icons/ai";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

// Internal
import "./Item.css";

// Constants
const LINK_REGEX = /https?:\/\/[^/\s]+\.[\S]+\.[\S]+\/[\S]*/g;
const SITE_REGEX = /[^/\s]+\.[^/\s]+\.[^/\s]+/;

function Item({ title, content, image }) {
  const [spans, setSpans] = useState(null);
  const [liked, setLiked] = useState(false);
  const [share, setShare] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setSpans(Math.ceil(itemRef.current.clientHeight / 4) + 8);
    };

    window.addEventListener("resize", handleResize);

    itemRef.current.children[1].addEventListener("load", () => {
      setSpans(Math.ceil(itemRef.current.clientHeight / 4) + 8);
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setSpans(Math.ceil(itemRef.current.clientHeight / 4) + 8);
  }, [share]);

  const handleLikeClick = () => {
    setLiked((prev) => !prev);
  };

  const handleShareClick = () => {
    setShare((prev) => !prev);
  };

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
      <h3 className="Item__title">{title}</h3>
      <img src={image} alt={title} />
      <hr />
      <div className="Item__content">{getLinkedContent()}</div>
      <div className="Item__buttons">
        <button onClick={handleLikeClick}>
          {liked ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        <button onClick={handleShareClick}>
          <AiOutlineUpload />
        </button>
      </div>
      {share && (
        <div className="Item__share">
          <EmailShareButton url={window.location.href} resetButtonStyle={false}>
            <EmailIcon />
          </EmailShareButton>
          <FacebookShareButton
            url={window.location.href}
            resetButtonStyle={false}>
            <FacebookIcon />
          </FacebookShareButton>
          <LinkedinShareButton
            url={window.location.href}
            resetButtonStyle={false}>
            <LinkedinIcon />
          </LinkedinShareButton>
          <TelegramShareButton
            url={window.location.href}
            resetButtonStyle={false}>
            <TelegramIcon />
          </TelegramShareButton>
          <TwitterShareButton
            url={window.location.href}
            resetButtonStyle={false}>
            <TwitterIcon />
          </TwitterShareButton>
          <WhatsappShareButton
            url={window.location.href}
            resetButtonStyle={false}>
            <WhatsappIcon />
          </WhatsappShareButton>
        </div>
      )}
    </div>
  );
}

export default Item;
