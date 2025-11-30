import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeCJ(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $("h1").first().text().trim();

    let images = [];
    $("img").each((i, el) => {
      const src = $(el).attr("src");
      if (src && src.startsWith("http")) images.push(src);
    });

    return {
      source: "CJ Dropshipping",
      url,
      title,
      images,
    };

  } catch (err) {
    console.error("CJ Scraper Error:", err);
    return { error: "Failed to scrape CJ product" };
  }
}
