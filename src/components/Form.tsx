import { useState } from "react";
import { TextField, Select, MenuItem, Button, ToggleButton, ToggleButtonGroup, Typography, Container, Box } from "@mui/material";

interface FormData {
  price: string;
  tenure: string;
  address: string;
  buyers: string;
  questions: {
    wales: string;
    company: string;
    multipleOwners: string;
    mortgage: string;
    shared: string;
    helpToBuy: string;
    gifted: string;
  };
}

const PurchaseForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    price: "",
    tenure: "",
    address: "",
    buyers: "",
    questions: {
      wales: "NO",
      company: "NO",
      multipleOwners: "NO",
      mortgage: "NO",
      shared: "NO",
      helpToBuy: "NO",
      gifted: "NO",
    },
  });

  const handleChange = (field: keyof FormData) => (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormData({ ...formData, [field]: event.target.value as string });
  };

  const handleToggle = (field: keyof FormData["questions"]) => (
    event: React.MouseEvent<HTMLElement>,
    value: string | null
  ) => {
    if (value !== null) {
      setFormData({
        ...formData,
        questions: { ...formData.questions, [field]: value },
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Purchase Estimate
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Get a personalised estimate in just a few clicks
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Purchase Price" fullWidth value={formData.price} onChange={handleChange("price")} />
        <TextField label="No. of Buyers" fullWidth value={formData.buyers} onChange={handleChange("buyers")} />
        <Select fullWidth value={formData.tenure} onChange={handleChange("tenure")} displayEmpty>
          <MenuItem value="">Select Tenure</MenuItem>
          <MenuItem value="Freehold">Freehold</MenuItem>
          <MenuItem value="Leasehold">Leasehold</MenuItem>
        </Select>
        <TextField label="Purchase Address" fullWidth value={formData.address} onChange={handleChange("address")} />
        {Object.keys(formData.questions).map((key) => (
          <Box key={key} display="flex" justifyContent="space-between" alignItems="center">
            <Typography>{key.replace(/([A-Z])/g, " $1").trim()}?</Typography>
            <ToggleButtonGroup
              value={formData.questions[key as keyof FormData["questions"]]}
              exclusive
              onChange={handleToggle(key as keyof FormData["questions"])}
              aria-label={key}
            >
              <ToggleButton value="YES">YES</ToggleButton>
              <ToggleButton value="NO">NO</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        ))}
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined">Back</Button>
          <Button variant="contained" color="primary">Next</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PurchaseForm;
