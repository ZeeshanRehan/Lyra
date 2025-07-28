import React, { useState } from 'react';
import { getCurrentUser } from '../utils/authUtils';

const SongList = ({ songs }) => {
  const [activeId, setActiveId] = useState(null);
  const user = getCurrentUser();

  const saveToFavorites = (song) => {
  if (!user) return alert("Please log in to save songs!");

  const key = `favorites_${user.username}`;
  const existing = JSON.parse(localStorage.getItem(key)) || [];

  if (existing.find((s) => s.videoId === song.videoId)) {
    alert("Already saved!");
    return;
  }

  const updated = [...existing, song];
  localStorage.setItem(key, JSON.stringify(updated));
  alert("Saved to favorites!");
};


  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto mt-12">
      {songs.map((song, idx) => (
        <div
          key={idx}
          onMouseEnter={() => setActiveId(idx)}
          onMouseLeave={() => setActiveId(null)}
          className={`transition-all duration-300 ease-in-out rounded-2xl overflow-hidden border border-neutral-700 bg-zinc-900 cursor-pointer group ${
            activeId === idx ? 'h-[480px]' : 'h-[100px]'
          }`}
        >
         <div className="p-5 text-white font-semibold text-lg flex items-center justify-between">
  <span>{song.title.replace(/["“”]/g, '')}</span>

  {user && (
    <button
      onClick={() => saveToFavorites(song)}
      className="text-sm text-purple-300 hover:text-purple-500 transition"
    >
      ❤️ Save
    </button>
  )}
</div>


          {activeId === idx && song.videoId && (
            <div className="relative p-1 rounded-2xl">
              <div className="absolute inset-0 rounded-2xl pointer-events-none blur-md opacity-30 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse z-0" />
              <iframe
                className="relative z-10 w-full h-[390px] rounded-2xl"
                src={`https://www.youtube.com/embed/${song.videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SongList;
