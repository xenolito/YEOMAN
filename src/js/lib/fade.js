import Highway from "@dogstudio/highway";
import { TimelineMax } from "gsap";

class Fade extends Highway.Transition {
  out({ from, done }) {
    //console.log("OUT", from);
    new TimelineMax({ onComplete: done }).to(from, 0.3, { opacity: 0 });
  }
  in({ from, to, done }) {
    from.remove();
    new TimelineMax({ onComplete: done }).fromTo(
      to,
      0.3,
      { opacity: 0 },
      { opacity: 1 }
    );
    //console.log("IN", from, to);
  }
}

export default Fade;
