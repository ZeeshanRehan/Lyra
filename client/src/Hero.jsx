import React, { useState } from 'react';
import SongCard from './Components/SongCard';
import Navbar from './Components/Navbar';
import { useTypewriter } from 'react-simple-typewriter';
import SongList from './Components/SongList';

export default function Hero() {
  const [prompt, setPrompt] = useState('');
  const [creativity, setCreativity] = useState(70); // Default 70%
  const [loading, setLoading] = useState(false);
 const [songs, setSongs] = useState('');
const [results, setResults] = useState([]);

  const [text] = useTypewriter({
    words: [
      "a rainy train ride home",
      "a breakup but peaceful",
      "coding at 3AM",
      "final boss anime vibes",
      "gym PR lift with no mercy"
    ],
    loop: true,
    delaySpeed: 1500,
    typeSpeed: 60,
    deleteSpeed: 30
  });

const handleSubmit = async () => {
  setLoading(true);
  setResults([]);
  try {
    const response = await fetch("https://lyra21-49332ff8d951.herokuapp.com/api/generate", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vibe: prompt,
        artist: '',
        energy: 0.5,
        creativity: creativity
      }),
    });

    const data = await response.json();
    const rawSongs = data.songs
      .split('\n')
      .map((line) => line.replace(/^\d+\.\s*/, '').trim())
      .filter(Boolean)
      .slice(0, 3);

    const fetchedResults = await Promise.all(
      rawSongs.map(async (song) => {
        const ytRes = await fetch(`https://lyra21-49332ff8d951.herokuapp.com/api/youtube?q=${encodeURIComponent(song)}`);
        const ytData = await ytRes.json();

        return {
          title: song,
          videoUrl: ytData.url,
          thumbnail: ytData.thumbnail,
          videoId: ytData.videoId // 👈 you NEED this for iframe to work
        };
      })
    );

    console.log("✅ Final results sent to SongList:", fetchedResults); // 👈 HERE

    setResults(fetchedResults);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-start px-4 pt-10">
      {/* <Navbar /> */}

      <div className="text-center max-w-2xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">Stop the Loop.</h1>
        <h2 className="text-3xl sm:text-4xl font-semibold text-purple-400 mb-6">Find New Music.</h2>

        <p className="text-md sm:text-lg text-gray-300 leading-relaxed mb-10">
          Explore amazing music beyond your daily repeats.
          <br />
          Pour your feelings in — get something that resonates.
          <br />
          Something made just for you.
        </p>
      </div>

      {/* === Input & Slider === */}
      <div className="w-full max-w-xl mx-auto mb-6">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={text}
          className="w-full px-5 py-3 rounded-xl text-white text-md focus:outline-none border border-purple-400 focus:ring-2 focus:ring-purple-500 transition-shadow shadow-purple-500/20 shadow-sm animate-glow"
        />

        {/* 🔥 Creativity Slider */}
        <div className="mt-6 text-left">
          <label className="block text-sm text-purple-300 font-medium mb-1">
            🎨 Creativity Level: {creativity}%
          </label>
          <input
            type="range"
            min={20}
            max={100}
            step={5}
            value={creativity}
            onChange={(e) => setCreativity(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-full transition duration-200 shadow-lg hover:shadow-purple-500/30"
          >
            Search Songs 🎵
          </button>

          <button className="relative group overflow-hidden bg-white/10 text-white font-semibold px-6 py-2 rounded-full transition duration-300 border border-purple-500 hover:bg-purple-600 hover:text-white">
            <span className="inline-block transition-transform group-hover:-translate-y-1 group-hover:scale-105">
              🚀 Feeling Lucky
            </span>
          </button>
        </div>
        {loading && <p className="mt-4 text-purple-300">🎧 Searching...</p>}


 {results.length > 0 && (
  <SongList songs={results} />
)}

{!loading && songs && (
  <div className="mt-6 text-left bg-white/10 p-4 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold text-purple-300 mb-2">Your vibe playlist:</h3>
    {songs.split('\n').map((line, idx) => (
      <p key={idx} className="text-white">{line}</p>
    ))}
  </div>
)}
      </div>
    </div>
  );
}
