import firma from "console-signature";
import Highway from "@dogstudio/highway";

// Call Highway.Core once.
// Store it in a variable to use events
const H = new Highway.Core();
firma({
  author: "Aisling",
  url: "www.aisling.com",
});
