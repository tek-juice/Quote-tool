import { Box, Button,Typography } from "@mui/material"
import React from "react"

export interface Props{
  newBuildAction: (response: "yes" | "no")=>void
}

const NewBuildConfirmation:React.FC<Props> = ({newBuildAction}) => {
  return (
    <Box sx={{p:3}}>

      {/* intro section  */}
      <Typography variant="h4">Purchase estimate</Typography>
      <Typography>is the property a new build?</Typography>

      {/* actions  */}
      <Box sx={{mt:2}} display={"flex"} alignItems={"center"}>
      <Button onClick={()=>newBuildAction("yes")} disableElevation variant="contained">YES</Button>
      <Button onClick={()=>newBuildAction("no")} color={"secondary"} sx={{ml:1}} disableElevation variant="contained">NO</Button>
      </Box>
    </Box>
  )
}

export default NewBuildConfirmation