import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../Spotify';
import {
  PlayIcon,
  ChevronDoubleLeftIcon,
  UserIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid';
import { images } from '../constants';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const routes = [
    {
      name: 'Profile',
      path: '/',
      icon: (
        <UserIcon className='h-8 w-8 fill-current text-textgray group-hover:text-textwhite' />
      ),
    },
    {
      name: 'Top Artist',
      path: '/top-artists',
      icon: (
        <MicrophoneIcon className='h-8 w-8 fill-current text-textgray group-hover:text-textwhite' />
      ),
    },
    {
      name: 'Top Tracks',
      path: '/top-tracks',
      icon: (
        <MusicalNoteIcon className='h-8 w-8 fill-current text-textblue group-hover:text-textwhite' />
      ),
    },
    {
      name: 'PlayList',
      path: '/playlists',
      icon: (
        <PlayIcon className='h-8 w-8 fill-current text-textgray group-hover:text-textwhite' />
      ),
    },
    {
      name: 'Logout',
      icon: (
        <button onClick={logout}>
          <ArrowRightOnRectangleIcon className='h-8 w-8 fill-current text-textgray group-hover:text-textwhite' />
        </button>
      ),
    },
  ];

  const sideBar = routes.map(({ name, path, icon, gap }) => (
    <Link
      className={`flex  rounded-md p-2 cursor-pointer hover:bg-gray-300 text-gray  text-base items-center gap-x-4 mt-2 `}
      key={name}
      to={path}
    >
      {icon}
      <span className={`${!open && 'hidden'} origin-left duration-200`}>
        {name}
      </span>
    </Link>
  ));

  return (
    <div className=''>
      <div
        className={` ${open ? 'w-72' : 'w-20 '
          } bg-myblack h-full p-5  pt-8 relative duration-300`}
      >
        <ChevronDoubleLeftIcon
          className={`absolute cursor-pointer -right-3 top-9 w-7 stroke-current stroke-1 bg-white border-red-600
          border-2 rounded-full  ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />

        <div className='flex gap-x-4 items-center '>
          <img
            src={images.logo}
            className={`cursor-pointer duration-500 w-16 rounded-md ${open && 'rotate-[360deg]'
              }`}
          />
          <h1
            className={`text-blue font-nav origin-left font-bold text-xl duration-200 ${!open && 'scale-0'
              }`}
          >
            Hakeem Spotify Dashboard
          </h1>
        </div>
        <ul className='pt-6'>{sideBar}</ul>
      </div>
    </div>
  );
};

export default Sidebar;
