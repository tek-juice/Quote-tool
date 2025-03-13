import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import React from "react"
import { BooleanQuestion } from "../../types"
import { updateBooleanQuestion } from "../../services/booleanQuestionService"
import { useLocation} from "react-router"

export interface Props {
  questions: BooleanQuestion[],
  question: BooleanQuestion,
  setQuestions: (data: BooleanQuestion[]) => void
}

const BooleanQuestionComponent: React.FC<Props> = ({ question, questions, setQuestions }) => {

  const {pathname} = useLocation()

  const handleClick=()=>{
    updateBooleanQuestion(questions, setQuestions, questions?.indexOf(question), pathname?.includes("buying") ? "buying" : "remortgage") 
  }
  
  return (
    !question?.hidden
    &&
    <Box display={"flex"} alignItems={"center"} sx={{ mb: 1 }}>

      {/* toggler  */}
      <ToggleButtonGroup
        color="primary"
        value={question?.checked ? "yes" : "no"}
        exclusive
        onChange={handleClick}
        aria-label="Platform"
      >
        <ToggleButton value="yes">Yes</ToggleButton>
        <ToggleButton value="no">No</ToggleButton>
      </ToggleButtonGroup>

      <Typography sx={{ ml: 2 }}>{question?.label}</Typography>

    </Box>
  )
}

export default BooleanQuestionComponent