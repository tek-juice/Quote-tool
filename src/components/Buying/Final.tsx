import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useEffect, useState } from "react";

const NewBuildConfirmation = () => {

  const [submitting, setSubmitting] = useState(true);

  useEffect(()=>{
    if(submitting){
      setTimeout(()=>{
        setSubmitting(false)
      }, 2000)
    }
  }
  ,[submitting])

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
      <Box sx={{ px: 5, py: 3 }} display={"flex"} flexDirection={"column"} alignItems={"center"}>

        {
          submitting
          ?
          <>
          <CircularProgress sx={{my:3}} size={60}/>
        {/* intro section  */}
        <Typography textAlign={"center"} variant="h5">
          Submitting details
        </Typography>
          </>
          :
          <>
          <Typography variant="h4">Thank You</Typography>
          <Typography sx={{my:2}} flexWrap={"wrap"}>A member of our team will be in touch with you shortly so we <br /> can assist you with your forthcoming transaction</Typography>
          <Button disableElevation className="small" variant="contained" sx={{py:2}} onClick={() => setSubmitting(true)}>
            <Typography textTransform={"lowercase"}>Back to estimate</Typography>
          </Button>
          </>
        }
      </Box>
    </Box>
  );
};

export default NewBuildConfirmation;