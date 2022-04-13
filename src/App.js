import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useSound from "use-sound";
import CharacterGrid from "./components/CharacterGrid";
import Search from "./components/Search";
import logo from "./assets/img/logo.png";
import coverBG from "./assets/img/coverBG.jpg";
import shortLogo from "./assets/img/shortLogo.png";
import scrollBelowImg from "./assets/img/scrollBelowImage.png";
import music from "./assets/bb_rt.mp3";
import "./App.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [showTopBtn, setShowTopBtn] = useState(true);
  const [playing, setPlaying] = useState(false);
  const logoImageSection = useRef(null);
  const [play] = useSound(music);

  const scrollDown = () => {
    window.scrollTo({
      top: logoImageSection.current.offsetTop - 60,
      behavior: "smooth",
    });
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      );
      setItems(result.data);
      setIsLoading(false);
    };

    fetchItems();
  }, [query]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY === 0) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const handlePlay = () => {
    if (!playing) {
      play();
      setPlaying(true);
    }
  };

  return (
    <div onClick={handlePlay}>
      <img src={shortLogo} alt="short logo" className="shortLogoImg" />
      <img src={coverBG} className="coverBgImage" alt="" />
      {showTopBtn && window.innerWidth > 768 ? (
        <img
          src={scrollBelowImg}
          className="scrollBelow"
          onClick={scrollDown}
          alt="Scroll below"
        />
      ) : null}
      <img src={logo} className="logoImage" ref={logoImageSection} alt="" />
      <div className="container">
        <Search getQuery={(q) => setQuery(q)} />
        <CharacterGrid isLoading={isLoading} items={items} />
        <button className="scrollToTopBtn" onClick={goToTop}>
          Back to Top
        </button>
        <span style={{ padding: "40px", height: "10px" }}></span>
      </div>
    </div>
  );
};

export default App;
