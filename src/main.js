import { createApp } from "vue";
import VueSocketIOExt from "vue-socket.io-extended";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";

import App from "./App.vue";
import socket from "./socket-client";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMicrophoneAlt,
  faHeadphonesAlt,
  faTimesCircle,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faMicrophoneAlt,
  faHeadphonesAlt,
  faTimesCircle,
  faVolumeUp,
  faVolumeMute
);

axios.defaults.withCredentials = true; // makes axios send and receive cookies

const app = createApp(App);
app.use(store);
app.use(VueSocketIOExt, socket, { store });
app.component("fai", FontAwesomeIcon);
app.mount("#app");
