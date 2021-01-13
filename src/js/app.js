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
  const data = await (
    await fetch(
      "https://www.caisocios.com/wp-json/wp/v2/posts/?per_page=20"
    ).catch(errorHandle)
  ).json();
  console.log("Hola que ase");
  console.table(data);
}

x();

fetch(`https://www.caisocios.com/wp-json/wp/v2/posts`, {
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
