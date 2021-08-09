<template>
  <div class="px-2 navbar navbar-light bg-light mb-4">
    <Header />
  </div>
  <div class="container">
    <div class="row">
      <transition name="content-card" mode="out-in">
        <div class="card" v-if="status.username && status.activity == 'NONE'">
          <div class="card-body">
            <StreamBrowserPage />
          </div>
        </div>
        <div
          class="card"
          v-else-if="status.username && status.activity != 'NONE'"
        >
          <div class="card-body">
            <ActiveStreamPage />
          </div>
        </div>
        <div class="card" v-else>
          <div class="card-body">
            <IndexPage />
          </div>
        </div>
      </transition>
    </div>
    <div class="row fixed-bottom">
      <div class="col-12 col-lg-4 offset-lg-4">
        <AlertTicker />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StreamBrowserPage from "./components/Pages/StreamBrowserPage/StreamBrowserPage";
import ActiveStreamPage from "./components/Pages/ActiveStreamPage/ActiveStreamPage";
import IndexPage from "./components/Pages/IndexPage/IndexPage";
import AlertTicker from "./components/Alerts/AlertTicker";

export default {
  name: "App",
  components: {
    Header,
    StreamBrowserPage,
    ActiveStreamPage,
    IndexPage,
    AlertTicker,
    Footer,
  },
  methods: {
    ...mapMutations(["setwebPlayerUsable", "destroyWebPlayer"]),
  },
  computed: {
    ...mapGetters(["status", "getMessages"]),
  },
  created() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.setwebPlayerUsable(true);
    };
  },
  beforeUnmount() {
    this.destroyWebPlayer();
  },
};
</script>

<style>
html,
body {
  background-color: darkslategray;
  min-height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.content-card-enter-active,
.content-card-leave-active {
  transition: all 1s ease;
}
.content-card-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.content-card-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.btn:focus {
  outline: none;
  box-shadow: none;
}

.badge {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}

/* SCROLLBAR STYLES */
/* Works on Firefox */
* {
  scrollbar-width: thin;
  /* scrollbar-color: darkslategray unset; */
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

/* *::-webkit-scrollbar-track {
  background: orange;
} */

*::-webkit-scrollbar-thumb {
  /* background-color: blue; */
  border-radius: 20px;
  border: 3px solid;
}
</style>
