import { Autocomplete, Box, Button, colors, DialogActions, TextField, Typography } from "@mui/material"
import BooleanQuestionComponent from "../common/BooleanQuestion"
import { useEffect, useState } from "react"
import { BooleanQuestion } from "../../types"
import { booleanQuestions } from "../../data"
import { useNavigate } from "react-router"

const PurchaseEstimate1 = () => {

  const [questions, setQuestions] = useState<BooleanQuestion[]>()

  useEffect(() => {
    setQuestions(booleanQuestions)
  }, [])

  const navigate = useNavigate()

  return (
    <Box>
      <Typography>Please complete the following information to obtain your instant estimate</Typography>

      {/* form  */}
      <form action="">

        <Box display={"flex"} width={"100%"} sx={{ my: 3 }} justifyContent={"stretch"} alignItems={"center"}>
          {/* purchase price  */}
          <TextField fullWidth label="Purchase price" required sx={{ mr: 2 }} />
          {/* No. of buyers  */}
          <TextField type="number" fullWidth label="Number of buyers" required />
        </Box>

        <Box display={"flex"} width={"100%"} sx={{ my: 3 }} justifyContent={"stretch"} alignItems={"center"}>
          {/* Tenure  */}
          <Autocomplete
            sx={{ mr: 2 }}
            fullWidth
            disablePortal
            options={["option 1", "option 2", "option 3"]}
            renderInput={(params) => <TextField {...params} label="Tenure" />}
          />
          {/* purchase address  */}
          <TextField fullWidth label="Purchase address" required />
        </Box>

        {/* boolean questions  */}
        {
          questions?.map((question, index) => (
            <BooleanQuestionComponent  key={index} question={question} questions={questions} setQuestions={setQuestions} />
          ))
        }

        {/* actions  */}
        <DialogActions>
          <Button onClick={()=>navigate("/")} sx={{background: colors.grey[100]}} disableElevation variant="contained">
            cancel
          </Button>
          <Button disableElevation variant="contained">
            next
          </Button>
        </DialogActions>

      </form>

    </Box>
  )
}

export default PurchaseEstimate1