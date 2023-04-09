<script>
import { store } from "@/store/store";

export default {
  computed: {
    floorHeight() {
      return store.state.floorHeight;
    },
    floorCount() {
      return store.state.floorCount;
    },
  },
};
</script>

<template>
  <div class="elevator-row">
    <div class="elevator"></div>
  </div>
</template>

<style scoped>
.elevator-row {
  width: 100px;
  height: 100%;
  border-left: 4px solid lightgray;
  border-right: 4px solid lightgray;
}

.elevator {
  width: 100px;
  height: 100px;
  background: aqua;
  position: absolute;
  bottom: 0;
}
</style>
