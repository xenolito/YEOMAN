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

firma({
  author: "Aisling",
  url: "www.aisling.com",
});
