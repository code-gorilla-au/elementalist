<template>
  <div :id="containerId" />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import Game from '@/game/game';

export default defineComponent({
  name: 'Game',
  setup() {
    const containerId = 'Game';
    let game: Game;
    onMounted(() => {
      game = new Game(containerId);
    });
    onUnmounted(() => {
      game.destroy(true);
    });
    return {
      containerId,
    };
  },
});
</script>

<style></style>
