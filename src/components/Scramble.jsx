import React, { useState, useEffect, useRef } from 'react';

const Scramble = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Clear interval on component unmount
  }, []);

  const handleMouseOver = (event) => {
    let iteration = 0;
  const letters = "<>-_\\/[]{}—=+*^?#________";
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join('');
      });

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 2;
    }, 50);
  };

  return (
    <span
      id="contact-header"
      data-value={text}
      onMouseOver={handleMouseOver}
    >
      {displayText}
    </span>
  );
};

export default Scramble;
