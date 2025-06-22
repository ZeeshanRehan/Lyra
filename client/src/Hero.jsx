import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';

export default function Hero() {
  const prompts = [
    "a rainy train ride home",
    "a breakup but peaceful",
    "coding at 3AM",
    "final boss anime vibes",
    "gym PR lift with no mercy"
  ];

  const [placeholder, setPlaceholder] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = prompts[wordIndex];
    let timeout;

    if (!deleting && charIndex <= currentWord.length) {
      timeout = setTimeout(() => {
        setPlaceholder(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setPlaceholder(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 40);
    } else {
      timeout = setTimeout(() => {
        setDeleting(!deleting);
        if (!deleting) setCharIndex(currentWord.length);
        else {
          setWordIndex((wordIndex + 1) % prompts.length);
          setCharIndex(0);
        }
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start px-4 pt-10">
      <Navbar />

      <div className="text-center max-w-2xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4">
          Stop the Loop.
        </h1>
        <h2 className="text-3xl sm:text-4xl font-semibold text-purple-400 mb-6">
          Find New Music.
        </h2>

        <p className="text-md sm:text-lg text-gray-300 leading-relaxed mb-10">
          Explore amazing music beyond your daily repeats.
          <br />
          Pour your feelings in — get something that resonates.
          <br />
          Something made just for you.
        </p>
      </div>

      <div className="w-full max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-5 py-3 rounded-xl text-white text-md focus:outline-none border border-purple-400 focus:ring-2 focus:ring-purple-500 transition-shadow shadow-purple-500/20 shadow-sm animate-glow"
        />

        <div className="flex justify-center gap-4 mt-6">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-full transition duration-200 shadow-lg hover:shadow-purple-500/30">
            Cook My Vibe 🎶
          </button>

          <button className="relative group overflow-hidden bg-white/10 text-white font-semibold px-6 py-2 rounded-full transition duration-300 border border-purple-500 hover:bg-purple-600 hover:text-white">
            <span className="inline-block transition-transform group-hover:-translate-y-1 group-hover:scale-105">
              🚀 Feeling Lucky
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
