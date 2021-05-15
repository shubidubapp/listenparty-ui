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
            ]"
          >
            <fai v-if="isStreamer" :icon="['fas', 'microphone-alt']" />
            <fai v-else :icon="['fas', 'headphones-alt']" />
            {{ status.stream }}
          </div>
          <button class="btn btn-danger" @click.prevent="stop">Stop!</button>
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
import { mapActions, mapGetters } from "vuex";
import ListenerList from "./components/ListenerList";
import Player from "./components/Player";

export default {
  data: () => {
    return {
      logoutHover: false,
    };
  },
  components: { ListenerList, Player },
  methods: {
    ...mapActions(["stop"]),
  },
  computed: {
    ...mapGetters(["status"]),
    isStreamer() {
      return this.status.activity == "STREAM";
    },
  },
};
</script>
