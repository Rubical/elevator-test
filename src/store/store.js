import { createStore } from "vuex";
import { floorsCount } from "@/configuration/config";

export const store = createStore({
  state() {
    return {
      floorCount: floorsCount,
      floorHeight: Math.max(
        ((document.documentElement.clientHeight, window.innerHeight || 0) -
          20) /
          floorsCount
      ),
    };
  },
  mutations: {
    setFloorCount(state, action) {
      return action.payload;
    },
  },
});
