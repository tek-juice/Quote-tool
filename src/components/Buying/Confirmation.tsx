import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, Button, Grid2 as Grid, TextField, Typography, Checkbox } from "@mui/material"
import { useEffect, useState } from "react"
import { PurchaseDetails } from "../../types"
import { purchaseDetailsData } from "../../data/buying"
import { formatCurrency } from "../../services/buyingService"
import CustomButton from "../common/CustomButton"
import { colors } from "../../theme"

interface Client {
  firstName: string
  lastName: string
  companyName?: string
  email: string
  phone: string
  NINO?: string
  dateOfBirth?: string
  isSpouseOrPartner?: boolean
}

const Confirmation = () => {
  const [clients, setClients] = useState<Client[]>([{
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    NINO: "",
    dateOfBirth: "",
    isSpouseOrPartner: false
  }])
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetails>()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    setPurchaseDetails(purchaseDetailsData)
  }, [])

  const updateClient = (index: number, key: keyof Client, value: string | boolean) => {
    const updatedClients = [...clients]
    updatedClients[index] = { ...updatedClients[index], [key]: value }
    setClients(updatedClients)
  }

  const addClient = () => {
    setClients([
      ...clients,
      { firstName: "", lastName: "", companyName: "", email: "", phone: "", NINO: "", dateOfBirth: "", isSpouseOrPartner: false }
    ])
  }

  const removeClient = (index: number) => {
    if (clients.length > 1) {
      const updatedClients = clients.filter((_, idx) => idx !== index)
      setClients(updatedClients)
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    clients.forEach((client, index) => {
      if (!client.firstName) newErrors[`firstName-${index}`] = "First name is required"
      if (!client.lastName) newErrors[`lastName-${index}`] = "Last name is required"
      if (!client.email) newErrors[`email-${index}`] = "Email is required"
      if (client.email && !/\S+@\S+\.\S+/.test(client.email)) newErrors[`email-${index}`] = "Email is invalid"
      if (!client.phone) newErrors[`phone-${index}`] = "Phone number is required"
      if (client.phone && !/^\d{10}$/.test(client.phone)) newErrors[`phone-${index}`] = "Phone number must be 10 digits"
      if (!client.NINO) newErrors[`NINO-${index}`] = "NI No. is required"
      if (!client.dateOfBirth) newErrors[`dateOfBirth-${index}`] = "Date of Birth is required"
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted with clients:", clients)
      // Store the data or handle form submission
    } else {
      console.log("Please complete the form correctly.")
    }
  }

  return (
    <div>
      <Typography>Thank you for choosing us to act on your behalf. Finally, please confirm your contact details and enter the address details below. We will need this information for a member of our staff to contact you regarding the instruction of your Estimate.</Typography>

      <form onSubmit={onSubmit}>
        {clients.map((client, index) => (
          <div key={index}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
              <Typography variant="h6">{index === 0 ? "Primary Buyer" : `Client ${index + 1}`}</Typography>
              {index > 0 && (
                <Button
                  className="small"
                  endIcon={<RemoveCircleOutline />}
                  onClick={() => removeClient(index)}
                >
                  <Typography textTransform={"lowercase"}>
                    Remove Client {index + 1}
                  </Typography>
                </Button>
              )}
            </Box>
            <Typography>Company Name (if applicable)</Typography>
            <TextField
              fullWidth
              placeholder="Company Name"
              value={client.companyName}
              onChange={(e) => updateClient(index, "companyName", e.target.value)}
            />

            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid size={6}>
                <Typography>First Name</Typography>
                <TextField
                  fullWidth
                  placeholder="First Name"
                  value={client.firstName}
                  onChange={(e) => updateClient(index, "firstName", e.target.value)}
                  error={!!errors[`firstName-${index}`]}
                  helperText={errors[`firstName-${index}`]}
                />
              </Grid>
              <Grid size={6}>
                <Typography>Last Name</Typography>
                <TextField
                  fullWidth
                  placeholder="Last Name"
                  value={client.lastName}
                  onChange={(e) => updateClient(index, "lastName", e.target.value)}
                  error={!!errors[`lastName-${index}`]}
                  helperText={errors[`lastName-${index}`]}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid size={6}>
                <Typography>Email</Typography>
                <TextField
                  fullWidth
                  placeholder="Email"
                  value={client.email}
                  onChange={(e) => updateClient(index, "email", e.target.value)}
                  error={!!errors[`email-${index}`]}
                  helperText={errors[`email-${index}`]}
                />
              </Grid>
              <Grid size={6}>
                <Typography>Phone Number</Typography>
                <TextField
                  fullWidth
                  placeholder="Phone Number"
                  value={client.phone}
                  onChange={(e) => updateClient(index, "phone", e.target.value)}
                  error={!!errors[`phone-${index}`]}
                  helperText={errors[`phone-${index}`]}
                />
              </Grid>
            </Grid>

            {index !== 0 && (
              <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid size={6} display="flex" alignItems="center">
                  <Checkbox
                    checked={client.isSpouseOrPartner || false}
                    onChange={(e) => updateClient(index, "isSpouseOrPartner", e.target.checked)}
                    color="primary"
                  />
                  <Typography sx={{ minWidth: "max-content" }}>Spouse or Partner of primary contact?</Typography>
                </Grid>
              </Grid>
            )}

            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid size={6}>
                <Typography>NI No.</Typography>
                <TextField
                  fullWidth
                  placeholder="NI No."
                  value={client.NINO}
                  onChange={(e) => updateClient(index, "NINO", e.target.value)}
                  error={!!errors[`NINO-${index}`]}
                  helperText={errors[`NINO-${index}`]}
                />
              </Grid>
              <Grid size={6}>
                <Typography>Date of Birth</Typography>
                <TextField
                  type="date"
                  fullWidth
                  value={client.dateOfBirth}
                  onChange={(e) => updateClient(index, "dateOfBirth", e.target.value)}
                  error={!!errors[`dateOfBirth-${index}`]}
                  helperText={errors[`dateOfBirth-${index}`]}
                />
              </Grid>
            </Grid>
          </div>
        ))}

        <Button
          sx={{ my: 2 }}
          className="small"
          endIcon={<AddCircleOutline />}
          onClick={addClient}
        >
          <Typography textTransform={"lowercase"}>
            { clients?.length > 1 ? "Add another client" :"Add second client"}
          </Typography>
        </Button>

        {/* purchase details  */}
        <Typography variant="h6" sx={{ my: 2 }}>Purchase Details</Typography>
        <hr />
        <Grid container gap={1}>
          <Grid size={5}>
            <Typography>Purchase price</Typography>
          </Grid>
          <Grid size={6}>
            <Typography>£{formatCurrency(purchaseDetails?.purchasePrice)}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{my:1}} gap={1}>
          <Grid size={5}>
            <Typography>Number of buyers</Typography>
          </Grid>
          <Grid size={6}>
            <Typography>{purchaseDetails?.numberofbuyers}</Typography>
          </Grid>
        </Grid>
        <Grid container gap={1}>
          <Grid size={5}>
            <Typography>Tenure</Typography>
          </Grid>
          <Grid size={6}>
            <Typography>{purchaseDetails?.tenure}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{my:2}} gap={1}>
          <Grid size={5}>
            <Typography>Address of property being
            Purchased</Typography>
          </Grid>
          <Grid size={6}>
            <TextField placeholder="Enter Address Manually"/>
          </Grid>
        </Grid>
        <hr />

        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
          <CustomButton styles={{background: colors?.toggleButtonColor }} title="BACK TO ESTIMATE"/>
          <CustomButton title="CONFIRM DETAILS"  type="submit"/>
        </Box>
      </form>
    </div>
  )
}

export default Confirmation