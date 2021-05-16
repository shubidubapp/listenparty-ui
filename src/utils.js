const baseURL = process.env.VUE_APP_BASEURL;

export const APIUrlGen = (target) => `${baseURL}/${target}`;

export function getURLParameterByName(name, url = window.location.href) {
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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

  // spotify web player
  webPlayerName: "ListenParty Spotify Player",
};
