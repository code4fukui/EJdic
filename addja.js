import { CSV } from "https://js.sabae.cc/CSV.js";
import { DeepLAPI } from "https://code4fukui.github.io/DeepLAPI/DeepLAPI.js";

const deepl = new DeepLAPI();

const fn = "./cedict_ts.csv";
const data = await CSV.fetchJSON(fn);
let cnt = 130000;
for (const d of data) {
  if (d.means.indexOf("variant of ") >= 0) continue;
  if (!d.means_ja) {
    d.means_ja = await deepl.translate(d.means, "en", "ja");
    console.log(d.kanji, cnt);
    console.log(d.means);
    console.log(d.means_ja);
    await Deno.writeTextFile(fn, CSV.stringify(data));
    if (!--cnt) {
      break;
    }
  }
}
