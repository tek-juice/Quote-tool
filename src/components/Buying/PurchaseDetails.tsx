import { Box, Button, colors, DialogActions, InputAdornment, TextField, Typography, Grid, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import BooleanQuestionComponent from "../common/BooleanQuestion";
import { useEffect, useState, useRef } from "react";
import { Address, BooleanQuestion, PurchaseDetails } from "../../types";
import { booleanQuestions } from "../../data";
import { useNavigate } from "react-router";
import { formatCurrency } from "../../services/buyingService";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseDetails, setPurchaseDetails, updateActiveStep } from "../../store/data";
import AddressLookup from "../common/AddressLookup";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import HomeIcon from '@mui/icons-material/Home';

const PurchaseDetailsComponent = () => {
  const [questions, setQuestions] = useState<BooleanQuestion[]>();
  const [tenure, setTenure] = useState("");
  const [purchaseAddress, setPurchaseAddress] = useState<Address | null>(null);
  const [numberOfBuyers, setNumberOfBuyers] = useState<number>(0);
  const [numberValue, setNumberValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");

  const [errors, setErrors] = useState({
    purchasePrice: "",
    numberOfBuyers: "",
    tenure: "",
    purchaseAddress: "",
  });

  const tenureOptions = ["freehold", "leasehold"];
  const dispatch = useDispatch();
  const addressLookupRef = useRef<{ validateManualAddress: () => boolean }>(null);

  const handlePurchasePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, "");
    setNumberValue(rawValue);
    setDisplayValue(formatCurrency(rawValue));
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

    setQuestions((prevQuestions) =>
      prevQuestions?.map((question) =>
        question.id === 11 ? { ...question, hidden: selectedTenure !== "Leasehold" } : question
      )
    );
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: any = {};
    if (!displayValue) newErrors.purchasePrice = "Purchase price is required";
    if (numberOfBuyers <= 0) newErrors.numberOfBuyers = "Number of buyers must be greater than 0";
    if (!tenure) newErrors.tenure = "Tenure is required";
    if (!purchaseAddress) newErrors.purchaseAddress = "Purchase address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isAddressValid = addressLookupRef.current?.validateManualAddress();
    if (validateForm() && isAddressValid) {
      const purchaseDetails: PurchaseDetails = {
        price: +numberValue,
        people: numberOfBuyers,
        tenure: tenure === "freehold" ? "freehold" : "leasehold",
        address: purchaseAddress ?? {},
        questions: questions ?? [],
      };
      dispatch(setPurchaseDetails(purchaseDetails));
      dispatch(updateActiveStep(1));
    } else {
      console.log("Form has errors");
    }
  };


  const savedPurchaseDetails: PurchaseDetails | null = useSelector(getPurchaseDetails) as PurchaseDetails | null;

  const initializeState = () => {
    if (savedPurchaseDetails?.price) {
      setNumberValue(savedPurchaseDetails.price.toString());
      setDisplayValue(formatCurrency(savedPurchaseDetails.price.toString()));
      setNumberOfBuyers(savedPurchaseDetails.people);
      setTenure(savedPurchaseDetails.tenure);
      setPurchaseAddress(savedPurchaseDetails.address);
      setQuestions(savedPurchaseDetails.questions);
    } else {
      setQuestions(booleanQuestions);
      setTenure(tenureOptions[0]);
      setQuestions((prevQuestions) =>
        prevQuestions?.map((question) =>
          question.id === 11 ? { ...question, hidden: tenureOptions[0] != "leasehold" } : question
        )
      );
    }
  };
  
  useEffect(() => {
    initializeState();
  }, [savedPurchaseDetails]);

  return (
    <Box>
      <Typography>Please complete the following information to obtain your instant estimate</Typography>
      <form onSubmit={onSubmit}>
        <Box display="flex" width="100%" sx={{ my: 3 }} justifyContent="stretch" alignItems="center">
          <TextField
            value={displayValue}
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
              <AddressLookup ref={addressLookupRef} address={purchaseAddress} setAddress={setPurchaseAddress} validateAddress={() => true} />
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
            cancel
          </Button>
          <Button type="submit" disableElevation variant="contained">
            next
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
};

export default PurchaseDetailsComponent;