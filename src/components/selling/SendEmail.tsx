import { Box, Typography, Grid2 as Grid, TextField, DialogActions, Button, colors } from "@mui/material"
import { useState } from "react"

const SendEmail = () => {
  const [submitted, setSubmitted] = useState(true)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setphone] = useState("")
  const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "", phone: "" })

  const validate = () => {
    let tempErrors = { firstName: "", lastName: "", email: "", phone: "" }
    let isValid = true

    if (!firstName) {
      tempErrors.firstName = "First name is required"
      isValid = false
    }
    if (!lastName) {
      tempErrors.lastName = "Last name is required"
      isValid = false
    }
    if (!email) {
      tempErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid"
      isValid = false
    }
    if (!phone) {
      tempErrors.phone = "Phone number is required"
      isValid = false
    }

    setErrors(tempErrors)
    return isValid
  }

  const handleSubmit = () => {
    if (validate()) {
      // Store data or send it to the server
      console.log({ firstName, lastName, email, phone })
      setSubmitted(true)
    }
  }

  return (
    submitted
      ?
      <Box sx={{ px: 5, py: 3 }} display={"flex"} flexDirection={"column"} alignItems={"center"} className="shadow">
        <Typography variant="h4">Your Estimate is on its way!</Typography>
        <Typography sx={{ my: 2 }} flexWrap={"wrap"}>Thank you. Your estimate has been emailed to the address <br /> provided. Our contact details are contained within the <br /> estimate should you have any queries.</Typography>
        <Button disableElevation className="small" variant="contained" sx={{ py: 2 }} onClick={() => setSubmitted(false)}>
          <Typography textTransform={"lowercase"}>Back to estimate</Typography>
        </Button>
      </Box>
      :
      <Box className="shadow" sx={{ p: 3 }}>
        <Typography textAlign={"center"} variant="h4">Nearly There!</Typography>
        <Typography sx={{ my: 1 }}>Before we send your estimate please check the information below to <br />
          ensure the email reaches you:</Typography>

        {/* details  */}
        <Grid container>
          <Grid size={6}>
            <Box sx={{ mr: .5 }}>
              <Typography>First Name</Typography>
              <TextField 
                placeholder="first name" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Box>
          </Grid>
          <Grid size={6}>
            <Box sx={{ ml: .5 }}>
              <Typography>Last name</Typography>
              <TextField 
                placeholder="last name" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container sx={{ my: 2 }}>
          <Grid size={6}>
            <Box sx={{ mr: .5 }}>
              <Typography>Email</Typography>
              <TextField 
                placeholder="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>
          </Grid>
          <Grid size={6}>
            <Box sx={{ ml: .5 }}>
              <Typography>Phone number</Typography>
              <TextField 
                placeholder="phone number" 
                value={phone} 
                onChange={(e) => setphone(e.target.value)} 
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Box>
          </Grid>
        </Grid>

        <hr />
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button sx={{ background: colors.grey[100] }} disableElevation variant="contained" onClick={() => setSubmitted(true)}>
            BACK TO ESTIMATE
          </Button>
          <Button type="submit" disableElevation variant="contained" onClick={handleSubmit}>
            EMAIL ESTIMATE
          </Button>
        </DialogActions>

      </Box>
  )
}

export default SendEmail