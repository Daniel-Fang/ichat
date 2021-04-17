<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar v-model="active" fixed route safe-area-inset-bottom placeholder>
      <van-tabbar-item icon="home-o">Chat</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'App',
  data () {
    return {
      active: 0
    }
  }
});
</script>