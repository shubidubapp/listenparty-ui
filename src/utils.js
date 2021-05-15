const baseURL = process.env.VUE_APP_BASEURL;

export const APIUrlGen = (target) => `${baseURL}/${target}`;

export const constants = {
  // listen party
  streamerUpdateInterval: 1000, //ms
  statusUpdateInterval: 10000, //ms

  // Alerts
  alertFadeTimer: 5,
  inactiveTimer: 5,

  // StreamListPage
  streamListWindowSize: 5,
  streamListUpdateInterval: 5000, //ms

  // ActiveStreamPage
  listenerListWindowSize: 5,
  listenerListUpdateInterval: 5000, //ms

  updatePlayerInterval: 700, // ms
};
