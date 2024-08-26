import { useState, useEffect, useCallback } from 'react';
import { catchErrors, formatDuration } from '../utils';
import Player from './Player';
import { Link } from 'react-router-dom';
import {
  getCurrentUserProfile,
  getCurrentUserplaylist,
  getUserTopArtistLong,
  getUserTopTrack,
  getFollowing,
} from '../Spotify';

const Profile = () => {
  const [profile, setUserProfile] = useState(null);
  const [followedArtist, setFollowedArtist] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [topTenArtist, setTopTenArtist] = useState(null);
  const [topTenTracks, setTopTenTracks] = useState(null);

  const fetchData = useCallback(async () => {
    const userProfile = await getCurrentUserProfile();
    console.log("user's profile: ", userProfile)
    setUserProfile(userProfile.data);

    const userPlaylist = await getCurrentUserplaylist();
    console.log("user's playlist: ", userPlaylist)
    setPlaylist(userPlaylist.data);
    
    // console.log('line 28')
    // const userFollowedArtist = await getFollowing();
    // console.log("user's followed artist: ", userFollowedArtist)
    // console.log('line 30')
    // setFollowedArtist(userFollowedArtist.data);

    const userToptenArtist = await getUserTopArtistLong();
    console.log("user's top ten artist: ", userToptenArtist)
    setTopTenArtist(userToptenArtist.data);
    
    const userTopTenTracks = await getUserTopTrack();
    console.log("user's top 10 tracks: " ,userTopTenTracks)
    setTopTenTracks(userTopTenTracks.data);
  });

  useEffect(() => {
    catchErrors(fetchData());
  }, []);

  const totalPlaylists = playlist ? playlist.total : 0;
  return (


  <div className='bg-mainBG md:max-w-full max-w-screen-sm  h-full flex-wrap  bg-gray-900'>
      <div className='md:py-[60px] md:px-[60px]  py-[30px] px-[30px]'>
        {profile && (
          <div className='flex flex-col justify-center items-center'>
            <div className='text-center'>
              {profile.images.length && profile.images[0].url && (
                <img
                  src={profile.images[0].url}
                  className='md:w-22 md:h-22 w-16 h-16 m-auto rounded-full object-cover lg:w-32 lg:h-32'
                  alt='Avatar'
                />
              )}
            </div>
            <h5 className=' mt-4 text-white text-4xl font-bold  block'>
              {profile.display_name}
            </h5>
            <div className='flex flex-row space-x-4 pt-4'>
              <h5 className=' text-gray-400 lg:block'>
                {profile && (
                  <span className='flex flex-col items-center '>
                    <span className='text-green font-bold text-lg'>
                      {profile.followers.total}
                    </span>
                    <span className='text-gray text-sm font-semibold font-nav'>
                      Follower{profile.followers.total !== 1 ? 's' : ''}
                    </span>
                  </span>
                )}
              </h5>
              <h5 className=' text-gray-400 lg:block'>
                {playlist && (
                  <span className=' flex flex-col items-center '>
                    <span className='text-green font-bold text-lg'>
                      {playlist.total}
                    </span>
                    <span className='text-gray text-sm font-semibold font-nav'>
                      Playlist{playlist.total !== 1 ? 's' : ''}
                    </span>
                  </span>
                )}
              </h5>
              {/* //CURRENTLY NOT WORKING */}
              <h5 className=' text-gray-400 lg:block'>
                {followedArtist && (
                  <span className=' flex flex-col items-center '>
                    <span className='text-green font-bold text-lg'>
                      {followedArtist.artists.items.length}
                    </span>
                    <span className='text-gray text-sm font-semibold font-nav'>
                      Following
                    </span>
                  </span>
                )}
              </h5>
            </div>
            
            <h5 className='pt-4 font-bold font-nav text-blue-500 block'>
              Account Level: {''}
              <span className='capitalize'>{profile.product}</span>
            </h5>
            <div className='pt-20 grid md:grid-cols-2 md:space-x-30  '>
            
              {topTenArtist ? (
                <TopTenArtist topTenArtist={topTenArtist.items} />
              ) : (
                <p className='text-red-600'>This Data is not available</p>
              )}
              <br /><br />
              {topTenTracks ? (
                <TopTenTracks topTenTracks={topTenTracks.items} />
              ) : (
                <p className='text-red-600' >This Data is not available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TopTenArtist = ({ topTenArtist }) => {
  console.log("line 133: ",topTenArtist)
  return (
    <div className=' md:mr-11 half '>
      <div className=' flex justify-between space-x-10 items-center pb-8'>
        <div className='text-white font-bold text-3xl'>Top Ten Artists </div>
        <div className=''>
        <button className='border-2 border-white truncate text-white rounded-full px-6 py-2 mx-2 my-4 '>
            See More
          </button>
        </div>
      </div>
      {topTenArtist.slice(0,9).map((items) => {
        const artistID = items.id;
        return (
          <Link
            to={`/artist/${artistID}`}
            key={items.name}
            className='flex flex-row items-center justify-between space-x-4 mb-[20px]'
          >
            <div className='flex  py-3 hover:shadow-md px-2 hover:scale-150 transition-all duration-500 cursor-pointer'>
              {items.images.length && items.images[0].url && (
                <img
                  src={items.images[0].url}
                  className='  w-16 h-16 object-cover rounded-lg'
                  alt='Avatar'
                />
              )}

              <div className='flex flex-col  align-super px-2 w-full'>
                <span className='text-sm text-white  hover:cursor-pointer hover:underline capitalize font-semibold pt-1'>
                  {items.name}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const TopTenTracks = ({ topTenTracks }) => {
  return (
    <div className='md:mr-11  '>
      <div className=' flex justify-between space-x-10 items-center pb-8'>
    
        <div className='text-white font-bold text-xl'>Top Ten Tracks </div>
        
        <div>
          <button className='border-2 border-white truncate text-white rounded-full px-6 py-2 mx-2 my-4 '>
            See More
          </button>
        </div>
      </div>
      <hr />
      
      
      {topTenTracks.slice(0,9).map((items)=> (
        
        <>
        <Link
          key={items.name}
          className='flex flex-row items-center justify-between space-x-4 mb-[20px] text-white'
        >
          <div className='flex  py-3 cursor-pointer hover:shadow-md px-2 hover:scale-150 transition-all duration-500  '>
  
              <img
                src={items?.album?.images[0]?.url}
                className=' w-16 h-16 object-cover rounded-lg'
                alt='Album Artwork'
              />
            

            <div className='flex flex-col  align-super px-2 w-full'>
              <span className='text-sm text-white  hover:cursor-pointer hover:underline capitalize font-semibold pt-1'>
                {items.name}
              </span>
              <span className='text-xs text-gray uppercase font-medium '>
                {items.artists &&
                  items.artists.map(({ name }, i) => (
                    <span key={i}>
                      {name}
                      {items.artists.length > 0 &&
                      i === items.artists.length - 1
                        ? ''
                        : ','}
                    </span>
                  ))}
              </span>
              <span className='text-xs text-gray uppercase font-medium '>
                {items.name}
              </span>
            </div>
          </div>
          <div className='text-gray'>
            {items.album[0]}
          </div>
        </Link>
        <Player trackUri = {items.uri} accessToken = "7e858d8671cf45eb9f443f6dddfe62bb"/>
        </>
      ))}
      </div>

);

};


export default Profile;
