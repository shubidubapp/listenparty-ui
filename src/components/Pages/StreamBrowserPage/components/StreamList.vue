<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <div class="user-select-none">Active Streams({{ streamCount }})</div>
      <div
        class="spinner-border text-secondary"
        v-show="isLoading"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="text-muted user-select-none">
        <button
          :class="[
            'btn',
            hasPrev ? 'btn-outline-primary' : 'btn-outline-secondary',
            'btn-sm',
            'mx-2',
          ]"
          :disabled="!hasPrev"
          @click.prevent="prevPage"
        >
          &lt;
        </button>
        <span>
          {{ firstDBIndex }} - {{ firstDBIndex + streamList_.length }}
        </span>
        <button
          :class="[
            'btn',
            hasNext ? 'btn-outline-primary' : 'btn-outline-secondary',
            'btn-sm',
            'mx-2',
          ]"
          :disabled="!hasNext"
          @click.prevent="nextPage"
        >
          &gt;
        </button>
      </div>
    </div>
    <div class="card-header">
      <form @submit.prevent="forceUpdate">
        <input
          class="mx-0 w-100"
          type="text"
          id="filter"
          v-model="searchText"
          placeholder="Filter Streams"
        />
      </form>
    </div>
    <div class="card-body">
      <ul
        class="list-group list-group-flush overflow-auto"
        style="max-height: 400px"
        @scroll.passive="scrollUpdate"
        @click.capture.prevent="clickCapture"
      >
        <a
          class="list-group-item list-group-item-action"
          v-for="s in streamList"
          :key="s.name"
          :name="s.name"
        >
          <StreamInfo :stream="s" />
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
import { constants, APIUrlGen as _ } from "../../../../utils";
import axios from "axios";
import StreamInfo from "../../../commons/StreamInfo";

const windowSize = constants.streamListWindowSize;

export default {
  components: { StreamInfo },
  data: () => {
    return {
      streamList_: [],
      searchText: "",
      firstDBIndex: 0,
      windowSize: windowSize,
      updateInterval: null,
      hasNext: false,
      hasPrev: false,
      loading: false,
      streamCount: 0,
    };
  },
  methods: {
    async updateStreamList() {
      const params = {
        from: this.firstDBIndex,
        amount: windowSize,
        filter: this.searchText,
      };
      const { data } = await axios.get(_("api/stream-list"), {
        params: params,
      });
      this.streamList_ = data.streams;
      this.streamCount = data.stream_count;
      this.hasPrev = this.firstDBIndex > 0;
      this.hasNext = this.firstDBIndex + windowSize < this.streamCount;
      this.loading = false;
    },
    clickCapture(event) {
      const list_item = event.target.closest("a.list-group-item");
      this.$emit("update:selected", list_item.getAttribute("name"));
    },
    nextPage() {
      if (this.streamList_.length < windowSize) return; // reached the end of pages

      this.firstDBIndex += this.windowSize;
      this.forceUpdate();
    },
    prevPage() {
      const newIndex = this.firstDBIndex - this.windowSize;
      this.firstDBIndex = Math.max(newIndex, 0);
      this.forceUpdate();
    },
    forceUpdate() {
      this.loading = true;
      this.updateStreamList();
    },
  },
  computed: {
    streamList() {
      return this.streamList_;
    },
    isLoading() {
      return this.loading;
    },
  },
  created() {
    this.updateInterval = setInterval(
      this.updateStreamList,
      constants.streamListUpdateInterval
    );
    this.updateStreamList();
  },
  beforeUnmount() {
    clearInterval(this.updateInterval);
  },
  props: ["selected"],
  emits: ["update:selected"],
};
</script>
