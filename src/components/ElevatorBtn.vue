<script>
import { store } from "@/store/store";

export default {
  props: {
    index: Number,
  },
  computed: {
    floorHeight() {
      return store.state.floorHeight;
    },
  },
};
</script>
<template>
  <div class="elevator-btn" :style="{}">
    <button>
      <svg
        fill="#000000"
        height="20px"
        width="20px"
        viewBox="0 0 248.541 248.541"
        xml:space="preserve"
      >
        <g>
          <path
            d="M63.618,108.541h121.305c5.24,0,10.042-2.926,12.443-7.584c2.402-4.656,2.002-10.266-1.036-14.535L140.946,8.6
		c-3.84-5.394-10.054-8.6-16.676-8.6s-12.836,3.205-16.676,8.6L52.211,86.422c-3.038,4.27-3.438,9.879-1.036,14.535
		C53.576,105.615,58.378,108.541,63.618,108.541z"
          />
          <path
            d="M184.923,140H63.618c-5.24,0-10.042,2.926-12.443,7.584c-2.402,4.656-2.002,10.266,1.036,14.535l55.384,77.822
		c3.84,5.395,10.054,8.6,16.676,8.6s12.836-3.205,16.676-8.6l55.384-77.822c3.038-4.27,3.438-9.879,1.036-14.535
		C194.965,142.926,190.163,140,184.923,140z"
          />
        </g>
      </svg>
    </button>
    <p>{{ index + 1 }}</p>
  </div>
</template>

<style scoped>
.elevator-btn {
  display: flex;
}

button {
  width: 30px;
  height: 30px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  border: 2px solid #2aa8a8;
  background-color: white;
}

svg {
  width: 20px;
  height: 20px;
  fill: #2aa8a8;
}

p {
  margin: 0;
  padding-top: 3px;
}
</style>
