const baseURL = process.env.VUE_APP_BASEURL;

export const APIUrlGen = (target) => `${baseURL}/${target}`;

export const constants = {
  // Alerts
  alertFadeTimer: 5,

  // StreamListPage
  streamListWindowSize: 15,
  streamListUpdateInterval: 5000, //ms
};
