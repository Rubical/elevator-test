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
      :class="[elevator.isResting ? 'elevator move' : 'elevator']"
      :style="{
        width: '100px',
        height: floorHeight + 'px',
        transition: `transform ${elevator.movingTime}s linear`,
        transform: `translateY( ${-floorHeight * (elevator.floor - 1)}px)`,
      }"
    >
      <div v-if="elevator.isMoving" class="elevator-direction">
        <span v-if="elevator.prevFloor > elevator.floor">вниз</span>
        <span v-if="elevator.prevFloor < elevator.floor">вверх</span>
        <span>{{ elevator.floor }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.move {
  animation: blink 0.8s infinite;
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
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
  display: flex;
  justify-content: center;
}

.elevator-direction {
  width: 40px;
  height: 25px;
  background-color: rgba(54, 53, 53, 0.49);
  margin-top: 5px;
  border-radius: 2px;
}
</style>
