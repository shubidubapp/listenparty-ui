<template>
  <div
    :class="[statusClass, 'alert', 'alert-dismissible', 'show']"
    role="alert"
  >
    {{ message.text }}
    <span
      class="btn btn-close"
      aria-label="Close"
      :value="index"
      @click.prevent="dismissMessage(index)"
    ></span>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: () => {
    return {
      statusClass: null,
    };
  },
  methods: {
    ...mapMutations(["removeMessage"]),
    dismissMessage(index) {
      this.removeMessage(index);
    },
  },
  props: ["message", "index"],
  created() {
    this.statusClass =
      this.message.status == "OK" ? "alert-success" : "alert-danger";
  },
};
</script>
