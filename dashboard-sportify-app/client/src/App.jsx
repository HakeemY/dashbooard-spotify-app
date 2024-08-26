import { useState, useEffect } from 'react';
import {Login, Sidebar} from './components/index'

import Main from './Routes.jsx';
import { accessToken } from './Spotify';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);
  return (
    <div className='App'>
      {!token ? (
        <>
          <Login />
        </>
      ) : (
        <>
          <div className=' min-h-screen min-w-screen bg-textgray relative flex '>
            <Sidebar />
            <Main />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
