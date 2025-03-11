import { BooleanQuestion } from "../types";
import { updateQuestions } from "./buyingService";

export const updateBooleanQuestion = (booleanQuestions: BooleanQuestion[], setBooleanQuestions: (data: BooleanQuestion[]) => void, questionIndex: number): void => {
    const updatedQuestions = booleanQuestions?.map((question, index) => index === questionIndex ? ({ ...question, checked: !question?.checked }) : question)
    updateQuestions(updatedQuestions, setBooleanQuestions)
    // setBooleanQuestions(updatedQuestions)
}