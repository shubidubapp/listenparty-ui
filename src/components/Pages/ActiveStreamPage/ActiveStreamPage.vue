<template>
  <div class="row">
    <div class="col-12 col-lg-8 gx-2 g-lg-4 mb-4">
      <div class="card">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <div
            :class="[
              'user-select-none',
              'fw-bold',
              isStreamer ? 'text-danger' : 'text-success',
              'd-flex',
              'align-items-center',
            ]"
          >
            <fai v-if="isStreamer" :icon="['fas', 'microphone-alt']" />
            <fai v-else :icon="['fas', 'headphones-alt']" />
            <div class="ms-1">{{ status.stream }}</div>
          </div>
          <a
            class="btn btn-success d-flex"
            :href="`?l=${status.stream}`"
            @click.prevent="copyShareURL"
          >
            Copy URL
          </a>
          <button class="btn btn-danger d-flex" @click.prevent="stop">
            Stop!
          </button>
        </div>
        <div class="card-body"><Player /></div>
      </div>
    </div>
    <div class="col-12 col-lg-4 gx-2 g-lg-4">
      <ListenerList :isStreamer="isStreamer" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ListenerList from "./components/ListenerList";
import Player from "./components/Player";
import { copyToClipboard } from "../../../utils";

export default {
  data: () => {
    return {
      logoutHover: false,
    };
  },
  components: { ListenerList, Player },
  methods: {
    ...mapActions(["stop"]),
    ...mapMutations(["addAlert"]),
    copyShareURL(event) {
      let result = copyToClipboard({ textContent: event.target.href });
      if (result) {
        this.addAlert({
          text: "Sharing url is copied to clipboard!",
          status: "OK",
          time: Math.floor(new Date().getTime() / 1000),
        });
      } else {
        this.addAlert({
          text: "Can not copy to clipboard, please right click and copy url.",
          status: "ERROR",
          time: Math.floor(new Date().getTime() / 1000),
        });
      }
    },
  },
  computed: {
    ...mapGetters(["status"]),
    isStreamer() {
      return this.status.activity == "STREAM";
    },
  },
  created() {
    window.history.pushState(
      {},
      document.title,
      `?${this.status.activity.toLowerCase()}=${this.status.stream}`
    );
  },
};
</script>
