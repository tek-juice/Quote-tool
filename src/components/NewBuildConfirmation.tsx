import { Box, Button,DialogActions,Typography } from "@mui/material"
import React from "react"

export interface Props{
  newBuildAction: (response: "yes" | "no")=>void
}

const NewBuildConfirmation:React.FC<Props> = ({newBuildAction}) => {
  return (
    <Box >

      {/* intro section  */}
      <Typography variant="h4">Purchase estimate</Typography>
      <Typography>is the property a new build?</Typography>

      {/* actions  */}
      <DialogActions>
      <Box sx={{mt:2}} display={"flex"} alignItems={"center"}>
      <Button onClick={()=>newBuildAction("yes")} disableElevation variant="contained">YES</Button>
      <Button onClick={()=>newBuildAction("no")} color={"secondary"} sx={{ml:1}} disableElevation variant="contained">NO</Button>
      </Box>
      </DialogActions>
    </Box>
  )
}

export default NewBuildConfirmation