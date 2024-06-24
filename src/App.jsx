import React from "react";
import "./App.css";
import Hero_scramble from "./components/hero_scramble/Hero_scramble";
import Scramble from "./components/Scramble";
import { useState, useEffect } from "react";
import image from "./images/a1.jpg";

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="main">
          <p>{isSmallScreen ? "Touch below!" : "Hover me!"}</p>
          <div className="header">
            <h1>
              <Scramble text="Narcolux Labs" />
            </h1>
            <p>
              <Hero_scramble />
            </p>
          </div>
          <div className="footer">
          <a href="https://read.cv/narcolux">Solo CV</a>
        </div>
        </div>
      
    </>
  );
}

export default App;
