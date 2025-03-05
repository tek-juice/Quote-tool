import { Box, Button, colors,  Typography } from "@mui/material"
import { useNavigate } from "react-router"


const NewBuildConfirmation = () => {
  
  const navigate = useNavigate()

  return (
    <Box sx={{
      background: colors.grey[50],
      borderRadius: 3,
    }} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Box sx={{ px:5, py:3}}>

        {/* intro section  */}
        <Typography textAlign={"center"} variant="h4">Purchase estimate</Typography>
        <Typography textAlign={"center"}>is the property a new build?</Typography>

        
          <Box sx={{ mt: 2}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Button onClick={()=>navigate("/buying/yes")} disableElevation variant="contained">YES</Button>
            <Button onClick={()=>navigate("/buying/no")} color={"secondary"} sx={{ ml: 1 }} disableElevation variant="contained">NO</Button>
          </Box>
      </Box>
    </Box>
  )
}

export default NewBuildConfirmation