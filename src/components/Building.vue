<script>
import { defineComponent } from "vue";
import { store } from "@/store/store";
import Floor from "@/components/Floor.vue";
import Elevator from "@/components/Elevator.vue";
import ElevatorSystem from "@/components/ElevatorSystem.vue";

export default defineComponent({
  computed: {
    floorCount() {
      return store.state.floorCount;
    },
  },
  components: { ElevatorSystem, Elevator, Floor },
});
</script>

<template>
  <div class="building">
    <Floor v-for="n in floorCount" /> <ElevatorSystem />
  </div>
</template>

<style scoped>
.building {
  position: relative;
}
</style>
