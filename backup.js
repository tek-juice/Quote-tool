import { Autocomplete, Box, Button, colors, DialogActions, InputAdornment, TextField, Typography, Grid2 as Grid } from "@mui/material";
import BooleanQuestionComponent from "../common/BooleanQuestion";
import { useEffect, useState } from "react";
import { Address, BooleanQuestion } from "../../types";
import { booleanQuestions } from "../../data";
import { useNavigate } from "react-router";
import { formatCurrency } from "../../services/buyingService";
import { AddressesData } from "../../data/buying";
import { useDispatch } from "react-redux";
import { updateActiveStep } from "../../store/data";
import AddressLookup from "../common/AddressLookup";
import HouseIcon from '@mui/icons-material/House';

const PurchaseDetails = () => {
  const [questions, setQuestions] = useState<BooleanQuestion[]>();
  const [tenure, setTenure] = useState(""); // Default empty string
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [purchaseAddress, setPurchaseAddress] = useState<Address | null>(null); // Address state can be null initially
  const [numberOfBuyers, setNumberOfBuyers] = useState<number>(0);
  const [numberValue, setNumberValue] = useState(""); // Purchase price raw value
  const [displayValue, setDisplayValue] = useState(""); // Purchase price formatted value

  // Validation states
  const [errors, setErrors] = useState({
    purchasePrice: "",
    numberOfBuyers: "",
    tenure: "",
    purchaseAddress: "",
  });

  const tenureOptions = ["Freehold", "Leasehold"];

  const dispatch = useDispatch()

  // Handle user input for purchase price
  const handlePurchasePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setNumberValue(rawValue); // Store raw numeric value
    setDisplayValue(formatCurrency(rawValue)); // Format for display
  };

  // Handle change for number of buyers
  const handleNumberOfBuyersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10);

    // Ensure the value is between 1 and 4
    if (value < 1) {
      value = 1;
    } else if (value > 4) {
      value = 4;
    }

    setNumberOfBuyers(value);
  };


  // Handle change for tenure
  const handleTenureChange = (_: React.ChangeEvent<{}>, value: string | null) => {
    if (value) {
      setTenure(value);
    }
  };

  // Fetch example addresses for testing
  useEffect(() => {
    setQuestions(booleanQuestions);
    setAddresses(AddressesData);
  }, []);

  const navigate = useNavigate();

  // Validate form
  const validateForm = () => {
    const newErrors: any = {};

    if (!displayValue) {
      newErrors.purchasePrice = "Purchase price is required";
    }

    if (numberOfBuyers <= 0) {
      newErrors.numberOfBuyers = "Number of buyers must be greater than 0";
    }

    if (!tenure) {
      newErrors.tenure = "Tenure is required";
    }

    if (!purchaseAddress) {
      newErrors.purchaseAddress = "Purchase address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission

    if (validateForm()) {
      const formData = {
        purchasePrice: numberValue,
        numberOfBuyers,
        tenure,
        purchaseAddress: purchaseAddress?.name,
      };
      const questionResponses = questions?.reduce<Record<string, boolean>>((acc, question) => {
        acc[question.label] = question.checked;
        return acc;
      }, {});


      console.log("Form Data:", formData);
      console.log("Question Responses:", questionResponses);
      dispatch(updateActiveStep(1))
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <Box>
      <Typography>Please complete the following information to obtain your instant estimate</Typography>

      {/* form */}
      <form onSubmit={onSubmit}>
        <Box display={"flex"} width={"100%"} sx={{ my: 3 }} justifyContent={"stretch"} alignItems={"center"}>
          {/* purchase price */}
          <TextField
            className="input"
            value={displayValue}
            onChange={handlePurchasePriceChange}
            error={!!errors.purchasePrice}
            helperText={errors.purchasePrice}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <span><Typography fontWeight={600}>£</Typography></span> {/* Wrap in a span to avoid issues */}
                  </InputAdornment>
                ),
              },
            }}
            fullWidth label="Purchase price" required sx={{ mr: 2 }}
          />
          {/* No. of buyers */}
          <TextField

            type="number"
            value={numberOfBuyers}
            onChange={handleNumberOfBuyersChange}
            error={!!errors.numberOfBuyers}
            helperText={errors.numberOfBuyers}
            fullWidth
            label="Number of buyers"
            required
          />
        </Box>

        <Grid container>
          <Grid size={6}>
            {/* No. of buyers */}
            <Box sx={{ mr: 1 }}>
              <TextField
                type="number"
                value={numberOfBuyers}
                onChange={handleNumberOfBuyersChange}
                error={!!errors.numberOfBuyers}
                helperText={errors.numberOfBuyers}
                fullWidth
                label="Number of buyers"
                required
              />
            </Box>
          </Grid>
          <Grid size={6}>
            <Box sx={{ ml: 1 }}>
              <AddressLookup />
            </Box>

          </Grid>

        </Grid>

        <hr style={{ marginBottom: 20, opacity: 0.3 }} />
        {questions?.map((question, index) => (
          <BooleanQuestionComponent
            key={index}
            question={question}
            questions={questions}
            setQuestions={setQuestions}
          />
        ))}
        <hr style={{ margin: "20px 0px", opacity: 0.3 }} />

        {/* actions */}
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

export default PurchaseDetails;
