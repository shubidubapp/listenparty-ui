<template>
  <div class="col text-start">
    <span class="nav-item navbar-brand text-success">listenParty</span>
  </div>
  <div class="nav-item col text-center">
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
  <div class="nav-item col text-end">
    <LButton @click.prevent="LClicked" :href="loginUrl" v-if="!loggedIn">
      Login using Spotify
    </LButton>
    <LButton @click.prevent="LClicked" v-else :href="logoutUrl" class="logout">
      {{ status.username ? status.username : "..." }}
    </LButton>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LButton from "./LButton";

export default {
  data: () => {
    return {
      logoutHover: false,
    };
  },
  components: {
    LButton,
  },
  methods: {
    ...mapActions(["checkLogin"]),
    LClicked(event) {
      const newWindow = window.open(event.target.href, event.target.target);
      newWindow.onunload = () => {
        this.checkLogin();
      };
    },
  },
  computed: {
    ...mapGetters(["loginUrl", "loggedIn", "logoutUrl", "status"]),
  },
  created() {
    this.checkLogin();
    this.logoutText = status.username;
  },
};
</script>
<style>
.logout:hover {
  background-color: darkred;
  border-color: darkred;
}
</style>
