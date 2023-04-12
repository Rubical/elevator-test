<script>
import { defineComponent } from "vue";
import { store } from "@/store/store";
import Elevator from "@/components/Elevator.vue";
import { floorsCount } from "@/configuration/config";
import ElevatorBtn from "@/components/ElevatorBtn.vue";

export default defineComponent({
  components: { ElevatorBtn, Elevator },

  computed: {
    floorHeight() {
      return store.state.floorHeight;
    },
    elevatorSystem() {
      return store.state.elevatorSystem;
    },
    elevatorBtns() {
      return store.state.elevatorBtns;
    },
  },
});
</script>
<template>
  <div class="elevator-system">
    <div class="elevators">
      <Elevator v-for="elevator in elevatorSystem" :elevator="elevator" />
    </div>
    <div
      class="elevator-btns"
      :style="{
        marginBottom: floorHeight / 2 - 15 + 'px',
        rowGap: floorHeight - 30 + 'px',
      }"
    >
      <ElevatorBtn
        v-for="elevatorBtn in elevatorBtns"
        :elevatorBtn="elevatorBtn"
      />
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
