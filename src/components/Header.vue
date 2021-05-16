<template>
  <div class="col-6 col-md">
    <span class="nav-item navbar-brand text-success">listenParty</span>
  </div>
  <div class="col-12 col-md nav-item text-center order-2">
    <span class="badge bg-secondary" v-if="status.activity == 'NONE'">
      <fai :icon="['fas', 'times-circle']" />
      You are inactive
    </span>
    <span class="badge bg-success" v-if="status.activity == 'LISTEN'">
      <fai :icon="['fas', 'headphones-alt']" />
      You are listening to {{ status.stream }}
    </span>
    <span class="badge bg-danger" v-if="status.activity == 'STREAM'">
      <fai :icon="['fas', 'microphone-alt']" />
      You are streaming to {{ status.stream }}
    </span>
  </div>
  <div class="col-6 col-md nav-item text-end order-md-3">
    <LButton @click.capture.prevent="login" v-if="!status.username">
      Login using Spotify
    </LButton>
    <LButton
      @click.capture.prevent="logout"
      @mouseenter="hover = !hover"
      @mouseleave="hover = !hover"
      v-else
      class="logout"
    >
      <div class="text-wrap" style="width: 120px">
        {{ hover ? "Logout" : status.username }}
      </div>
    </LButton>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LButton from "./commons/LButton";
import { APIUrlGen as _ } from "../utils";

export default {
  data: () => {
    return {
      logoutHover: false,
      loginUrl: _("api/login"),
      logoutUrl: _("api/logout"),
      hover: false,
    };
  },
  components: {
    LButton,
  },
  methods: {
    ...mapActions(["updateStatus"]),
    loginout(href) {
      const newWindow = window.open(href, "_blank");
      newWindow.addEventListener("onunload", this.updateStatus);
    },
    login() {
      this.loginout(this.loginUrl);
    },
    logout() {
      this.loginout(this.logoutUrl);
    },
  },
  computed: {
    ...mapGetters(["status"]),
  },
  created() {
    this.updateStatus();
  },
};
</script>
<style>
.logout:hover {
  background-color: darkred;
  border-color: darkred;
}
</style>
