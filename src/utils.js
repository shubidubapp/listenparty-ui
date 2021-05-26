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

// https://stackoverflow.com/a/22581382/12960079
export function copyToClipboard(elem) {
  // create hidden text element, if it doesn't already exist
  var targetId = "_hiddenCopyText_";
  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
  var origSelectionStart, origSelectionEnd;
  var targetCreated = false;

  if (isInput) {
    // can just use the original source element for the selection and copy
    target = elem;
    origSelectionStart = elem.selectionStart;
    origSelectionEnd = elem.selectionEnd;
  } else {
    // must use a temporary form element for the selection and copy
    target = document.getElementById(targetId);
    if (!target) {
      var target = document.createElement("textarea");
      target.style.position = "absolute";
      target.style.left = "-9999px";
      target.style.top = "0";
      target.id = targetId;
      document.body.appendChild(target);
      targetCreated = true;
    }
    target.textContent = elem.textContent;
  }
  // select the content
  var currentFocus = document.activeElement;
  target.focus();
  target.setSelectionRange(0, target.value.length);

  // copy the selection
  var succeed;
  try {
    succeed = document.execCommand("copy");
  } catch (e) {
    succeed = false;
  }
  // restore original focus
  if (currentFocus && typeof currentFocus.focus === "function") {
    currentFocus.focus();
  }

  if (isInput) {
    // restore prior selection
    elem.setSelectionRange(origSelectionStart, origSelectionEnd);
  } else {
    // clear temporary content
    target.textContent = "";
  }
  if (targetCreated) {
    document.body.removeChild(target);
  }
  return succeed;
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

  ActionType: {
    // keep at top
    message: 1,
    add_dj: 2,
    add_queue: 3,
    // keep at bottom
    error: 4,
  },
};
