<template>
  <form @submit.prevent="submit">
    <div class="row mb-3">
      <label for="streamNameInput" class="col-12 col-xxl-2 col-form-label">
        Stream Name
      </label>
      <div class="col-12 col-xxl-10">
        <input
          type="text"
          class="form-control"
          id="streamNameInput"
          aria-describedby="streamNameHelp"
          v-model.trim="streamName"
        />
        <div id="streamNameHelp" class="form-text">
          Between 5-20 characters long. Alphanumeric and dash ("-") are allowed.
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm d-flex justify-content-center mb-3">
        <button class="btn btn-primary mx-auto" value="listen" type="submit">
          Listen!
        </button>
      </div>
      <div class="col-sm d-flex justify-content-center mb-3">
        <button class="btn btn-primary mx-auto" value="stream" type="submit">
          Stream!
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => {
    return {
      streamName: "",
    };
  },
  methods: {
    ...mapActions(["start_streaming", "start_listening"]),
    async submit(event) {
      if (event.submitter.value == "listen") {
        await this.start_listening(this.streamName);
      } else if (event.submitter.value == "stream") {
        await this.start_streaming(this.streamName);
      }
    },
  },
  watch: {
    streamName_() {
      this.streamName = this.streamName_;
    },
  },
  props: ["streamName_"],
};
</script>
