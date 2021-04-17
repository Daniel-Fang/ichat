<template>
  <div class="chat-item">
    {{ chat.task }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  props: {
    chat: {
      type: Object,
      default () {
        return {};
      }
    }
  }
});
</script>

<style lang="sass" scoped>
@import './index.scss';
</style>