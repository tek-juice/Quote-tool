import { createSlice } from "@reduxjs/toolkit";
import { State, Store } from "../types";

const initialState: State = {
  // stepper  data
  activeStep: -2,
  steps: [],
};

export const dataSlice = createSlice({
  initialState,
  name: "data-slice",
  reducers: {
    updateActiveStep: (state, action: { payload: number }) => {
      state.activeStep = action.payload;
    },
    updateSteps: (state, action: { payload: string[] }) => {
      state.steps = action.payload;
    },
  },
});

// stepper logic
export const getActiveStep = (store: Store) => store?.data?.activeStep;
export const getSteps = (store: Store) => store?.data?.steps;
export const { updateActiveStep, updateSteps } = dataSlice.actions;

export default dataSlice.reducer;
