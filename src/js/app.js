import firma from "console-signature";
import Highway from "@dogstudio/highway";
import Fade from "./lib/fade";

// Call Highway.Core once.
// Store it in a variable to use events
const H = new Highway.Core({
  transitions: {
    default: Fade,
  },
});

/* firma({
  author: "Aisling",
  url: "www.aisling.com",
});
 */

firma();

function errorHandle(err) {
  console.log(err);
}

async function x() {
  const url = "https://pictau.com";
  const content = "portfolios/?per_page=20";

  const data = await (
    await fetch(`${url}/wp-json/wp/v2/${content}`).catch(errorHandle)
  ).json();

  Object.keys(data).forEach((key) =>
    console.log(key, data[key].title.rendered)
  );

  console.table(data);
}

x();

/* fetch(`https://www.caisocios.com/wp-json/wp/v2/posts`, {
  // ? Remove method and headers when performing a GET request
  // ? POST,PATCH must be uppercase
  method: "GET",
  headers: {
    accept: "application/json",
  },
})
  .then((response) => response.json())
  // ? use next line to do something meaningful with the data
  .then((json) => console.table(json));
 */
