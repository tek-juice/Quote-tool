import { BooleanQuestion, Estimate } from "../types";

export const booleanQuestions: BooleanQuestion[] = [
    {
        id: 1,
        amount: 10,
        checked: false,
        hidden: false,
        label: "Is the property in Wales?"
    },
    {
        id: 2,
        amount: 20,
        checked: false,
        hidden: false,
        label: "Are you buying as a company or trust?"
    },
    {
        id: 3,
        amount: 10,
        checked: false,
        hidden: false,
        label: "Do you or anyone you are purchasing with reside outside the UK?"
    },
    {
        id: 4,
        amount: 10,
        checked: false,
        hidden: false,
        label: "Will the purchase of the property result in owning two or more properties?"
    },
    {
        id: 5,
        amount: 10,
        checked: false,
        hidden: false,
        label: "Have you ever owned or part owned another property?"
    },
    {
        id: 6,
        amount: 10,
        checked: true,
        hidden: false,
        label: "Will this property be your main residence?"
    },
    {
        id: 7,
        amount: 10,
        checked: true,
        hidden: false,
        label: "Are you buying with a mortgage?"
    },
    {
        id: 8,
        amount: 10,
        checked: false,
        hidden: false,
        label: "Shared Ownership?"
    },
    {
        id: 9,
        amount: 10,
        checked: false,
        hidden: false,
        label: "Is the client using a Help to Buy ISA or LISA"
    },
    {
        id: 10,
        amount: 10,
        checked: false,
        hidden: false,
        label: "Do you have a gifted deposit?"
    },
    {
        id: 11,
        amount: 10,
        checked: false,
        hidden: true,
        label: "Is the building above 5 stories or higher than 11 meters?"
    },
    
]

export const estimatesData: Estimate[] = [
    {
        amount: 550,
        fee_type: "legal",
        label: "(Residential Transaction)s",
        total: 660,
        vat: 110
    },
    {
        amount: 550,
        fee_type: "additional",
        label: "New Build",
        total: 660,
        vat: 110
    },
    {
        amount: 550,
        fee_type: "additional",
        label: "Bank Transfer fee",
        total: 660,
        vat: 110
    },
    {
        amount: 550,
        fee_type: "additional",
        label: "Online Tracking System",
        total: 660,
        vat: 110
    },
    {
        amount: 550,
        fee_type: "additional",
        label: "Excess Disbursement",
        total: 660,
        vat: 110
    },
    {
        amount: 550,
        fee_type: "additional",
        label: "AML ID CHECK",
        total: 660,
        vat: 110
    },
    {
        amount: 550,
        fee_type: "additional",
        label: "SDLT admin Fee",
        total: 660,
        vat: 110
    },
    {
        amount: 550,
        fee_type: "disbursements",
        label: "Lawyer Checker",
        total: 660,
        vat: 110
    },
    {
        amount: 550,
        fee_type: "disbursements",
        label: "Postage Fee",
        total: 660,
        vat: 110
    },
    {
        amount: 550,
        fee_type: "disbursements",
        label: "Bankruptcy Search",
        total: 660,
        vat: 110
    },
    {
        amount: 550,
        fee_type: "disbursements",
        label: "Pre-Completion OS1 Search",
        total: 660,
        vat: 110
    },

]

export const remortgageQuestions: BooleanQuestion[] = [
    {
        id: 1,
        amount: 10,
        checked: false, 
        hidden: false,
        label: "Transfer of Equity?"
    },
    {
        id: 1,
        amount: 10,
        checked: false, 
        hidden: false,
        label: "Transfer of Equity?"
    },
    {
        id: 3,
        amount: 10,
        checked: false, 
        hidden: true,
        label: "Is the building above 5 stories or higher than 11 meters?"
    },

]