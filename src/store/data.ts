import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client, PurchaseDetails, State, Store } from "../types";

// Initial state
const initialState: State = {
  activeStep: 2,
  steps: [],
  purchaseDetails: {},
  clients: []
};

// Slice
const dataSlice = createSlice({
  name: "data-slice",
  initialState,
  reducers: {
    // Stepper controls
    updateActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    updateSteps: (state, action: PayloadAction<string[]>) => {
      state.steps = action.payload;
    },

    // Purchase details
    setPurchaseDetails: (state, action: PayloadAction<PurchaseDetails | {}>) => {
      state.purchaseDetails = action.payload;
    },

    // About you
    updateClients: (state, action: PayloadAction<Client[]>) => {
      state.clients = action.payload;
    }
  }
});

// Selectors
export const getActiveStep = (store: Store) => store?.data?.activeStep;
export const getSteps = (store: Store) => store?.data?.steps;
export const getPurchaseDetails = (store: Store): PurchaseDetails | {} => store?.data?.purchaseDetails ? store.data.purchaseDetails : {};
export const getClients = (store: Store): Client[] | [] => store?.data?.clients ? store.data.clients : [];

// Reducers and actions
export const { updateActiveStep, updateSteps, setPurchaseDetails, updateClients } = dataSlice.actions;
export default dataSlice.reducer;
