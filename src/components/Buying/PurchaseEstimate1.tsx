import { Autocomplete, Box, Button, colors, DialogActions, InputAdornment, TextField, Typography } from "@mui/material"
import BooleanQuestionComponent from "../common/BooleanQuestion"
import { useEffect, useState } from "react"
import { BooleanQuestion } from "../../types"
import { booleanQuestions } from "../../data"
import {CurrencyPound} from "@mui/icons-material"
import { useNavigate } from "react-router"
import { formatCurrency } from "../../services/buyingService"

const PurchaseEstimate1 = () => {

  const [questions, setQuestions] = useState<BooleanQuestion[]>()

  // purchase price data 
  const [numberValue, setNumberValue] = useState(""); // Store raw number
  const [displayValue, setDisplayValue] = useState(""); // Store formatted display value

  const tenureOptions = ["Freehold", "Leasehold"]

  // Handle user input
  const handlePurchasePriceChange = (event: {target: {value: string}}) => {
    const rawValue = event && event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setNumberValue(rawValue); // Store raw numeric value
    setDisplayValue(formatCurrency(rawValue)); // Format for display
  };

  useEffect(() => {
    setQuestions(booleanQuestions)
    console.log(numberValue)
  }, [])

  const navigate = useNavigate()

  return (
    <Box>
      <Typography>Please complete the following information to obtain your instant estimate</Typography>

      {/* form  */}
      <form action="">

        <Box display={"flex"} width={"100%"} sx={{ my: 3 }} justifyContent={"stretch"} alignItems={"center"}>
          {/* purchase price  */}
          <TextField
          className="input" 
          value={displayValue}
          onChange={handlePurchasePriceChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <span><CurrencyPound/></span> {/* Wrap in a span to avoid issues */}
                </InputAdornment>
              ),
            },
          }}
          fullWidth label="Purchase price" required sx={{ mr: 2 }} />
          {/* No. of buyers  */}
          <TextField type="number" fullWidth label="Number of buyers" required />
        </Box>

        <Box display={"flex"} width={"100%"} sx={{ my: 3 }} justifyContent={"stretch"} alignItems={"center"}>
          {/* Tenure  */}
          <Autocomplete
            sx={{ mr: 2 }}
            fullWidth
            disablePortal
            options={tenureOptions}
            renderInput={(params) => <TextField {...params} label="Tenure" />}
          />
          {/* purchase address  */}
          <TextField fullWidth label="Purchase address" required />
        </Box>

        <hr style={{marginBottom: 20, opacity: .3}}/>
        {/* boolean questions  */}
        {
          questions?.map((question, index) => (
            <BooleanQuestionComponent  key={index} question={question} questions={questions} setQuestions={setQuestions} />
          ))
        }
        <hr style={{margin: "20px 0px", opacity: .3}}/>

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