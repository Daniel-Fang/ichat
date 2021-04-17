<template>
  <div class="home">
    <van-list>
      <van-cell v-for="item in list" :key="item.id" :border="false">
        <chat-item :chat="item" @click.native="handleToChat"></chat-item>
      </van-cell>
    </van-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IChat from '@/interface/Chat';
import chatItem from '@/components/chatItem/index.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    chatItem
  },
  data () {
    const list: IChat[] = [];
    return {
      list: list
    }
  },
  methods: {
    handleToChat () {
      this.$router.push({ name: 'chat' });
    }
  },
  created () {
    const list: IChat[] = [];
    for (let i = 0; i < 100; i++) {
      list[i] = {
        id: i + 1,
        icon: '',
        messageList: [],
        creator: 'Alex',
        to: [],
        createTime: '2020-10-12',
        top: false
      }
    }
    this.list = list;
  }
});
</script>
