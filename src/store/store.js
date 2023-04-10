import { createStore } from "vuex";
import { floorsCount } from "@/configuration/config";
import { elevatorCount } from "@/configuration/config";
import floor from "@/components/Floor.vue";

export const store = createStore({
  state() {
    return {
      floorCount: floorsCount,
      floorHeight: Math.max(
        ((document.documentElement.clientHeight, window.innerHeight || 0) -
          20) /
          floorsCount
      ),
      elevatorSystem: new Array(elevatorCount)
        .fill(1)
        .map((elevator, index) => {
          return {
            id: index + 1,
            floor: 1,
            prevFloor: 0,
            isMoving: false,
            isResting: false,
            movingTime: 0,
          };
        }),
      elevatorBtns: new Array(floorsCount).fill(1).map((elevator, index) => {
        return {
          id: index + 1,
          isBtnPressed: false,
          elevatorMovingTime: 0,
        };
      }),
    };
  },
  mutations: {
    moveElevator(state, payload) {
      state.elevatorSystem[payload.index].isMoving = true;
      state.elevatorSystem[payload.index].prevFloor =
        state.elevatorSystem[payload.index].floor;
      state.elevatorSystem[payload.index].floor = payload.value;
      state.elevatorSystem[payload.index].movingTime = Math.abs(
        state.elevatorSystem[payload.index].floor -
          state.elevatorSystem[payload.index].prevFloor
      );
      state.elevatorBtns[payload.value - 1].elevatorMovingTime =
        state.elevatorSystem[payload.index].movingTime;

      setTimeout(() => {
        state.elevatorSystem[payload.index].isResting = true;
      }, state.elevatorSystem[payload.index].movingTime * 1000);

      setTimeout(() => {
        state.elevatorSystem[payload.index].isResting = false;
        state.elevatorSystem[payload.index].isMoving = false;
      }, state.elevatorSystem[payload.index].movingTime * 1000 + 3000);
    },
    elevatorStartRest(state, payload) {},
    elevatorStopRest(state, payload) {
      state.elevatorSystem[payload].isResting = false;
    },
    elevatorBtnMove(state, payload) {
      state.elevatorBtns[payload].isBtnPressed = true;
    },
    unpressElevatorBtn(state, payload) {
      state.elevatorBtns[payload].isBtnPressed = false;
    },
  },
});
