import { Autocomplete, Box, TextField, Typography } from "@mui/material"

const PurchaseEstimate1 = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography>Please complete the following information to obtain your instant estimate</Typography>

      {/* form  */}
      <form action="">

        <Box display={"flex"} width={"100%"} sx={{ my: 3 }} justifyContent={"stretch"} alignItems={"center"}>
          {/* purchase price  */}
          <TextField fullWidth label="Purchase price" required sx={{ mr: 2 }} />
          {/* No. of buyers  */}
          <TextField type="number" fullWidth label="Number of buyers" required />
        </Box>

        <Box display={"flex"} width={"100%"} sx={{ my: 3 }} justifyContent={"stretch"} alignItems={"center"}>
          {/* Tenure  */}
          <Autocomplete
            sx={{mr:2}}
            fullWidth
            disablePortal
            options={["option 1", "option 2", "option 3"]}
            renderInput={(params) => <TextField {...params} label="Tenure"/>}
          />
          {/* purchase address  */}
          <TextField fullWidth label="Purchase address" required />
        </Box>

      </form>

    </Box>
  )
}

export default PurchaseEstimate1