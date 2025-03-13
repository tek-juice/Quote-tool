import { Box, Button, colors, DialogActions, InputAdornment, TextField, Typography, Grid, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import BooleanQuestionComponent from "../common/BooleanQuestion";
import { useEffect, useState } from "react";
import { Address, BooleanQuestion } from "../../types";
import { booleanQuestions, sellingQuestions } from "../../data";
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
  const [sellingQuestionsState, setSellingQuestionsState] = useState<BooleanQuestion[]>([]);
  const [buyingQuestionsState, setBuyingQuestionsState] = useState<BooleanQuestion[]>([]);
  const [tenure, setTenure] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [numberOfSellers, setNumberOfSellers] = useState<number>(0);
  const [numberOfBuyers, setNumberOfBuyers] = useState<number>(0);
  const [salePrice, setSalePrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [displaySalePrice, setDisplaySalePrice] = useState("");
  const [displayPurchasePrice, setDisplayPurchasePrice] = useState("");
  
  const [errors, setErrors] = useState({
    salePrice: "",
    numberOfSellers: "",
    purchasePrice: "",
    numberOfBuyers: "",
    tenure: "",
    remortgageAddress: "",
  });

  const tenureOptions = ["Freehold", "Leasehold"];
  const dispatch = useDispatch();

  const handleSalePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, "");
    setSalePrice(rawValue);
    setDisplaySalePrice(formatCurrency(rawValue));
  };

  const handlePurchasePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, "");
    setPurchasePrice(rawValue);
    setDisplayPurchasePrice(formatCurrency(rawValue));
  };

  const handleNumberOfSellersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10);
    if (value < 1) value = 1;
    else if (value > 4) value = 4;
    setNumberOfSellers(value);
  };

  const handleNumberOfBuyersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10);
    if (value < 1) value = 1;
    else if (value > 4) value = 4;
    setNumberOfBuyers(value);
  };

  const handleTenureChange = (event: SelectChangeEvent<string>) => {
    const selectedTenure = event.target.value as string;
    setTenure(selectedTenure);
  
    setSellingQuestionsState((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === 3 ? { ...question, hidden: selectedTenure != "Leasehold" } : question
      )
    );
  };

  useEffect(() => {
    setSellingQuestionsState(sellingQuestions);
    setBuyingQuestionsState(booleanQuestions);
    setAddresses(AddressesData);
    setTenure(tenureOptions[0]);
    console.log(addresses)
    setSellingQuestionsState((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === 3 ? { ...question, hidden: tenureOptions[0] != "Leasehold" } : question
      )
    );
  }, []);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: any = {};
    if (!displaySalePrice) newErrors.salePrice = "Sale price is required";
    if (numberOfSellers <= 0) newErrors.numberOfSellers = "Number of sellers must be greater than 0";
    if (!displayPurchasePrice) newErrors.purchasePrice = "Purchase price is required";
    if (numberOfBuyers <= 0) newErrors.numberOfBuyers = "Number of buyers must be greater than 0";
    if (!tenure) newErrors.tenure = "Tenure is required";
    // if (!remortgageAddress) newErrors.remortgageAddress = "Remortgage address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = { salePrice, numberOfSellers, purchasePrice, numberOfBuyers, tenure };
      const sellingQuestionResponses = sellingQuestionsState.reduce<Record<string, boolean>>((acc, question) => {
        acc[question.label] = question.checked;
        return acc;
      }, {});
      const buyingQuestionResponses = buyingQuestionsState.reduce<Record<string, boolean>>((acc, question) => {
        acc[question.label] = question.checked;
        return acc;
      }, {});
      console.log("Form Data:", formData);
      console.log("Selling Question Responses:", sellingQuestionResponses);
      console.log("Buying Question Responses:", buyingQuestionResponses);
      dispatch(updateActiveStep(1));
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <Box>
      <Typography>Please complete the following information to obtain your instant estimate</Typography>
      <form onSubmit={onSubmit}>
        <br />
        <Typography variant="h6">Selling Information</Typography>
        <Box display="flex" width="100%" sx={{ my: 3 }} justifyContent="stretch" alignItems="center">
          <TextField
            value={displaySalePrice}
            onChange={handleSalePriceChange}
            error={!!errors.salePrice}
            helperText={errors.salePrice}
            placeholder="Sale price"
            InputProps={{ startAdornment: (<InputAdornment position="start"><CurrencyPoundIcon /></InputAdornment>) }}
            fullWidth label="Sale price" required sx={{ mr: 2 }}
          />
          <TextField
            type="number"
            value={numberOfSellers}
            onChange={handleNumberOfSellersChange}
            error={!!errors.numberOfSellers}
            helperText={errors.numberOfSellers}
            InputProps={{ startAdornment: (<InputAdornment position="start"><PeopleAltIcon /></InputAdornment>) }}
            fullWidth label="Number of sellers" required
          />
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
              <AddressLookup/>
            </Box>
          </Grid>
        </Grid>

        <hr style={{ marginBottom: 20, opacity: 0.3 }} />
        {sellingQuestionsState.map((question, index) => (
          <BooleanQuestionComponent key={index} question={question} questions={sellingQuestionsState} setQuestions={setSellingQuestionsState} />
        ))}
        <hr style={{ margin: "20px 0px", opacity: 0.3 }} />

        <Typography variant="h6">Buying Information</Typography>
        <Box display="flex" width="100%" sx={{ my: 3 }} justifyContent="stretch" alignItems="center">
          <TextField
            value={displayPurchasePrice}
            onChange={handlePurchasePriceChange}
            error={!!errors.purchasePrice}
            helperText={errors.purchasePrice}
            placeholder="Purchase price"
            InputProps={{ startAdornment: (<InputAdornment position="start"><CurrencyPoundIcon /></InputAdornment>) }}
            fullWidth label="Purchase price" required sx={{ mr: 2 }}
          />
          <TextField
            type="number"
            value={numberOfBuyers}
            onChange={handleNumberOfBuyersChange}
            error={!!errors.numberOfBuyers}
            helperText={errors.numberOfBuyers}
            InputProps={{ startAdornment: (<InputAdornment position="start"><PeopleAltIcon /></InputAdornment>) }}
            fullWidth label="Number of buyers" required
          />
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
              <AddressLookup/>
            </Box>
          </Grid>
        </Grid>

        <hr style={{ marginBottom: 20, opacity: 0.3 }} />
        {buyingQuestionsState.map((question, index) => (
          <BooleanQuestionComponent key={index} question={question} questions={buyingQuestionsState} setQuestions={setBuyingQuestionsState} />
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