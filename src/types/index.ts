import { ReactElement } from "react";

export interface Content {
  title?: "landing" | "new build confirmation" | "purchase estimate 1" | "purchase estimate 2" | "purchase estimate 3" ;
  body?: ReactElement;
}

export interface BooleanQuestion{
  label: string 
  checked: boolean
  collapsed?: boolean
}

export interface Store{
  data: State
}

export interface State{
  activeStep: number
  steps: string[]
}

export interface Option{
  label: string 
  title?: string 
  route: string
}

export interface Address{
  name: string 
  postalCode: string
}