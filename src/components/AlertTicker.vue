<template>
  <transition-group name="messages">
    <div
      class="mb-2 messages-item"
      v-for="(message, index) in getMessages"
      :key="message.time"
    >
      <Alert :message="message" :index="index" />
    </div>
  </transition-group>
</template>

<script>
import { mapGetters } from "vuex";
import Alert from "./Alert";
export default {
  components: {
    Alert,
  },
  computed: {
    ...mapGetters(["getMessages"]),
  },
};
</script>

<style scoped>
.messages-enter-active,
.messages-leave-active {
  transition: all 0.2s ease;
}
.messages-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.messages-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
