<template>
  <div class="px-2 navbar navbar-light bg-light mb-4">
    <Header />
  </div>
  <div class="container">
    <div class="row">
      <transition name="content-card" mode="out-in">
        <div class="card" v-if="status.username && status.activity == 'NONE'">
          <div class="card-body">
            <LoggedInContent />
          </div>
        </div>
        <div
          class="card"
          v-else-if="status.username && status.activity != 'NONE'"
        >
          <div class="card-body">
            <ActiveContent />
          </div>
        </div>
        <div class="card" v-else>
          <div class="card-body">
            <NotLoggedInContent />
          </div>
        </div>
      </transition>
    </div>
    <div class="row fixed-bottom">
      <div class="col-12 col-lg-4 offset-lg-4">
        <Alerts />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "./components/Header";
import LoggedInContent from "./components/LoggedInContent";
import ActiveContent from "./components/ActiveContent";
import NotLoggedInContent from "./components/NotLoggedInContent";
import Alerts from "./components/Alerts";

export default {
  name: "App",
  components: {
    Header,
    LoggedInContent,
    ActiveContent,
    NotLoggedInContent,
    Alerts,
  },
  methods: {
    ...mapActions(["checkLogin"]),
  },
  computed: {
    ...mapGetters(["status", "getMessages", "loggedIn"]),
  },
};
</script>

<style>
html,
body {
  background-color: darkslategray;
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
</style>
