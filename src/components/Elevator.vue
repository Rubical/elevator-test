<script>
import { store } from "@/store/store";

export default {
  props: {
    elevator: {},
  },
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
    <div
      class="elevator"
      :style="{
        width: '100px',
        height: floorHeight + 'px',
        transition: `transform ${Math.abs(
          elevator.floor - elevator.prevFloor
        )}s ease-in`,
        transform: `translateY( ${-floorHeight * (elevator.floor - 1)}px)`,
      }"
    ></div>
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
  background: aqua;
  position: absolute;
  bottom: 0;
}
</style>
