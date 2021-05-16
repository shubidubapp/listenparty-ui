<template>
  <transition-group name="messages">
    <div
      class="mb-2 messages-item"
      v-for="(message, index) in getMessages"
      :key="message.time"
    >
      <Alert :message="message" :user-active="userActive" :index="index" />
    </div>
  </transition-group>
</template>

<script>
import { mapGetters } from "vuex";
import Alert from "./Alert";
import { constants } from "../../utils";

export default {
  data() {
    return {
      userActive: false,
      inactiveTimer: constants.inactiveTimer,
      inactiveInterval: null,
    };
  },
  components: {
    Alert,
  },
  computed: {
    ...mapGetters(["getMessages"]),
    messages() {
      return this.getMessages().slice(3);
    },
  },
  methods: {
    inactiveCounter() {
      this.inactiveTimer--;
      if (this.inactiveTimer == 0) {
        this.userActive = false;
        clearInterval(this.inactiveInterval);
        this.inactiveInterval = false;
      }
    },
    inactiveReset() {
      this.inactiveTimer = constants.inactiveTimer;
    },
  },
  created() {
    this.inactiveInterval = setInterval(this.inactiveCounter, 1000);
    document.addEventListener("mousemove", () => {
      this.userActive = true;
      this.inactiveReset();
      if (this.inactiveInterval == null) {
        this.inactiveInterval = setInterval(this.inactiveCounter, 1000);
      }
    });
  },
};
</script>

<style scoped>
.messages-enter-active,
.messages-leave-active {
  transition: all 0.5s ease;
}
.messages-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.messages-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
