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
    elevatorSystem() {
      return store.state.elevatorSystem;
    },
    elevatorCallQueue() {
      return store.state.elevatorCallQueue;
    },
  },

  beforeMount() {
    if (
      this.elevatorSystem[this.elevator.id - 1].targetFloor !==
      this.elevatorSystem[this.elevator.id - 1].currentFloor
    ) {
      this.$store.dispatch("keepMoving", {
        closestElevatorNumber: this.elevator.id,
        btnFloorNumber: this.elevator.targetFloor,
      });
    }

    if (this.elevatorCallQueue.length > this.elevatorSystem.length) {
      let interval = setInterval(() => {
        if (
          this.elevator.isMoving === false &&
          this.elevatorCallQueue.length > 0
        ) {
          this.$store.dispatch("moveElevator", {
            closestElevatorNumber: this.elevator.id,
            btnFloorNumber: this.elevatorCallQueue[0],
          });

          if (this.elevatorCallQueue.length === 0) {
            clearInterval(interval);
          }
        }
      }, 500);
    }
    if (this.elevatorCallQueue.length > 0 && this.elevator.isMoving === false) {
      this.$store.dispatch("moveElevator", {
        closestElevatorNumber: this.elevator.id,
        btnFloorNumber: this.elevatorCallQueue[0],
      });
    }
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
        transition: `transform 1s linear`,
        transform: `translateY( ${
          -floorHeight * (elevator.currentFloor - 1)
        }px)`,
      }"
    >
      <div v-if="elevator.isMoving" class="elevator-direction-wrapper">
        <span
          v-if="elevator.prevFloor > elevator.targetFloor"
          class="elevator-direction"
          >ᐁ</span
        >
        <span
          v-if="elevator.prevFloor < elevator.targetFloor"
          class="elevator-direction"
          >ᐃ</span
        >
        <span class="elevator-floor">{{ elevator.targetFloor }}</span>
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

.elevator-floor {
  padding-top: 3px;
  color: white;
  font-weight: 500;
}

.elevator-direction-wrapper {
  width: 40px;
  height: 25px;
  background-color: rgba(54, 53, 53, 0.49);
  margin-top: 5px;
  border-radius: 2px;
  padding: 2px 3px;
  display: flex;
  justify-content: center;
  column-gap: 3px;
}

.elevator-direction {
  color: white;
}
</style>
