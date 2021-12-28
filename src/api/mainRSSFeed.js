import rssParser from "rss-parser";

const rss = new rssParser();
const PROXY_URL = "https://intense-mesa-62220.herokuapp.com/";
const API_URL = "https://htmag.co.il/";

async function parse() {
  try {
    let feed = await rss.parseURL(
      `${PROXY_URL}${API_URL}rss.php?aff=2&count=5&forum=107&image=2`
    );
    return feed;
  } catch (err) {
    console.log(err);
  }
}

export default parse;
