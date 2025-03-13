import { Box, Button, colors, DialogActions, InputAdornment, TextField, Typography, Grid, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import BooleanQuestionComponent from "../common/BooleanQuestion";
import { useEffect, useState } from "react";
import { Address, BooleanQuestion } from "../../types";
import { sellingQuestions } from "../../data";
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
  const [numberOfSellers, setNumberOfSellers] = useState<number>(0);
  const [numberValue, setNumberValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  
  const [errors, setErrors] = useState({
    salePrice: "",
    numberOfSellers: "",
    tenure: "",
    remortgageAddress: "",
  });

  const tenureOptions = ["Freehold", "Leasehold"];
  const dispatch = useDispatch();

  const handleSalePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, "");
    setNumberValue(rawValue);
    setDisplayValue(formatCurrency(rawValue));
  };

  const handleNumberOfSellersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10);
    if (value < 1) value = 1;
    else if (value > 4) value = 4;
    setNumberOfSellers(value);
  };

  const handleTenureChange = (event: SelectChangeEvent<string>) => {
    const selectedTenure = event.target.value as string;
    setTenure(selectedTenure);
  };

  useEffect(() => {
    setQuestions(sellingQuestions);
    setAddresses(AddressesData);
    console.log(addresses);
    setTenure(tenureOptions[0]);
  }, []);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: any = {};
    if (!displayValue) newErrors.salePrice = "Sale price is required";
    if (numberOfSellers <= 0) newErrors.numberOfSellers = "Number of sellers must be greater than 0";
    if (!tenure) newErrors.tenure = "Tenure is required";
    // if (!remortgageAddress) newErrors.remortgageAddress = "Remortgage address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = { salePrice: numberValue, numberOfSellers, tenure };
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
        <Box display="flex" width="100%" sx={{ my: 3 }} justifyContent="stretch" alignItems="center">
          <Box sx={{ mr: 2 }}>
            <Typography>Sale price</Typography>
            <TextField
              value={displayValue}
              onChange={handleSalePriceChange}
              error={!!errors.salePrice}
              helperText={errors.salePrice}
              placeholder="Sale price"
              InputProps={{ startAdornment: (<InputAdornment position="start"><CurrencyPoundIcon /></InputAdornment>) }}
              fullWidth required
            />
          </Box>
          <Box>
            <Typography>Number of sellers</Typography>
            <TextField
              type="number"
              value={numberOfSellers}
              onChange={handleNumberOfSellersChange}
              error={!!errors.numberOfSellers}
              helperText={errors.numberOfSellers}
              placeholder="Number of sellers"
              InputProps={{ startAdornment: (<InputAdornment position="start"><PeopleAltIcon /></InputAdornment>) }}
              fullWidth required
            />
          </Box>
        </Box>

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