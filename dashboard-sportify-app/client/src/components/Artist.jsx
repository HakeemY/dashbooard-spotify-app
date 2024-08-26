import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { catchErrors, numberWithCommas } from '../utils';
import { getArtist } from '../Spotify';

const Artist = () => {
  const { artistID } = useParams();
  const [artist, setArtist] = useState(null);

  const artistData = useCallback(async () => {
    const clickArtist = await getArtist(artistID);
    setArtist(clickArtist.data);
    console.log(clickArtist);
  });

  useEffect(() => {
    catchErrors(artistData());
  }, [artistID]);
  return (
    <div className='bg-mainBG md:max-w-full max-w-screen-sm h-full flex-wrap bg-gray-800'>
      <div className='md:py-[60px] md:px-[60px]  py-[30px] px-[30px]'>
        {artist && (
          <div className='bg-mainBG font-sans flex flex-col mt-[50px] justify-center items-center'>
            <div className='p-4 '>
              {artist.images.length && artist.images[0].url && (
                <img
                  src={artist.images[0].url}
                  className='w-44  rounded-full border-2 border-white'
                  alt='Avatar'
                />
              )}
            </div>
            <div className='p-4 text-white font-bold text-2xl'>
              {artist.name}
            </div>
            <div className='flex flex-row items-center text-center'>
              <div className='flex flex-col p-2 items-center text-white font-bold text-2xl'>
                {numberWithCommas(artist.followers.total)}
                <span className='text-sm capitalize text-white'>
                  Followers
                </span>
              </div>
              <div className='flex flex-col p-2 items-center text-white font-bold text-2xl'>
                {artist.popularity}%
                <span className='text-sm capitalize text-white'>
                  Popularity
                </span>
              </div>
            </div>
            <div className='flex flex-col items-center truncate'>
              <span className='text-sm capitalize font-bold text-white'>
                Genres
              </span>
              {artist.genres.map((items) => {
                return (
                  <div
                    className='text-white px-6 capitalize text-center mt-2 font-bold text-lg'
                    key={items}
                  >
                    {items}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default Artist;