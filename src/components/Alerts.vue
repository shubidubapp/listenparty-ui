<template>
  <transition-group name="messages">
    <div
      class="my-2 messages-item"
      v-for="(message, index) in getMessages"
      :key="message.time"
      @load="load"
    >
      <div
        :class="[
          message.status == 'OK' ? 'alert-success' : 'alert-danger',
          'alert',
          'alert-dismissible',
          'show',
        ]"
        role="alert"
      >
        {{ message.text }}
        <span
          class="btn btn-close"
          aria-label="Close"
          :value="index"
          @click.prevent="dismissMessage"
        ></span>
      </div>
    </div>
  </transition-group>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["removeMessage"]),
    dismissMessage(event) {
      this.removeMessage(event.target.value);
    },
    load(event) {
      console.log(event);
    },
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
