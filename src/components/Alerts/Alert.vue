<template>
  <div
    :class="[
      statusClass,
      'alert',
      'alert-dismissible',
      'show',
      fade ? 'fade' : '',
    ]"
    role="alert"
    @mouseenter="pauseCountDown = true"
    @mouseleave="pauseCountDown = false"
    :counting="!pauseCountDown"
  >
    {{ message.text }}
    <span
      class="btn btn-close"
      aria-label="Close"
      :value="index"
      @click.prevent="dismissMessage"
    ></span>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { constants } from "../../utils";

export default {
  data: () => {
    return {
      statusClass: null,
      countDown: constants.alertFadeTimer,
      pauseCountDown: false,
      countInterval: null,
      fade: false,
    };
  },
  methods: {
    ...mapMutations(["removeMessage"]),
    dismissMessage() {
      this.removeMessage(this.index);
    },
    counter() {
      this.fade = true;
      if (!this.pauseCountDown) {
        this.countDown--;
      } else {
        this.countDown = constants.alertFadeTimer;
      }

      if (this.countDown == 0) this.dismissMessage();
    },
  },
  props: ["message", "index"],
  created() {
    this.statusClass =
      this.message.status == "OK" ? "alert-success" : "alert-danger";
  },
  mounted() {
    this.$el.style.setProperty(
      "--fade-duration",
      `${constants.alertFadeTimer}s`
    );
    this.countInterval = setInterval(this.counter, 1000);
  },
  beforeUnmount() {
    clearInterval(this.countInterval);
  },
};
</script>

<style scoped>
div.fade[counting="false"] {
  transition: opacity var(--fadeback-duration) ease;
  opacity: 1;
}
div.fade[counting="true"] {
  transition: opacity var(--fade-duration) ease;
  opacity: 0.1;
}
</style>
