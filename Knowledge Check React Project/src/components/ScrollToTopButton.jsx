import { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      setVisible(true);
    } else if (scrolled <= 200) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <FaArrowCircleUp className="button scroll-button"
      onClick={scrollToTop}
      style={{ display: visible ? "inline" : "none" }}
      title="Scroll Top"
    />
  );
};

export default ScrollToTopButton;
