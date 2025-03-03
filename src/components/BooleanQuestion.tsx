import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import React from "react"
import { BooleanQuestion } from "../types"

const BooleanQuestionComponent: React.FC<BooleanQuestion> = ({ checked, label }) => {
  return (
    <Box display={"flex"} alignItems={"center"} sx={{mb:1}}>

      {/* toggler  */}
      <ToggleButtonGroup
        color="primary"
        value={checked ? "yes" : "no"}
        exclusive
        // onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="yes">Yes</ToggleButton>
        <ToggleButton value="no">No</ToggleButton>
      </ToggleButtonGroup>

      <Typography sx={{ml:2}}>{label}</Typography>

    </Box>
  )
}

export default BooleanQuestionComponent