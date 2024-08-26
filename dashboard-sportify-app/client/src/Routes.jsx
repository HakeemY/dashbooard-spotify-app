import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Profile, Playlist, TopArtist, InnerContent, Artist, PlaylistPage,} from './components/index';


const Main = () => {
  return (
    <div className='flex-1'>
      <Routes>
        <Route path='/' element={<InnerContent />}>
          <Route path='/' element={<Navigate replace to='profile' />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/top-artists' element={<TopArtist />} />
          <Route path='/artist/:artistID' element={<Artist />} />
          <Route path='/top-tracks' element={<></>} />
          <Route path='/playlists' element={<Playlist />} />
          <Route path='/playlists/:id' element={<PlaylistPage/>} />

        </Route>
      </Routes>
    </div>
  );
};

export default Main;
