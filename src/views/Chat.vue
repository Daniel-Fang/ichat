<template>
  <div class="chat"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Chat from '@/interface/Chat';

export default Vue.extend({
  name: 'Chat',
  data () {
    let chat: Chat | null = null;
    return {
      chat: chat
    }
  },
  created () {
    this.$store.dispatch({
      type: 'initWebsocket'
    }).then(res => {
      // console.log(res);
    })
  }
});
</script>
