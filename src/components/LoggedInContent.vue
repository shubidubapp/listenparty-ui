<template>
  <div class="row">
    <div class="col-12 col-lg-8 gx-2 g-lg-4 mb-4">
      <div class="card">
        <div class="card-body">
          <LForm />
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-4 gx-2 g-lg-4">
      <div class="card">
        <div class="card-header">Active Streams</div>
        <div class="card-body">...</div>
      </div>
    </div>
  </div>
</template>

<script>
import LForm from "./LForm";

export default {
  data: () => {
    return {
      logoutHover: false,
    };
  },
  components: { LForm },
  methods: {},
  computed: {},
};
</script>
