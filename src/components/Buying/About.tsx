import { Box, Button, Grid2, TextField, Typography, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions as DialogActionsMui, colors } from "@mui/material";
import { useState, useEffect } from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveStep, updateClients, getClients } from "../../store/data";
import { Client } from "../../types";

const About = () => {
  const dispatch = useDispatch();
  const savedClients = useSelector(getClients) as Client[];

  const [clients, setClients] = useState<Client[]>([{
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    isSpouseOrPartner: false
  }]);
  const [confirm, setConfirm] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [openDialog, setOpenDialog] = useState(false);  // State for controlling the dialog

  useEffect(() => {
    if (savedClients.length > 0) {
      setClients(savedClients);
    }
  }, [savedClients]);

  const updateClient = (index: number, key: keyof Client, value: string | boolean) => {
    const updatedClients = [...clients];
    updatedClients[index] = { ...updatedClients[index], [key]: value };
    setClients(updatedClients);
  };

  const addClient = () => {
    setClients([
      ...clients,
      { firstName: "", lastName: "", email: "", phoneNumber: "", isSpouseOrPartner: false }
    ]);
  };

  const removeClient = (index: number) => {
    if (clients.length > 1) {
      const updatedClients = clients.filter((_, idx) => idx !== index);
      setClients(updatedClients);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    clients.forEach((client, index) => {
      if (!client.firstName) newErrors[`firstName-${index}`] = "First name is required";
      if (!client.lastName) newErrors[`lastName-${index}`] = "Last name is required";
      if (client.email && !/\S+@\S+\.\S+/.test(client.email)) newErrors[`email-${index}`] = "Email is invalid";
      if (client.phoneNumber && !/^\d{10}$/.test(client.phoneNumber)) newErrors[`phoneNumber-${index}`] = "Phone number must be 10 digits";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && confirm) {
      dispatch(updateClients(clients));
      dispatch(updateActiveStep(2));
      // Navigate or handle form submission
    } else {
      if (!confirm && validateForm()) {
        setOpenDialog(true);  // Open the dialog if confirmation is not checked
      } else {
        console.log("Please complete the form correctly.");
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Typography>Please add the details for all clients involved in this transaction</Typography>

      {/* form */}
      <form onSubmit={onSubmit}>
        {/* render client fields */}
        {clients?.map((client, index) => (
          <>
            {index !== 0 && <hr />}
            <Grid2 key={index} container spacing={2} sx={{ my: 2 }}>
              <Grid2 size={6}>
                {index !== 0 && <Typography variant="h6">{`Client ${index + 1}`}</Typography>}
              </Grid2>
              <Grid2 size={6} sx={{ justifyContent: "flex-end", display: "flex" }}>
                {index > 0 && (
                  <Button className="small" endIcon={<RemoveCircleOutline />} onClick={() => removeClient(index)}>
                    <Typography textTransform={"lowercase"}>
                      Remove Client {index + 1}
                    </Typography>
                  </Button>
                )}
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  value={client.firstName}
                  label="First name"
                  onChange={(e) => updateClient(index, "firstName", e.target.value)}
                  error={!!errors[`firstName-${index}`]}
                  helperText={errors[`firstName-${index}`]}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  value={client.lastName}
                  label="Last name"
                  onChange={(e) => updateClient(index, "lastName", e.target.value)}
                  error={!!errors[`lastName-${index}`]}
                  helperText={errors[`lastName-${index}`]}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  value={client.email}
                  label="Email (optional)"
                  placeholder="(optional)"
                  onChange={(e) => updateClient(index, "email", e.target.value)}
                  error={!!errors[`email-${index}`]}
                  helperText={errors[`email-${index}`]}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  value={client.phoneNumber}
                  label="Phone number (optional)"
                  placeholder="(optional)"
                  onChange={(e) => updateClient(index, "phoneNumber", e.target.value)}
                  error={!!errors[`phoneNumber-${index}`]}
                  helperText={errors[`phoneNumber-${index}`]}
                />
              </Grid2>
              {index !== 0 && (
                <Grid2 size={6} display="flex" alignItems="center">
                  <Checkbox
                    checked={client.isSpouseOrPartner || false}
                    onChange={(e) => updateClient(index, "isSpouseOrPartner", e.target.checked)}
                    color="primary"
                  />
                  <Typography sx={{ minWidth: "max-content" }}>Spouse or Partner of primary contact?</Typography>
                </Grid2>
              )}
            </Grid2>
          </>
        ))}

        <Button
          className="small"
          endIcon={<AddCircleOutline />}
          onClick={(e) => {
            e.preventDefault();
            addClient();
          }}
        >
          <Typography textTransform={"lowercase"}>
            {clients.length > 1 ? `Add another client` : `Add second client`}
          </Typography>
        </Button>

        <hr />

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

        {/* action buttons */}
        <DialogActionsMui sx={{ justifyContent: "space-between", mt: 2 }}>
          <Button
            onClick={() => dispatch(updateActiveStep(0))}
            sx={{ background: colors.grey[100] }}
            disableElevation
            variant="contained"
          >
            back
          </Button>
          <Button type="submit" disableElevation variant="contained">
            get estimate
          </Button>
        </DialogActionsMui>
      </form>

      {/* Confirmation dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation Required</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You need to confirm that you agree to the terms before proceeding.
          </Typography>
        </DialogContent>
        <DialogActionsMui>
          <Button className="small" onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActionsMui>
      </Dialog>
    </Box>
  );
};

export default About;