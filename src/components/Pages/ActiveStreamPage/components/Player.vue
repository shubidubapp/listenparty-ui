<template>
  <div v-if="is_playing" class="row">
    <div class="col-auto p-0 align-content-center">
      <img
        :src="track_img"
        class="img-thumbnail img-fluid float-start"
        alt="pp"
        style="max-height: 120px"
      />
    </div>
    <div class="col align-self-end">
      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col">
              {{ now_playing }}
            </div>
          </div>
          <div class="row">
            <div class="col">
              <small class="text-muted">by {{ artists }}</small>
            </div>
          </div>
        </div>
        <div class="col-auto align-self-end">
          <div class="row">
            <div class="col-auto pe-1">
              <label for="volume-slider" class="align-text-top" @click="mute">
                <fai v-if="volume > 0" :icon="['fas', 'volume-up']" />
                <fai v-else :icon="['fas', 'volume-mute']" />
              </label>
            </div>
            <div class="col ps-1 align-items-start d-flex">
              <input
                type="range"
                class="form-range volume-slider"
                min="0"
                max="100"
                step="1"
                style="width: 100px"
                v-model="volume"
                id="volume-slider"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="progress w-100" style="height: 5px">
            <div
              :class="`progress-bar ${
                is_playing ? 'bg-success' : 'bg-warning'
              }`"
              role="progressbar"
              :style="`width: ${percentage}%`"
              :aria-valuenow="percentage"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { constants } from "../../../../utils";
import { mapGetters, mapActions } from "vuex";
import spotifyWebAPI from "../../../../spotifyWebAPI";

export default {
  data() {
    return {
      data: { timestamp: 0 },
      lastUpdate: null,
      updatePlayerInterval: null,
      volume_: { val: null, timestamp: 0 },
      volume_prev: null,
    };
  },
  methods: {
    ...mapActions(["setVolume"]),
    updatePlayer() {
      const streamData = this.streamData;
      const now = new Date().getTime();
      if (streamData == null) return;
      else if (this.data.timestamp < streamData.timestamp) {
        this.data = streamData;
        this.lastUpdate = now;
        return;
      }
      const elapsedTime = now - this.lastUpdate;
      if (this.data.is_playing) {
        this.data.progress = Math.min(
          this.data.progress + elapsedTime,
          this.data.duration
        );
      }
      if (this.volume_.timestamp < streamData.timestamp) {
        this.volume_.val = streamData.volume_percent;
      }
      this.lastUpdate = now;
    },
    mute() {
      if (this.volume_prev) {
        this.changeVolume(this.volume_prev);
      } else {
        this.changeVolume(0);
      }
    },
    async changeVolume(value) {
      const volue_prev = this.volume_.val;
      this.volume_prev = null;
      this.volume_.val = value;
      const resp = await spotifyWebAPI.setVolume(value);
      if (resp.status == 204) {
        this.volume_.timestamp = new Date().getTime();
        if (value == 0) {
          this.volume_prev = volue_prev;
        } else {
          this.volume_prev = null;
        }
      } else {
        this.volume_.val = this.volume_prev;
      }
    },
  },
  computed: {
    ...mapGetters(["streamData"]),
    percentage() {
      return (this.data.progress / this.data.duration) * 100;
    },
    is_playing() {
      return this.data.is_playing;
    },
    now_playing() {
      return this.data.track_name;
    },
    artists() {
      if (this.data.artists) return this.data.artists.join(", ");
      return null;
    },
    track_img() {
      return this.data.track_img;
    },
    volume: {
      get() {
        return this.volume_.val;
      },
      async set(value) {
        this.changeVolume(value);
      },
    },
  },
  created() {
    if (this.updatePlayerInterval == null) {
      this.updatePlayerInterval = setInterval(
        this.updatePlayer,
        constants.updatePlayerInterval
      );
    }
    this.updatePlayer();
  },
  beforeUnmount() {
    clearInterval(this.updatePlayerInterval);
    this.updatePlayerInterval = null;
  },
  props: ["isStreamer"],
};
</script>

<style>
/* EAT SHIT BOOTSTRAP RANGE INPUT. */
input.volume-slider[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
}

input.volume-slider[type="range"]::-ms-thumb {
  -webkit-appearance: none;
  background-color: darkslategray;
  width: 0.5rem;
  height: 0.5rem;
  outline: none;
  box-shadow: none;
}

input.volume-slider[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: darkslategray;
  width: 0.5rem;
  height: 0.5rem;
  outline: none;
  box-shadow: none;
}

input.volume-slider[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  background-color: darkslategray;
  width: 0.5rem;
  height: 0.5rem;
  outline: none;
  box-shadow: none;
}

input.volume-slider[type="range"]:focus {
  outline: none;
}

input.volume-slider[type="range"]::-ms-track {
  width: 100%;
  cursor: default;

  background: transparent;
  border-color: transparent;
  color: transparent;
}

input.volume-slider[type="range"]::-webkit-slider-runnable-track {
  cursor: default;
}

input.volume-slider[type="range"]::-moz-range-track {
  cursor: default;
}
</style>
