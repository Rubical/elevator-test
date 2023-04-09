<script>
import { store } from "@/store/store";
export default {
  computed: {
    floorHeight() {
      return store.state.floorHeight;
    },
  },
};
</script>

<template>
  <div :style="{ height: floorHeight + 'px' }">
    <hr :style="{ margin: 0, backgroundColor: 'lightgray' }" />
  </div>
</template>
<style scoped></style>
