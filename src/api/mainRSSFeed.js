// External
import xmlParser from "xml-js";
import axios from "axios";

// Constants
const PROXY_URL = "https://intense-mesa-62220.herokuapp.com/";
const API_URL = "https://htmag.co.il/";

async function parse() {
  try {
    // Request rss feed
    const { data } = await axios.get(`${PROXY_URL}${API_URL}rss.php`, {
      params: {
        aff: 2,
        count: 7,
        forum: 107,
        image: 2,
      },
    });

    // Extract item list
    const {
      rss: {
        channel: { item },
      },
    } = xmlParser.xml2js(data, {
      ignoreComment: true,
      compact: true,
    });

    // Generate array with relevant data
    const itemArray = item.map(({ guid, title, description, image }) => {
      return {
        guid: guid._text,
        title: title._text,
        description: description._text,
        image: image._text,
      };
    });

    return itemArray;
  } catch (err) {
    console.log(err);
  }
}

export default parse;
