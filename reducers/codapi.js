import axios from 'axios';

const GET_LEADERBOARD = 'GET_LEADERBOARD'
const GET_MATCHES = 'GET_MATCHES'
const GET_PROFILE = 'GET_PROFILE'

const BASE_URL = 'https://cod-api.tracker.gg/v1/standard/bo4/profile';

export const getLeaderboard = (params) => {
  const { title, platform, time, type, mode, page } = params
  console.log(page)
  const leaderboardEndpoint = BASE_URL + '/leaderboards/v2'
  const uri = 
    `${leaderboardEndpoint}/title/${title}/platform/${platform}/time/${time}/type/${type}/mode/${mode}/page/${page}`
  return (dispatch) => {
    axios.get(uri)
      .then( res => dispatch({
        type: GET_LEADERBOARD,
        leaderboard: res.data.data
      }) )
      .catch( res => {setFlash(res, 'red')})
  }
}

export const getProfile = (params) => {
  const { platform, username } = params
  const uri = 
    `${BASE_URL}/${platform}/${username}`
  return (dispatch) => {
    axios.get(uri)
      .then( res => dispatch({
        type: GET_PROFILE,
        profile: res.data.data,
      }) )
      .catch( res => {setFlash("We were unable to find your profile, please try again", 'red')})
  }
}

export const getMatches = (params) => {
  const { title, platform, username, days } = params
  const matchesEndpoint = BASE_URL + '/crm/cod/v2'
  const uri = 
    `${matchesEndpoint}/title/${title}/platform/${platform}/gamer/${username}/matches/days/${days}`
  axios.get(uri)
      .then( res => {matches: res.data.data.matches})
      .catch( res => {setFlash(res, 'red')})
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_LEADERBOARD:
      return action.leaderboard;
    case GET_MATCHES:
      return action.matches;
    case GET_PROFILE:
      return action.profile;
    default:
      return state;
  }
};

