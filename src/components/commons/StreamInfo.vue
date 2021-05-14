<template>
  <div class="user-select-none">
    <div class="d-flex w-100 justify-content-between align-items-center">
      <div><fai :icon="['fas', 'microphone-alt']" /> {{ stream.name }}</div>
      <span class="badge rounded-pill bg-primary">
        {{ stream.listeners_length }}
      </span>
    </div>
    <small class="text-muted">
      <img
        :src="stream.streamer.img"
        class="img-thumbnail img-fluid"
        alt="pp"
        style="height: 30px"
      />
      {{ stream.streamer.name }}
    </small>
  </div>
</template>

<script>
export default {
  props: ["stream"],
};
</script>
