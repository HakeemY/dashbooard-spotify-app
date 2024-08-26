import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { catchErrors, formatDuration } from '../utils';
import {
  getCurrentUserProfile,
  getCurrentUserplaylist,
  getUserTopArtistLong,
  getUserTopTrack,
  getFollowing,
} from '../Spotify';

const Playlist = () => {
  const [profile, setUserProfile] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const userProfile = await getCurrentUserProfile();
      setUserProfile(userProfile.data);

      const userPlaylist = await getCurrentUserplaylist();
      setPlaylist(userPlaylist.data.items);
    } catch (error) {
      // Handle errors here
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    catchErrors(fetchData());
  }, []);

  return (
    <div className="flex flex-wrap justify-center bg-mainBG md:max-w-full max-w-screen-sm h-full  bg-gray-900">
      {playlist.map((p) => (
        <div key={p.id} className="max-w-xs rounded overflow-hidden shadow-lg m-4 text-white">
          {p.images.length > 0 && (
          <img className="w-full text-white" src={p.images[0].url} alt={`Playlist ${p.name} image`} />
          )}
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{p.name}</div>
            <p className="text-white text-base">
              Owner: {p.owner.display_name}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Tracks: {p.tracks.total}
            </span>
          </div>
          <div>
          <Link to="/playlists/:id">Go to Playlist</Link>
          </div>
       
        </div>
      ))}
    </div>
  );
};

export default Playlist;