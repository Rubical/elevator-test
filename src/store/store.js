import { createStore } from "vuex";
import { floorsCount } from "@/configuration/config";
import { elevatorCount } from "@/configuration/config";

export const store = createStore({
  state() {
    return {
      floorCount: floorsCount,
      floorHeight: Math.max(
        ((document.documentElement.clientHeight, window.innerHeight || 0) -
          20) /
          floorsCount
      ),
      elevatorFloors: new Array(elevatorCount)
        .fill(1)
        .map((elevator, index) => {
          return { id: index + 1, floor: 1, prevFloor: 0, isMoving: false };
        }),
    };
  },
  mutations: {
    moveElevator(state, payload) {
      state.elevatorFloors[payload.index].isMoving = true;
      state.elevatorFloors[payload.index].prevFloor =
        state.elevatorFloors[payload.index].floor;
      state.elevatorFloors[payload.index].floor = payload.value;
    },
  },
});
