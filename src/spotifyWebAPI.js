import axios from "axios";

const apiURL = "https://api.spotify.com/v1";

class spotifyWebAPI {
  axios;
  spotifyToken = null;
  tokenGetter = null;

  constructor() {
    this.axios = axios.create();
    this.spotifyToken = null;
    this.tokenGetter = null;
    this.devices = [];
    this.activeDevice = null;
  }

  _setAuth(config) {
    if (config == undefined || config == null) {
      config = { headers: { Authorization: `Bearer ${this.spotifyToken}` } };
    } else {
      config.headers = { Authorization: `Bearer ${this.spotifyToken}` };
    }
    return config;
  }

  /**
   *
   * @param {String} target
   * @param {import("axios").AxiosRequestConfig} config
   * @returns
   */
  async get(target, config) {
    try {
      const { data } = await this.axios.get(
        `${apiURL}/${target}`,
        this._setAuth(config)
      );
      return data;
    } catch (error) {
      if (error.response && error.response.status == 401) {
        this.tokenGetter();
        const { data } = await this.axios.get(
          `${apiURL}/${target}`,
          this._setAuth(config)
        );
        return data;
      } else {
        throw error;
      }
    }
  }

  /**
   *
   * @param {String} target
   * @param {any} requestData
   * @param {import("axios").AxiosRequestConfig} config
   * @returns
   */
  async post(target, requestData, config) {
    try {
      const { data } = await this.axios.post(
        `${apiURL}/${target}`,
        requestData,
        this._setAuth(config)
      );
      return data;
    } catch (error) {
      if (error.response && error.response.status == 401) {
        this.tokenGetter();
        const { data } = await this.axios.post(
          `${apiURL}/${target}`,
          requestData,
          this._setAuth(config)
        );
        return data;
      } else {
        throw error;
      }
    }
  }

  /**
   *
   * @param {String} target
   * @param {any} requestData
   * @param {import("axios").AxiosRequestConfig} config
   * @returns
   */
  async put(target, requestData, config) {
    try {
      const data = await this.axios.put(
        `${apiURL}/${target}`,
        requestData,
        this._setAuth(config)
      );
      return data;
    } catch (error) {
      if (error.response && error.response.status == 401) {
        this.tokenGetter();
        const data = await this.axios.put(
          `${apiURL}/${target}`,
          requestData,
          this._setAuth(config)
        );
        return data;
      } else {
        throw error;
      }
    }
  }

  async me() {
    return this.get("me");
  }

  async getState() {
    return this.get("me/player");
  }

  async getDevices() {
    const { devices } = await this.get("me/player/devices");
    this.devices = devices;
    return devices;
  }

  async getAnyPlaybackDevice() {
    const devices = await this.getDevices();

    let activeDevice = null;
    for (let i = 0; i < devices.length; i++) {
      if (activeDevice == null || devices[i].is_active) {
        activeDevice = devices[i].id;
      }
    }
    return activeDevice;
  }

  async start(options) {
    let requestData = { uris: options.uris, position_ms: options.position_ms };
    let config = { params: { device_id: options.deviceId } };
    return this.put("me/player/play", requestData, config);
  }

  async pause() {
    return this.put("me/player/pause");
  }

  async setDevice(deviceId) {
    return this.put("me/player", { device_ids: [deviceId] });
  }

  async seek(position_ms) {
    return this.put("me/player/seek", null, { params: { position_ms } });
  }

  async setVolume(volume_percent) {
    return this.put("me/player/volume", null, { params: { volume_percent } });
  }
  async getTrack(track_id) {
    return this.get(`tracks/${track_id}`);
  }
  async addQueue(track_id) {
    return this.post(`me/player/queue`, null, {
      params: {
        uri: `spotify:track:${track_id}`,
      },
    });
  }
}
const spotify = new spotifyWebAPI();

window.$spotify = spotify;
export default spotify;
