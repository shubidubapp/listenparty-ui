<template>
  <div class="row">
    <div class="col-12 col-lg-8 gx-2 g-lg-4 mb-4">
      <div class="card">
        <div class="card-header">.</div>
        <div class="card-body">
          <LForm v-model:stream-name_="seletectedStream" />
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-4 gx-2 g-lg-4">
      <StreamList v-model:selected="seletectedStream" />
    </div>
  </div>
</template>

<script>
import LForm from "./components/Form";
import StreamList from "./components/StreamList";

export default {
  data: () => {
    return {
      logoutHover: false,
      seletectedStream: "",
    };
  },
  components: { LForm, StreamList },
  methods: {},
  computed: {},
};
</script>
