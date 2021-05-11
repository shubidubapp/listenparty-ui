import io from "socket.io-client";

const options = {
  cors: {
    credentials: true,
  },
  autoConnect: false,
  withCredentials: true,
};
const socket = io(process.env.VUE_APP_BASEURL, options);

export default socket;
