<script>
import { defineComponent } from "vue";
import Elevator from "@/components/Elevator.vue";
import { elevatorCount, floorsCount } from "@/configuration/config";
import ElevatorBtn from "@/components/ElevatorBtn.vue";
import { store } from "@/store/store";

export default defineComponent({
  components: { ElevatorBtn, Elevator },

  methods: {
    floorsCount() {
      return floorsCount;
    },
  },

  computed: {
    floorHeight() {
      return store.state.floorHeight;
    },
    elevatorFloors() {
      return store.state.elevatorFloors;
    },
  },
});
</script>
<template>
  <div class="elevator-system">
    <div class="elevators">
      <Elevator v-for="elevator in elevatorFloors" :elevator="elevator" />
    </div>
    <div
      class="elevator-btns"
      :style="{
        marginBottom: floorHeight / 2 - 15 + 'px',
        rowGap: floorHeight - 30 + 'px',
      }"
    >
      <ElevatorBtn v-for="(elevator, idx) in floorsCount()" :index="idx + 1" />
    </div>
  </div>
</template>

<style scoped>
.elevator-system {
  position: absolute;
  top: 0;
  left: 20px;
  display: flex;
}

.elevators {
  display: flex;
  height: calc(100vh - 20px);
  column-gap: 20px;
}
.elevator-btns {
  display: flex;
  flex-direction: column-reverse;
  margin-left: 15px;
}
</style>
