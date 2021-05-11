<template>
  <div class="row">
    <div class="col-4">
      <div class="card">
        <div class="card-header">Listeners ({{ status.listener }})</div>
        <div class="card-body">WIP</div>
      </div>
    </div>
    <div class="col-8">
      <div class="card">
        <div class="card-body">
          <button class="btn btn-danger" @click.prevent="stop">Stop!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => {
    return {
      logoutHover: false,
    };
  },
  components: {},
  methods: {
    ...mapActions(["stop"]),
  },
  computed: {
    ...mapGetters(["status"]),
  },
};
</script>
