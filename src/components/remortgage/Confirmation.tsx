import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, Button, Grid2 as Grid, TextField, Typography, Checkbox } from "@mui/material"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Client, PurchaseDetails, Address } from "../../types"
import { getClients, getPurchaseDetails, updateClients, setPurchaseDetails, updateActiveStep } from "../../store/data"
import { formatCurrency } from "../../services/buyingService"
import CustomButton from "../common/CustomButton"
import AddressLookup from "../common/AddressLookup"
import { colors } from "../../theme"

const Confirmation = () => {
  const dispatch = useDispatch()
  const clientsFromStore = useSelector(getClients)
  const savedPurchaseDetails = useSelector(getPurchaseDetails) as PurchaseDetails | null

  const [clients, setClients] = useState<Client[]>(clientsFromStore)
  const [purchaseDetails, setPurchaseDetailsState] = useState<PurchaseDetails | null>(savedPurchaseDetails)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [confirm, setConfirm] = useState(false)
  const addressLookupRefs = useRef<{ [key: number]: { validateManualAddress: () => boolean } | null } & { purchaseDetails?: { validateManualAddress: () => boolean } | null }>({})
  const [additionalInformation, setAdditionalInformation] = useState<string>("")

  useEffect(() => {
    setClients(clientsFromStore)
    setPurchaseDetailsState(savedPurchaseDetails)
  }, [clientsFromStore, savedPurchaseDetails])

  const updateClient = (index: number, key: keyof Client, value: string | boolean | Address | null) => {
    const updatedClients = [...clients]
    updatedClients[index] = { ...updatedClients[index], [key]: value }
    setClients(updatedClients)
  }

  const addClient = () => {
    setClients([
      ...clients,
      { firstName: "", lastName: "", companyName: "", email: "", phone: "", NINO: "", dateOfBirth: "", isSpouseOrPartner: false, address: undefined }
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
      if (!client.address) newErrors[`address-${index}`] = "Address is required"
    })
    if (!purchaseDetails?.price) newErrors["price"] = "Purchase price is required"
    if (!purchaseDetails?.people) newErrors["people"] = "Number of buyers is required"
    if (!purchaseDetails?.tenure) newErrors["tenure"] = "Tenure is required"
    if (!purchaseDetails?.address) newErrors["purchaseAddress"] = "Address of property being purchased is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isAddressValid = Object.values(addressLookupRefs.current).every(ref => ref?.validateManualAddress())
    if (validateForm() && isAddressValid) {
      dispatch(updateClients(clients))
      if (purchaseDetails) {
        dispatch(setPurchaseDetails(purchaseDetails))
      }
      dispatch(updateActiveStep(4))
    } else {
      console.log("Please complete the form correctly.", validateForm(), isAddressValid)
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

            <Typography>Address</Typography>
            <br />
            <AddressLookup
              address={client.address || null}
              setAddress={(address) => updateClient(index, "address", address)}
              validateAddress={() => true}
              ref={(ref) => {
                addressLookupRefs.current[index] = ref;
              }}
            />
          </div>
        ))}

        <Button
          sx={{ my: 2 }}
          className="small"
          endIcon={<AddCircleOutline />}
          onClick={addClient}
        >
          <Typography textTransform={"lowercase"}>
            {clients?.length > 1 ? "Add another client" : "Add second client"}
          </Typography>
        </Button>

        {/* purchase details */}
        <Typography variant="h6" sx={{ my: 2 }}>Purchase Details</Typography>
        <hr />
        <Grid container gap={1}>
          <Grid size={5}>
            <Typography>Purchase price</Typography>
          </Grid>
          <Grid size={6}>
            <Typography>£{formatCurrency(purchaseDetails?.price)}</Typography>
            {errors["price"] && <Typography color="error">{errors["price"]}</Typography>}
          </Grid>
        </Grid>
        <Grid container sx={{ my: 1 }} gap={1}>
          <Grid size={5}>
            <Typography>Number of buyers</Typography>
          </Grid>
          <Grid size={6}>
            <Typography>{purchaseDetails?.people}</Typography>
            {errors["people"] && <Typography color="error">{errors["people"]}</Typography>}
          </Grid>
        </Grid>
        <Grid container gap={1}>
          <Grid size={5}>
            <Typography>Tenure</Typography>
          </Grid>
          <Grid size={6}>
            <Typography>{purchaseDetails?.tenure}</Typography>
            {errors["tenure"] && <Typography color="error">{errors["tenure"]}</Typography>}
          </Grid>
        </Grid>
        <Grid container sx={{ my: 2 }} gap={1}>
          <Grid size={5}>
            <Typography>Address of property being Purchased</Typography>
          </Grid>
          <Grid size={6}>
            <AddressLookup
              address={purchaseDetails?.address || null}
              setAddress={(address) => {
                if (address) {
                  setPurchaseDetailsState({ ...purchaseDetails, address } as PurchaseDetails)
                }
              }}
              validateAddress={() => true}
              ref={(ref) => {
                addressLookupRefs.current["purchaseDetails"] = ref;
              }}
            />
            {errors["purchaseAddress"] && <Typography color="error">{errors["purchaseAddress"]}</Typography>}
          </Grid>
        </Grid>
        <hr />

        {/* additional information */}
        <Typography variant="h5">Additional Information</Typography>
        <Typography>Do you have any additional information regarding your transaction?</Typography>
        <TextField
          value={additionalInformation}
          onChange={(e) => setAdditionalInformation(e.target.value)}
          sx={{ my: 2 }}
          fullWidth
          multiline
          rows={4}
          placeholder="Additional Information"
        />

        {/* confirmation checkbox */}
        <Box display={"flex"} alignItems={"flex-start"}>
          <Checkbox
            onChange={(_, checked) => setConfirm(checked)}
            checked={confirm}
            color="primary"
          />
          <Typography sx={{ ml: 2 }}>
            We aim to provide you the best experience possible by ensuring all enquiries are given our full and immediate attention. To ensure you are provided accurate costs, we will need your permission to contact you. By agreeing, you will NOT BE added to any promotional mailing lists.
          </Typography>
        </Box>
        <br />

        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
          <CustomButton action={() => dispatch(updateActiveStep(2))} styles={{ background: colors?.toggleButtonColor }} title="BACK TO ESTIMATE" />
          <CustomButton title="CONFIRM DETAILS" type="submit" />
        </Box>
      </form>
    </div>
  )
}

export default Confirmation