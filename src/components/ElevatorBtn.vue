<script>
import { store } from "@/store/store";

export default {
  props: {
    elevatorBtn: {},
  },
  computed: {
    elevatorSystem() {
      return store.state.elevatorSystem;
    },
    elevatorCallQueue() {
      return store.state.elevatorCallQueue;
    },
  },
  methods: {
    elevatorMoveOnClick() {
      if (
        this.elevatorSystem.find(
          (elevator) =>
            this.elevatorBtn.id === elevator.targetFloor ||
            this.elevatorCallQueue.includes(this.elevatorBtn.id)
        )
      ) {
        return;
      }

      this.$store.dispatch("addElevToQueue", {
        btnFloorNumber: this.elevatorBtn.id,
      });

      let interval;

      if (this.elevatorSystem.find((elevator) => elevator.isMoving === false)) {
        this.elevatorMove();
      } else
        interval = setInterval(() => {
          if (
            this.elevatorSystem.find((elevator) => elevator.isMoving === false)
          ) {
            this.elevatorMove();

            clearInterval(interval);
          }
        }, 500);
    },

    elevatorMove() {
      const nextFloor = this.elevatorCallQueue[0];
      let closestElIndex;
      let smallestGap = 0;

      this.elevatorSystem.forEach((elevator, index) => {
        if (elevator.isMoving !== true && closestElIndex === undefined) {
          (closestElIndex = index),
            (smallestGap = Math.abs(elevator.targetFloor - nextFloor));
        }
        if (
          elevator.isMoving !== true &&
          Math.abs(elevator.targetFloor - nextFloor) < smallestGap
        ) {
          closestElIndex = index;
          smallestGap = Math.abs(elevator.targetFloor - nextFloor);
        }
      });

      this.$store.dispatch("moveElevator", {
        closestElevatorNumber: closestElIndex + 1,
        btnFloorNumber: nextFloor,
      });
    },
  },
};
</script>
<template>
  <div @click="elevatorMoveOnClick()" class="elevator-btn">
    <button
      :style="{
        border: elevatorBtn.isBtnPressed
          ? '2px solid orange'
          : '2px solid #2aa8a8',
      }"
    >
      <svg
        :style="{
          fill: elevatorBtn.isBtnPressed ? 'orange' : '#2aa8a8',
        }"
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
    <p>{{ elevatorBtn.id }}</p>
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
  background-color: white;
}

svg {
  width: 20px;
  height: 20px;
}

p {
  margin: 0;
  padding-top: 3px;
}
</style>
