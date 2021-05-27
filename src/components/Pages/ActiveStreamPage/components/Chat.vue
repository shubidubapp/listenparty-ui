<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <div class="user-select-none">Chat</div>
    </div>
    <div class="card-body">
      <ul
        class="list-group list-group-flush overflow-auto border"
        style="height: 300px"
        @scroll.passive="scrollUpdate"
        ref="chatList"
      >
        <li
          v-for="(chatAction, index) in chatActions"
          :key="chatAction.date"
          :class="[
            'list-group-item',
            chatAction.action_type == ActionType.error
              ? 'list-group-item-danger'
              : list_color(index),
            'd-flex justify-content-between align-items-center',
          ]"
          style="font-size: small"
        >
          <div>
            <div v-if="chatAction.action_type == ActionType.message">
              <a href="#">
                {{ chatAction.sender }}
              </a>
              : {{ chatAction.message }}
            </div>
            <div
              class="text-muted"
              v-else-if="chatAction.action_type == ActionType.add_queue"
            >
              <a href="#">
                {{ chatAction.sender }}
              </a>
              added "<span>{{ chatAction.track.name }}</span> -
              <span class="text-muted">
                {{ chatAction.track.artists.join(", ") }}
                [{{ chatAction.track.duration_min }}:{{
                  chatAction.track.duration_secs.toString().padStart(2, "0")
                }}]</span
              >" to queue.
            </div>
            <div
              class="text-muted"
              v-else-if="chatAction.action_type == ActionType.add_dj"
            >
              <a href="#">
                {{ chatAction.sender }}
              </a>
              promoted {{ chatAction.who }} to DJ.
            </div>
            <div v-else-if="chatAction.action_type == ActionType.error">
              <div v-if="chatAction.errors">
                <div v-for="error in chatAction.errors" :key="error.loc">
                  {{ error.loc.join(", ") }}: {{ error.msg }}
                </div>
              </div>
              <div v-else>
                {{ chatAction.message }}
              </div>
            </div>
          </div>
          <div class="text-muted" style="font-size: x-small">
            {{ chatAction.date.format("LT") }}
          </div>
        </li>
      </ul>
      <form class="mt-1" action="" @submit.prevent="messageSubmit">
        <input
          type="text"
          placeholder="Commands start with a /"
          v-model.trim="messageText"
          class="w-100"
        />
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import spotifyWebAPI from "../../../../spotifyWebAPI";
import { constants } from "../../../../utils";

const commandRegex = /^\/(\w+)\s+((?:\S+ ?)+)$/i;
const trackIdRegex = /^.+?\/track\/([a-zA-Z0-9]{22})/i;

export default {
  data: () => {
    return {
      ActionType: constants.ActionType,
      messageText: "",
      chatActions: [],
    };
  },
  methods: {
    list_color(i) {
      return i % 2 == 0 ? "list-group-item-secondary" : "";
    },
    async track_info(track_id) {
      const track_info = await spotifyWebAPI.getTrack(track_id);
      const name = track_info.name;
      const artists = track_info.artists.map((x) => {
        return x.name;
      });
      const duration_min = Math.floor(track_info.duration_ms / 1000 / 60);
      const duration_secs = Math.ceil(track_info.duration_ms / 1000) % 60;

      return { name, artists, duration_min, duration_secs };
    },
    messageSubmit() {
      this.sendChatAction(this.messageText);
      this.$nextTick(() => {
        this.messageText = "";
      });
    },
    sendChatAction(message) {
      const match = message.match(commandRegex);
      if (match) {
        if (match[1] === "dj" && match[2]) {
          this.$socket.client.emit("dj_add", {
            date: new Date().getTime() / 1000,
            who: match[2],
          });
        } else if (match[1] === "queue" && match[2]) {
          const track_id_result = match[2].match(trackIdRegex);
          if (track_id_result) {
            this.$socket.client.emit("queue_add", {
              date: new Date().getTime() / 1000,
              track: track_id_result[1],
            });
          } else {
            this.createChatError(`"${match[2]}" is not a valid URL.`);
          }
        } else {
          this.createChatError(`"${match[1]}" is not a valid command.`);
        }
      } else {
        this.$socket.client.emit("text_message", {
          date: new Date().getTime() / 1000,
          message: message,
        });
      }
    },
    async addChatAction(data) {
      const element = this.$refs.chatList;
      const scrollable = element.scrollHeight - element.clientHeight;
      const scrollRatio = 1 - (scrollable - element.scrollTop) / scrollable;
      const scrollBottom =
        scrollRatio == 1 || (scrollRatio != 0 && !scrollRatio);
      data.date = moment(data.date);
      if (data.action_type == this.ActionType.add_queue) {
        data.track = await this.track_info(data.track);
      }
      this.chatActions.push(data);
      if (scrollBottom) {
        this.$nextTick(() => {
          element.scrollTop = element.scrollHeight;
        });
      }
    },
    createChatError(message) {
      this.addChatAction({
        date: new Date(),
        message: message,
        action_type: this.ActionType.error,
      });
    },
  },
  sockets: {
    chat_action(data) {
      this.addChatAction(data);
    },
  },
};
</script>

<style scoped>
.odd {
  background-color: gray;
}
.even {
  background-color: darkgray;
}
</style>
