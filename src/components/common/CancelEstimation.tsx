import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import CustomButton from "../common/CustomButton";
import { setPurchaseDetails, updateActiveStep, updateClients } from "../../store/data";

const CancelEstimation = () => {
  const [submitting, setSubmitting] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<{ feedback?: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (submitting) {
      setTimeout(() => {
        setSubmitting(false);
      }, 2000);
    }
  }, [submitting]);

  const validateForm = () => {
    const newErrors: { feedback?: string } = {};
    if (!feedback) newErrors.feedback = "Feedback is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const reset=()=>{
    dispatch(setPurchaseDetails({}));
    dispatch(updateClients([]));
    // Navigate to home page
    navigate("/");
    dispatch(updateActiveStep(0))
  }
  const handleSubmitFeedback = () => {
    if (validateForm()) {
      // Handle feedback submission
      console.log("Feedback submitted:", feedback);
      reset()
    }
  };

  const handleGetNewEstimate = () => {
    // Clear purchase details and clients data
    reset()
  };

  return (
    <Box
      className="shadow"
      sx={{
        borderRadius: 1,
      }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box sx={{ px: 5, py: 3 }} alignItems={"center"}>
        <Typography variant="h4">Sorry to see you go</Typography>
        <Typography sx={{ mt: 1 }}>
          We are sorry you have decided to cancel your estimate. If you would like <br /> to provide feedback, you may do so in the box below:
        </Typography>

        <TextField
          sx={{ my: 2 }}
          fullWidth
          multiline
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          error={!!errors.feedback}
          helperText={errors.feedback}
        />

        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <CustomButton title="GET NEW ESTIMATE" action={handleGetNewEstimate} />
          <CustomButton title="SUBMIT FEEDBACK" action={handleSubmitFeedback} />
        </Box>
      </Box>
    </Box>
  );
};

export default CancelEstimation;