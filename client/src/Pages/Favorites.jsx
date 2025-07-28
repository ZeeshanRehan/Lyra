import { useEffect, useState } from 'react';
import { getCurrentUser } from '../utils/authUtils';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      const data = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
      setFavorites(data);
    }
  }, [user]);

  const removeFromFavorites = (videoId) => {
    const updated = favorites.filter((song) => song.videoId !== videoId);
    setFavorites(updated);
    localStorage.setItem(`favorites_${user.username}`, JSON.stringify(updated));
  };

  if (!user) {
    return <div className="text-white text-center mt-10">Please log in to view your favorites.</div>;
  }

  return (
    <div className="text-white max-w-4xl mx-auto px-4 pt-10">
      <h2 className="text-3xl font-bold mb-6">❤️ Your Saved Vibes</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-400">No favorites yet. Go vibe and save some songs!</p>
      ) : (
        <div className="space-y-8">
          {favorites.map((song, idx) => (
            <div key={idx} className="bg-white/10 p-4 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3">{song.title}</h3>
              <iframe
                className="w-full rounded-xl"
                height="360"
                src={`https://www.youtube.com/embed/${song.videoId}`}
                title={song.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => removeFromFavorites(song.videoId)}
                className="mt-4 text-sm text-red-400 hover:text-red-500"
              >
                💔 Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
