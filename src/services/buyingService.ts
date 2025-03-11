import { BooleanQuestion } from "../types";

export const formatCurrency = (val: unknown) => {
  if (!val) return ""; // If empty, return empty string
  return new Intl.NumberFormat("en-US").format(Number(val));
};



export const updateQuestions = (questions: BooleanQuestion[], setQuestions: (questions: BooleanQuestion[]) => void) => {

  const Question1 = questions.find(question => question.id == 1)
  const Question4 = questions.find(question => question.id == 4)

  //  if question 1 is checked & all others are at default 
  // hide questions 3, 5 and 6
  if (Question1?.checked) {
    setQuestions(questions.map(question => (question?.id == 3 || question?.id == 5 || question?.id == 6) ? ({ ...question, hidden: true }) : question))
  }else{
    setQuestions(questions.map(question => (question?.id == 3 || question?.id == 5 || question?.id == 6) ? ({ ...question, hidden: false }) : question))

  }

  // if question 1 is not checked and question 4 is checked
  // question 5 is hide  
  // change question 6 content 
  // rest go back to the default 
  if (!Question1?.checked && Question4?.checked) {
    const newQuestion6: BooleanQuestion = {
      id: 6,
      amount: 10,
      checked: false,
      label: "Will this property replace your main residence",
      hidden: false
    }
    const newQuestions = questions?.map(question => question?.id == 5 ? ({ ...question, hidden: true }) : question?.id == 6 ? newQuestion6 : question)
    setQuestions(newQuestions)
    return
  }

}



