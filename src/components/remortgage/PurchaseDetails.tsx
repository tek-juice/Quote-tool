import { Box, Button, colors, DialogActions, InputAdornment, TextField, Typography, Grid, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import BooleanQuestionComponent from "../common/BooleanQuestion";
import { useEffect, useState } from "react";
import { Address, BooleanQuestion } from "../../types";
import { remortgageQuestions } from "../../data";
import { useNavigate } from "react-router";
import { formatCurrency } from "../../services/buyingService";
import { AddressesData } from "../../data/buying";
import { useDispatch } from "react-redux";
import { updateActiveStep } from "../../store/data";
import AddressLookup from "../common/AddressLookup";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import HomeIcon from '@mui/icons-material/Home';

const PurchaseDetails = () => {
  const [questions, setQuestions] = useState<BooleanQuestion[]>();
  const [tenure, setTenure] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  // const [purchaseAddress, setPurchaseAddress] = useState<Address | null>(null);
  const [numberOfOwners, setNumberOfOwners] = useState<number>(0);
  const [numberValue, setNumberValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  
  const [errors, setErrors] = useState({
    amountBeingBorrowed: "",
    numberOfOwners: "",
    tenure: "",
    remortgageAddress: "",
  });

  const tenureOptions = ["Freehold", "Leasehold"];
  const dispatch = useDispatch();

  const handleAmountBeingBorrowedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, "");
    setNumberValue(rawValue);
    setDisplayValue(formatCurrency(rawValue));
  };

  const handleNumberOfOwnersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10);
    if (value < 1) value = 1;
    else if (value > 4) value = 4;
    setNumberOfOwners(value);
  };

  const handleTenureChange = (event: SelectChangeEvent<string>) => {
    const selectedTenure = event.target.value as string;
    setTenure(selectedTenure);
  
    setQuestions((prevQuestions) =>
      prevQuestions?.map((question) =>
        question.id === 3 ? { ...question, hidden: selectedTenure != "Leasehold" } : question
      )
    );
  };

  useEffect(() => {
    setQuestions(remortgageQuestions);
    setAddresses(AddressesData);
    console.log(addresses);
    setTenure(tenureOptions[0]);
  
    setQuestions((prevQuestions) =>
      prevQuestions?.map((question) =>
        question.id === 3 ? { ...question, hidden: tenureOptions[0] != "Leasehold" } : question
      )
    );
  }, []);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: any = {};
    if (!displayValue) newErrors.amountBeingBorrowed = "Amount being borrowed is required";
    if (numberOfOwners <= 0) newErrors.numberOfOwners = "Number of owners must be greater than 0";
    if (!tenure) newErrors.tenure = "Tenure is required";
    // if (!remortgageAddress) newErrors.remortgageAddress = "Remortgage address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = { amountBeingBorrowed: numberValue, numberOfOwners, tenure };
      const questionResponses = questions?.reduce<Record<string, boolean>>((acc, question) => {
        acc[question.label] = question.checked;
        return acc;
      }, {});
      console.log("Form Data:", formData);
      console.log("Question Responses:", questionResponses);
      dispatch(updateActiveStep(1));
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <Box>
      <Typography>Please complete the following information to obtain your instant estimate</Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2} sx={{ my: 3 }}>
          <Grid item xs={6}>
            <Typography>Amount being borrowed</Typography>
            <TextField
              value={displayValue}
              onChange={handleAmountBeingBorrowedChange}
              error={!!errors.amountBeingBorrowed}
              helperText={errors.amountBeingBorrowed}
              placeholder="Amount being borrowed"
              InputProps={{ startAdornment: (<InputAdornment position="start"><CurrencyPoundIcon /></InputAdornment>) }}
              fullWidth required
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Number of owners</Typography>
            <TextField
              type="number"
              value={numberOfOwners}
              onChange={handleNumberOfOwnersChange}
              error={!!errors.numberOfOwners}
              helperText={errors.numberOfOwners}
              placeholder="Number of owners"
              InputProps={{ startAdornment: (<InputAdornment position="start"><PeopleAltIcon /></InputAdornment>) }}
              fullWidth required
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <Box sx={{ mr: 1 }}>
              <FormControl fullWidth>
                <InputLabel>Tenure</InputLabel>
                <Select
                  label="Tenure"
                  defaultValue={tenureOptions[0]}
                  value={tenure}
                  onChange={handleTenureChange}
                  error={!!errors.tenure}
                  startAdornment={<InputAdornment position="start"><HomeIcon /></InputAdornment>}
                >
                  {tenureOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
                {errors.tenure && <Typography color="error" variant="caption">{errors.tenure}</Typography>}
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ ml: 1 }}>
              {/* <Typography>Remortgage address</Typography> */}
              <AddressLookup/>
            </Box>
          </Grid>
        </Grid>

        <hr style={{ marginBottom: 20, opacity: 0.3 }} />
        {questions?.map((question, index) => (
          <BooleanQuestionComponent key={index} question={question} questions={questions} setQuestions={setQuestions} />
        ))}
        <hr style={{ margin: "20px 0px", opacity: 0.3 }} />

        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={() => navigate("/")} sx={{ background: colors.grey[100] }} disableElevation variant="contained">
            back
          </Button>
          <Button type="submit" disableElevation variant="contained">
            next step
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
};

export default PurchaseDetails;