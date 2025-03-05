import { Box, Button, DialogActions, Typography } from "@mui/material"
import { useNavigate } from "react-router"


const NewBuildConfirmation = () => {
  
  const navigate = useNavigate()

  return (
    <Box height={"100vh"} width={"100vw"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Box sx={{ px:5, py:3}}>

        {/* intro section  */}
        <Typography variant="h4">Purchase estimate</Typography>
        <Typography>is the property a new build?</Typography>

        {/* actions  */}
        <DialogActions>
          <Box sx={{ mt: 2 }} display={"flex"} alignItems={"center"}>
            <Button onClick={()=>navigate("/buying/yes")} disableElevation variant="contained">YES</Button>
            <Button onClick={()=>navigate("/buying/no")} color={"secondary"} sx={{ ml: 1 }} disableElevation variant="contained">NO</Button>
          </Box>
        </DialogActions>
      </Box>
    </Box>
  )
}

export default NewBuildConfirmation