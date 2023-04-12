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
      elevatorSystem: new Array(elevatorCount)
        .fill(1)
        .map((elevator, index) => {
          return {
            id: index + 1,
            currentFloor:
              Number(
                Number(localStorage.getItem("elevatorCurr" + (index + 1)))
              ) || 1,
            prevFloor: 1,
            targetFloor:
              Number(localStorage.getItem("elevatorTarget" + (index + 1))) || 1,
            isMoving: false,
            isResting: false,
            movingTime: 0,
          };
        }),
      elevatorBtns: new Array(floorsCount).fill(1).map((elevator, index) => {
        return {
          id: index + 1,
          isBtnPressed:
            localStorage
              .getItem("queue")
              ?.substring(1, localStorage.getItem("queue")?.length - 1)
              ?.split(",")
              ?.includes(String(index + 1)) || false,
        };
      }),
      elevatorCallQueue:
        localStorage.getItem("queue")?.length > 2
          ? localStorage
              .getItem("queue")
              ?.substring(1, localStorage.getItem("queue")?.length - 1)
              ?.split(",")
              ?.map((el) => {
                return Number(el);
              })
          : [],
    };
  },
  mutations: {
    elevatorStartMoving(state, payload) {
      state.elevatorSystem[payload.closestElevatorNumber - 1].isMoving = true;
    },

    elevatorStopMoving(state, payload) {
      state.elevatorSystem[payload.closestElevatorNumber - 1].isMoving = false;
    },

    setPrevFloor(state, payload) {
      state.elevatorSystem[payload.closestElevatorNumber - 1].prevFloor =
        state.elevatorSystem[payload.closestElevatorNumber - 1].currentFloor;
    },

    setElevatorTargetFloor(state, payload) {
      localStorage.setItem(
        "elevatorTarget" + payload.closestElevatorNumber,
        payload.btnFloorNumber
      );
      state.elevatorSystem[payload.closestElevatorNumber - 1].targetFloor =
        Number(
          localStorage.getItem("elevatorTarget" + payload.closestElevatorNumber)
        );
    },

    setElevatorCurrentFloor(state, payload) {
      let targetFloor =
        state.elevatorSystem[payload.closestElevatorNumber - 1].targetFloor;
      let currFloor =
        state.elevatorSystem[payload.closestElevatorNumber - 1].currentFloor;
      if (targetFloor > currFloor) {
        state.elevatorSystem[payload.closestElevatorNumber - 1].currentFloor++;
      } else if (targetFloor < currFloor) {
        state.elevatorSystem[payload.closestElevatorNumber - 1].currentFloor--;
      }
      localStorage.setItem(
        "elevatorCurr" + payload.closestElevatorNumber,
        String(
          state.elevatorSystem[payload.closestElevatorNumber - 1].currentFloor
        )
      );
    },

    setElevatorMovingTime(state, payload) {
      state.elevatorSystem[payload.closestElevatorNumber - 1].movingTime =
        Math.abs(
          state.elevatorSystem[payload.closestElevatorNumber - 1].targetFloor -
            state.elevatorSystem[payload.closestElevatorNumber - 1].currentFloor
        );
    },

    startElevatorResting(state, payload) {
      state.elevatorSystem[payload.closestElevatorNumber - 1].isResting = true;
      setTimeout(() => {
        state.elevatorSystem[
          payload.closestElevatorNumber - 1
        ].isResting = false;
      }, 3000);
    },

    pressElevatorBtn(state, payload) {
      state.elevatorBtns[payload.btnFloorNumber - 1].isBtnPressed = true;
    },

    unpressElevatorBtn(state, payload) {
      state.elevatorBtns[payload.btnFloorNumber - 1].isBtnPressed = false;
    },

    addElementToQueue(state, payload) {
      state.elevatorCallQueue.push(payload.btnFloorNumber);
      localStorage.setItem("queue", JSON.stringify(state.elevatorCallQueue));
    },

    removeElementFromQueue(state) {
      state.elevatorCallQueue.shift();
      localStorage.setItem("queue", JSON.stringify(state.elevatorCallQueue));
    },
  },
  actions: {
    addElevToQueue({ commit }, payload) {
      commit("pressElevatorBtn", payload);
      commit("addElementToQueue", payload);
    },

    moveElevator({ commit, dispatch }, payload) {
      commit("removeElementFromQueue");
      commit("elevatorStartMoving", payload);
      commit("setPrevFloor", payload);
      commit("setElevatorTargetFloor", payload);
      commit("setElevatorMovingTime", payload);
      commit("setElevatorCurrentFloor", payload);
      dispatch("getCurrentFloor", payload);

      setTimeout(() => {
        commit("unpressElevatorBtn", payload);
        commit("startElevatorResting", payload);
      }, store.state.elevatorSystem[payload.closestElevatorNumber - 1].movingTime * 1000);

      setTimeout(() => {
        commit("elevatorStopMoving", payload);
      }, store.state.elevatorSystem[payload.closestElevatorNumber - 1].movingTime * 1000 + 3000);
    },

    getCurrentFloor({ commit }, payload) {
      const getCurrFloor = setInterval(() => {
        commit("setElevatorCurrentFloor", payload);
        commit("setElevatorMovingTime", payload);
        if (
          store.state.elevatorSystem[payload.closestElevatorNumber - 1]
            .currentFloor -
            store.state.elevatorSystem[payload.closestElevatorNumber - 1]
              .targetFloor ===
          0
        ) {
          clearInterval(getCurrFloor);
        }
      }, 1000);
    },

    keepMoving({ commit, dispatch }, payload) {
      commit("elevatorStartMoving", payload);
      commit("setPrevFloor", payload);
      commit("pressElevatorBtn", payload);
      commit("setElevatorMovingTime", payload);
      dispatch("getCurrentFloor", payload);

      setTimeout(() => {
        commit("unpressElevatorBtn", payload);
        commit("startElevatorResting", payload);
      }, (store.state.elevatorSystem[payload.closestElevatorNumber - 1].movingTime + 1) * 1000);

      setTimeout(() => {
        commit("elevatorStopMoving", payload);
      }, store.state.elevatorSystem[payload.closestElevatorNumber - 1].movingTime * 1000 + 3000);
    },
  },
});
