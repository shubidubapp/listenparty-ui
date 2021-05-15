<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <div class="user-select-none">Listeners({{ listenerCount }})</div>
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
          {{ firstDBIndex }} - {{ firstDBIndex + listenerList.length }}
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
          @change="firstDBIndex = 0"
          placeholder="Filter Listeners"
        />
      </form>
    </div>
    <div class="card-body">
      <ul
        class="list-group list-group-flush overflow-auto"
        style="max-height: 400px"
        @scroll.passive="scrollUpdate"
        v-if="listenerList.length > 0"
      >
        <a
          class="list-group-item list-group-item-action"
          v-for="l in listenerList"
          :key="l.pk"
          :name="l.name"
        >
          <UserInfo :listener="l" />
        </a>
      </ul>
      <div v-else class="card-text fw-bold">
        <p class="fw-normal" v-if="searchText.length > 0">¯\_(ツ)_/¯</p>
        <p v-else>This is a lonely party.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { constants, APIUrlGen as _ } from "../../../../utils";
import axios from "axios";
import UserInfo from "../../../commons/UserInfo";

const windowSize = constants.listenerListWindowSize;

export default {
  components: { UserInfo },
  data: () => {
    return {
      listenerList_: [],
      searchText: "",
      firstDBIndex: 0,
      windowSize: windowSize,
      updateInterval: null,
      hasNext: false,
      hasPrev: false,
      loading: false,
      listenerCount: 0,
    };
  },
  methods: {
    async updateListenerList() {
      const params = {
        from: this.firstDBIndex,
        amount: windowSize,
        filter: this.searchText,
      };
      const { data } = await axios.get(_("api/listener-list"), {
        params: params,
      });
      this.listenerList_ = data.listeners;
      this.listenerCount = data.listener_count;
      this.hasPrev = this.firstDBIndex > 0;
      this.hasNext = this.firstDBIndex + windowSize < this.listenerCount;
      this.loading = false;
    },
    nextPage() {
      if (this.listenerList_.length < windowSize) return; // reached the end of pages

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
      this.updateListenerList();
    },
  },
  computed: {
    listenerList() {
      return this.listenerList_;
    },
    isLoading() {
      return this.loading;
    },
  },
  created() {
    this.updateInterval = setInterval(
      this.updateListenerList,
      constants.listenerListUpdateInterval
    );
    this.updateListenerList();
  },
  beforeUnmount() {
    clearInterval(this.updateInterval);
  },
};
</script>
