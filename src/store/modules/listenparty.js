import axios from "axios";
import socket from "../../socket-client";
import spotifyWebAPI from "../../spotifyWebAPI";

axios.defaults.withCredentials = true; // makes axios send and receive cookies

const baseURL = process.env.VUE_APP_BASEURL;

const _ = (target) => `${baseURL}/${target}`;

const state = {
  spotifyToken: null,
  loggedIn: false,
  messages: [],
  status: { activity: "NONE", username: "" },
  streamUpdaterInterval: null,
};

const getters = {
  loginUrl: () => _("api/login"),
  logoutUrl: () => _("api/logout"),
  loggedIn: (state) => state.loggedIn,
  getMessages: (state) => state.messages,
  status: (state) => state.status,
};

const actions = {
  checkLogin: async ({ commit, dispatch }) => {
    const { data } = await axios.get(_("api/logged-in"));

    // if logged in and socket is not connected. connect.
    // if not logged in and socket is connected. disconnect.
    if (data.loggedIn && !socket.connected) {
      socket.connect();
    } else if (!data.loggedIn && socket.connected) {
      socket.disconnect();
    }

    if (data.loggedIn && spotifyWebAPI.spotifyToken == null) {
      dispatch("refreshSpotifyToken");
      spotifyWebAPI.tokenGetter = () => {
        dispatch("refreshSpotifyToken");
      };
    } else {
      spotifyWebAPI.tokenGetter = null;
    }

    commit("setLoggedIn", data.loggedIn);
  },
  refreshSpotifyToken: async () => {
    const { data } = await axios.get(_("api/access_token"));
    spotifyWebAPI.spotifyToken = data.access_token;
  },
  handleSocketResponse: ({ commit, state, dispatch }, data) => {
    commit("handleSocketResponse", data);
    if (data && data.status) {
      if (
        state.status.activity == "STREAM" &&
        state.streamUpdaterInterval == null
      ) {
        state.streamUpdaterInterval = setInterval(
          () => dispatch("streamerUpdate"),
          5000
        );
      } else if (
        state.status.activity == "LISTEN" &&
        state.streamUpdaterInterval == null
      ) {
        state.streamUpdaterInterval = setInterval(
          () => dispatch("updateStatus"),
          10000
        );
      } else if (
        state.status.activity == "NONE" &&
        state.streamUpdaterInterval != null
      ) {
        commit("clearStreamInterval");
      }
    }
  },
  start_listening: async ({ dispatch }, streamName) => {
    socket.emit(
      "listen_stream",
      {
        stream_name: streamName,
      },
      (data) => dispatch("handleSocketResponse", data)
    );
  },

  start_streaming: async ({ dispatch }, streamName) => {
    socket.emit(
      "start_stream",
      {
        stream_name: streamName,
      },
      (data) => dispatch("handleSocketResponse", data)
    );
  },
  stop: async ({ dispatch }) => {
    socket.emit("stop", (data) => dispatch("handleSocketResponse", data));
  },
  streamerUpdate: async ({ dispatch, state }) => {
    const playbackStatus = await spotifyWebAPI.getState();
    if (!playbackStatus) return;
    const stream_data = {
      track_name: playbackStatus.item.name,
      artists: playbackStatus.item.artists.map((x) => {
        return x.name;
      }),
      duration: playbackStatus.item.duration_ms,
      progress: playbackStatus.progress_ms,
      volume_percent: playbackStatus.device.volume_percent,
      timestamp: playbackStatus.timestamp,
      is_playing: playbackStatus.is_playing,
      track_uri: playbackStatus.item.uri,
    };
    socket.emit(
      "streamer_update",
      { stream_name: state.status.stream, stream_data: stream_data },
      (data) => dispatch("handleSocketResponse", data)
    );
  },
  updateStatus: async ({ dispatch }) => {
    socket.emit("status", (data) => dispatch("handleSocketResponse", data));
  },
  socket_listenerUpdate: async ({ dispatch }, data) => {
    const playbackStatus = await spotifyWebAPI.getState();
    let device = null;

    const { stream_data, status } = data;

    if (playbackStatus == "") {
      device = await spotifyWebAPI.getAnyPlaybackDevice();

      await spotifyWebAPI.start({
        deviceId: device,
        uris: [stream_data.track_uri],
        position_ms: stream_data.progress,
      });
      dispatch("handleSocketResponse", { status: status });
      return;
    }

    if (playbackStatus.device.is_active) {
      device = playbackStatus.device.id;
    } else {
      device = await spotifyWebAPI.getAnyPlaybackDevice();
    }

    if (device == null) {
      dispatch("stop");
      return;
    }
    const timeDiff = Math.abs(
      playbackStatus.progress_ms - stream_data.progress
    );
    if (playbackStatus.item.uri != stream_data.track_uri) {
      await spotifyWebAPI.start({
        deviceId: device,
        uris: [stream_data.track_uri],
        position_ms: stream_data.progress,
      });
    } else if (playbackStatus.is_playing && !stream_data.is_playing) {
      await spotifyWebAPI.pause();
    } else if (!playbackStatus.is_playing && stream_data.is_playing) {
      await spotifyWebAPI.start({
        deviceId: device,
        uris: [stream_data.track_uri],
        position_ms: stream_data.progress,
      });
    } else if (timeDiff / 1000 > 5) {
      await spotifyWebAPI.seek(stream_data.progress);
    }
    dispatch("handleSocketResponse", { status: status });
  },
  socket_connect: async ({ dispatch }) => {
    dispatch("updateStatus");
  },
  socket_response: async ({ dispatch }, data) => {
    dispatch("handleSocketResponse", data);
  },
};

const mutations = {
  setLoggedIn: (state, loggedIn) => (state.loggedIn = loggedIn),
  handleSocketResponse: (state, data) => {
    if (!data) return;
    if (data.status) state.status = data.status;
    if (data.message) {
      if (state.messages.length > 3) {
        state.messages.splice(0, 1);
      }
      state.messages.push(data.message);
    }
  },
  removeMessage: (state, which) => {
    state.messages.splice(which, 1);
  },
  clearStreamInterval: (state) => {
    clearInterval(state.streamUpdaterInterval);
    state.streamUpdaterInterval = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
