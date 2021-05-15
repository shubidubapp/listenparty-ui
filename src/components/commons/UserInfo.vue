<template>
  <div class="user-select-none">
    <div class="row">
      <!-- <div class="col-auto p-0 align-content-center">
        <img
          :src="listener.img"
          class="img-thumbnail img-fluid float-start"
          alt="pp"
          style="max-height: 50px"
        />
      </div> -->
      <div class="col">
        <div class="row">
          <div class="col">
            {{ listener.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["listener"],
};
</script>
