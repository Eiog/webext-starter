<script lang="ts" setup>
import Message from './Message.vue'
</script>

<template>
  <div class="overlay">
    <Message />
  </div>
</template>

<style>
.overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
