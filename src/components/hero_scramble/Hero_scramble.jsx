import React, { useEffect, useRef, useState } from 'react';

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 50);
      const end = start + Math.floor(Math.random() * 50);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const TextScrambleComponent = ({ delay = 2000 }) => {
  const phrases = [
    "Website Developemnt",
    "Website Maintenance",
  ];
  const elRef = useRef(null);
  const [scrambler, setScrambler] = useState(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setScrambler(new TextScramble(elRef.current));
  }, []);

  useEffect(() => {
    if (scrambler) {
      const next = () => {
        scrambler.setText(phrases[counter]).then(() => {
          setTimeout(() => {
            setCounter((prevCounter) => (prevCounter + 1) % phrases.length);
          }, delay);
        });
      };
      next();
    }
  }, [scrambler, counter, delay]);

  return (
    <div className="container">
      <div className="text" ref={elRef}></div>
    </div>
  );
};

export default TextScrambleComponent;
