import axios from 'axios';

// Localstorage key names "spotify_access_token"
const LOCALSTORAGE_KEYS = {
  accessToken: 'spotify_access_token',
  refreshToken: 'spotify_refresh_token',
  expireTime: 'spotify_token_expire_time',
  timestamp: 'spotify_token_timestamp',
};

// Retrieve Localstorage Value
const LOCALSTORAGE_VALUE = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUE;
  //First, it checks if the access token and timestamp are present in the local storage.
  if (!accessToken || !timestamp) {
    // If they are not present, it returns false.
    return false;
  }
  // If they are present it calculates the number of milliseconds passed since the timestamp.
  const millisecondsElapsed = Date.now() - Number(timestamp);
  // It then checks if the number of milliseconds elapsed is greater than the expire time.
  return millisecondsElapsed / 1000 > Number(expireTime);
  /** @returns {boolean} Whether or not the access token in localStorage has expired*/
};

export const logout = () => {
  // loop through localstroage keys
  for (const property in LOCALSTORAGE_KEYS) {
    //remove all localstorage items
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  // return to home page 'Login page'
  window.location = window.location.origin;
};

/** 
1. First, it checks if the refresh token is available in localStorage. If not, it logs out the user.
2. If the refresh token is available, it checks if the refresh token is expired. If it is, it logs out the user.
3. If the refresh token is not expired, it makes a request to the `/refresh_token` endpoint from our Node app.
4. If the request is successful, it updates the localStorage values.
5. Finally, it reloads the page for localStorage updates to be reflected.
 */
const refreshToken = async () => {
  try {
    if (
      !LOCALSTORAGE_VALUE.refreshToken ||
      LOCALSTORAGE_VALUE.refreshToken == 'undefinded' ||
      Date.now() - Number(LOCALSTORAGE_VALUE.timestamp) / 1000 < 1000
    ) {
      console.log('Error no refresh token available');
      logout();
    }
    // Use `/refresh_token` endpoint from our Node app
    const { data } = axios.get(
      `/refresh_token?refresh_token=${LOCALSTORAGE_VALUE.refreshToken}`
    );
    // Update localStorage values
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      data.accessToken
    );
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    // Reload the page for localStorage updates to be reflected
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
};

/**
 * Handles logic for retrieving the Spotify access token from localStorage
 * or URL query params
 * @returns {string} A Spotify access token
 */

const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const hasError = urlParams.get('error');
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
  };

  // If there's an error OR the token in localStorage has expired, refresh the token
  if (
    hasError ||
    hasTokenExpired() ||
    LOCALSTORAGE_VALUE.accessToken == 'undefinded'
  ) {
    return refreshToken();
  }

  // If there is a valid access token in localStorage, use that
  if (
    LOCALSTORAGE_VALUE.accessToken &&
    LOCALSTORAGE_VALUE.accessToken !== 'undefinded'
  ) {
    return LOCALSTORAGE_VALUE.accessToken;
  }

  // If there is a token in the URL query params, user is logging in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // Store the query params in localStorage
    for (const property in queryParams) {
      // loop through queryParams
      window.localStorage.setItem(property, queryParams[property]);
    }
    // Set Timestamp
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    // Return access token from query params
    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }
  // We should never get here!
  return false;
};

export const accessToken = getAccessToken();


axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-current-users-profile
 * @returns {Promise}
 */
export const getCurrentUserProfile = () => axios.get('/me');
export const getCurrentUserplaylist = () => {return axios.get(`/me/playlists`);
};
export const getUserTopArtistLong = (limit = 50, time_range = 'long_term') => {
  return axios.get(`/me/top/artists?limit=${limit}&time_range=${time_range}`);
};

export const getTopArtistsMedium = (limit = 50, time_range = 'medium_term') => {
  return axios.get(`/me/top/artists?limit=${limit}&time_range=${time_range}`);
};

export const getTopArtistsShort = (limit = 50, time_range = 'short_term') => {
  return axios.get(`/me/top/artists?limit=${limit}&time_range=${time_range}`);
};

export const getUserTopTrack = (limit = 10, time_range = 'long_term') => {
  return axios.get(`/me/top/tracks?time_range=long_term&limit=10`);
};

export const getFollowing = (type = 'artist') => {
  console.log("hello ", type)
  return axios.get(`/me/following?type=artist`);
};

export const getArtist = (artistID) => {
  return axios.get(`/artists/${artistID}`);
};

export const  getPlaylistById = (playlist_id) => {
  return axios.get(`/playlists/${playlist_id}`);
};
