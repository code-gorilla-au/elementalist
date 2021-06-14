<template>
  <h1>Elementalist</h1>
  <Game />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Game from '@/components/Game.vue';

export default defineComponent({
  name: 'App',
  components: {
    Game,
  },
});
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
