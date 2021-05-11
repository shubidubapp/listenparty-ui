<template>
  <div class="row">
    <div class="col-4">
      <div class="card">
        <div class="card-body">...</div>
      </div>
    </div>
    <div class="col-8">
      <div class="card">
        <div class="card-body">
          <LForm />
        </div>
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
