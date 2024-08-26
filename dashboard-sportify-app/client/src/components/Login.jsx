import React from 'react';
import logo from '../assets/img/logo.jpg'

const Login = () => {
  return (
    <div style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover' }} className='fixed w-full  h-full top-0 left-0 z-30'>
      <div className='container p-5 mx-auto flex-col  flex items-center justify-between '>
        <div className='text-pink-50 text-3xl px-6 py-2 mx-2 my-4'><h1> Shark Team Is The Best</h1></div>
        <div className='flex mx-auto'>
          <button className='border-2 rounded-full text-white border-blue-500 px-6 py-2 mx-2 my-4 '>
            <a className='font-hero text-lg text-pink underline underline-offset-1'
              href='http://localhost:8000/login'>
              Login to Dashboard
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
