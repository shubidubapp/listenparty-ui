<template>
  <div class="user-select-none">
    <div class="row">
      <div class="col-auto p-0 align-content-center">
        <img
          :src="stream.streamer.img"
          class="img-thumbnail img-fluid float-start"
          alt="pp"
          style="max-height: 50px"
        />
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <fai :icon="['fas', 'microphone-alt']" /> {{ stream.name }}
          </div>
          <div class="col-auto">
            <span class="badge rounded-pill bg-primary align-center">
              {{ stream.listeners_length }}
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <small class="text-muted text-bottom align-bottom">
              {{ stream.streamer.name }}
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["stream"],
};
</script>
