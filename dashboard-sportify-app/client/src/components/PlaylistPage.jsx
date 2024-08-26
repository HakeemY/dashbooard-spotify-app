import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom'; 
import { catchErrors, formatDuration } from '../utils';
import { getPlaylistById } from '../Spotify'; 

const PlaylistPage = () => {
    const [playlist, setPlaylist] = useState(null);
    const { playlistId } = useParams(); 

    const fetchPlaylist = useCallback(async () => {
        try {
            const playlistData = await getPlaylistById(playlistId);
            setPlaylist(playlistData);
        } catch (error) {
            console.error('Error fetching playlist:', error);
        }
    }, [playlistId]);

    useEffect(() => {
        catchErrors(fetchPlaylist());
    }, [fetchPlaylist]);

    if (!playlist) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{playlist.name}</h1>
                <p>Owner: {playlist.owner.display_name}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {playlist.tracks.items.map((track) => (
                    <div key={track.id} className="p-4 bg-white rounded shadow">
                        <img
                            className="w-full h-40 object-cover mb-4 rounded"
                            src={track.album.images[0].url}
                            alt={`Cover art for ${track.name}`}
                        />
                        <h2 className="text-xl font-semibold">{track.name}</h2>
                        <p>{track.artists.map((artist) => artist.name).join(', ')}</p>
                        <p>{formatDuration(track.duration_ms)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlaylistPage;
