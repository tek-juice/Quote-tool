import { ReactElement } from "react";

export interface Content {
  title?: "landing" | "new build confirmation" | "purchase estimate 1" | "purchase estimate 2" | "purchase estimate 3";
  body?: ReactElement;
}

export interface BooleanQuestion {
  label: string
  checked: boolean
  hidden?: boolean
  id: number 
  amount: number
}

export interface Store {
  data: State
}

export interface State {
  activeStep: number
  steps: string[]
  purchaseDetails?: PurchaseDetails | {}
  clients?: Client[] | []
}

export interface Option {
  label: string
  title?: string
  route: string
  icon?: unknown
}


export interface Address {
  plotNumber?: string
  buildingName?: string
  buildingNumber?: string
  street?: string
  district?: string
  town?: string
  county?: string
  postcode?: string
  country?: string
}

export interface Estimate{
  fee_type: "legal" | "additional" | "disbursements"
  label: string 
  amount: number 
  vat: number 
  total: number 
}

export interface PurchaseDetails {
  price: number
  people: number
  tenure: "freehold" | "leasehold"
  address: Address
  questions: BooleanQuestion[]
}



export interface Client {
  firstName: string
  lastName: string
  companyName?: string
  email: string
  phone: string
  NINO?: string
  dateOfBirth?: string
  isSpouseOrPartner?: boolean
  address?: Address
}
