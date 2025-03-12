import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CustomButton from "../common/CustomButton";

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
      <Box sx={{ px: 5, py: 3 }} alignItems={"center"}>

       <Typography variant="h4">Sorry  to see you go</Typography>
       <Typography sx={{mt:1}}>We are sorry you have decided to cancel your estimate. If you would like <br /> to provide feedback, you may do so in the box below:</Typography>

       <TextField sx={{my:2}} fullWidth multiline rows={4}/>

       <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
        <CustomButton title="GET NEW ESTIMATE"/>
        <CustomButton title="SUBMIT FEEDBACK"/>
       </Box>

      </Box>
    </Box>
  );
};

export default NewBuildConfirmation;