import { useState, useEffect, useCallback } from 'react';
import {
  getUserTopArtistLong,
  getTopArtistsMedium,
  getTopArtistsShort,
} from '../Spotify';
import { catchErrors } from '../utils';
import { Link, useNavigate } from 'react-router-dom';

const TopArtist = () => {
  const  navigate = useNavigate()
  const [topArtist, setTopArtist] = useState(null);
  const [buttons, setButtons] = useState([
    {
      id: 'long',
      enabled: false,
      frame: (
        
        <div
          className='text-white font-bold hover:cursor-pointer '
          onClick={() => setRangeData('long')}
        >
          <span className='font-sans  text-white rounded-full border border-sky-100 px-2 py-0.5 dark text-white-300 dark border-white-500/15 dark bg-gray-900/10 '> All Time</span>
        </div>
      ),
    },
    {
      id: 'medium',
      enabled: false,
      frame: (
        <div
          className='text-white font-bold hover:cursor-pointer '
          onClick={() => setRangeData('medium')}
        >
          <span className=' font-sans  text-white rounded-full border border-sky-100 px-2 py-0.5 dark text-white-300 dark border-white-500/15 dark bg-gray-900/10'>Last 6 Months</span>
        </div>
      ),
     
    },
    {
      id: 'short',
      enabled: false,
      frame: (
        <div
          className='text-white font-bold hover:cursor-pointer '
          onClick={() => setRangeData('short')}
        >
          <span className= 'font-sans  text-white rounded-full border border-sky-100 px-2 py-0.5 dark text-white-300 dark border-white-500/15 dark bg-gray-900/10'>Last 4 Weeks</span>
        </div>
      ),
    },
  ]);

  const rangesEl = [
    {
      frame: (
        <div
          className='text-white font-bold hover:cursor-pointer '
          onClick={() => setRangeData('long')}
        >
          <span className='truncate'> All Time</span>
        </div>
      ),
    },
    {
      frame: (
        <div
          className='text-white font-bold hover:cursor-pointer '
          onClick={() => setRangeData('medium')}
        >
          <span className='truncate'>Last 6 Months</span>
        </div>
      ),
    },
    {
      frame: (
        <div
          className='text-white font-bold hover:cursor-pointer '
          onClick={() => setRangeData('short')}
        >
          <span className='truncate'>Last 4 Weeks</span>
        </div>
      
      ),
    },
  ];

  const apiCalls = {
    long: getUserTopArtistLong(),
    medium: getTopArtistsMedium(),
    short: getTopArtistsShort(),
  };
  const fecthArtist = useCallback(async () => {
    const getdata = await getUserTopArtistLong();
    setTopArtist(getdata.data);
    console.log("line 95 top artist: ", getdata.data)
  });
  
  const changeRange = useCallback(async (range) => {
    const dataRange = await apiCalls[range];
    setTopArtist(dataRange.data);
  });

  const setRangeData = (range) => catchErrors(changeRange(range));

  useEffect(() => {
    catchErrors(fecthArtist());
  }, []);

  return (
    <div className='bg-mainBG md:max-w-full max-w-screen-sm	 h-full flex-wrap bg-gray-900'>
      
      <div className='md:py-[60px] md:px-[60px]  py-[30px] px-[30px]'>
          <p className ='text-3xl font-sans font-medium text-white rounded-full border border-sky-100 px-2 py-0.5 dark text-white-300 dark border-white-500/15 dark bg-gray-900/10 w-fit'>Top Artists</p>
       
      <div className=' flex flex-row md:flex-col justify-end space-x-10 items-end pb-8 '>
     
        <div className='flex flex-row space-x-4 '>
          {buttons.map(({ id, enabled,frame }, text) => {
            return (
              <div key={id} className={enabled ? '' : ''}>
                <button
                  onClick={() => {
                    setButtons((prevButtons) => {
                      return prevButtons.map((button) => {
                        return {
                          ...button,
                          enabled: button.id === id ? !button.enabled : false,
                        };
                      });
                    });
                  }}
                >
                  <div className={enabled ? 'underline text-white' : ''}>
                  {frame}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
        </div>
        {topArtist ? (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-[20px] items-center'>
            {topArtist.items.map((artist, i) => {
              const artistID = artist.id;
              return (
               
                  <div onClick={() => navigate(`/artist/${artistID}`)} data-href={`/artist/${artistID}`} tabindex="0" 
                  key={artistID}
                  role="link" className='flex md:flex-col  py-3 cursor-pointer hover:shadow-md px-2 '>
                    {artist.images.length && artist.images[0].url && (
                      <img
                        src={artist.images[0].url}
                        className='  w-22 h-22 object-cover rounded-lg'
                        alt='Avatar'
                      />
                    )}

                    <div className='align-super items-center  px-2 w-full'>
                      <span className='text-sm text-white  hover:cursor-pointer hover:underline capitalize font-semibold pt-2'>
                        {artist.name}
                      </span>
                    </div>
                  </div>
               
              );
            })}
          </div>
        ) : (
          <div>There is no artist </div>
        )}
      </div>
    </div>
  );
};

export default TopArtist;