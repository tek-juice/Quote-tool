import { Box, Button, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Address } from '../../types';

export interface Props {
  address: Address | null;
  updateAddress: (address: Address | null) => void;
}

const AddressLookup = (props: Props) => {
  const { address, updateAddress } = props;

  const [useManualAddress, setUseManualAddress] = useState(false);

  // local address state for manual entry
  const [manualAddress, setManualAddress] = useState<Address>({
    plotNumber: '',
    buildingName: '',
    buildingNumber: '',
    street: '',
    district: '',
    town: '',
    county: '',
    postcode: '',
    country: '',
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setManualAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAddress = () => {
    updateAddress(manualAddress); // Update the parent component with the new address
  };

  const PostCodeFinder = () => {
    return (
      <Box>
        <TextField
          label="Post code"
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>,
              endAdornment: <InputAdornment position="end"><Button className="small">Lookup</Button></InputAdornment>,
            },
          }}
        />
        <Button onClick={() => setUseManualAddress(true)} className="small">Enter address manually</Button>
      </Box>
    );
  };

  const ManualAddress = () => {
    return (
      <Box>
        <Box>
          <TextField
            name="plotNumber"
            value={manualAddress.plotNumber}
            onChange={(e)=>updateAddress({...address, plotNumber: ""})}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>,
              },
            }}
            fullWidth label="Plot Number"
          />
          <TextField
            name="buildingName"
            value={manualAddress.buildingName}
            onChange={handleAddressChange}
            fullWidth sx={{ my: 3 }} label="Building Name"
          />
          <TextField
            name="buildingNumber"
            value={manualAddress.buildingNumber}
            onChange={handleAddressChange}
            fullWidth label="Building Number"
          />
          <TextField
            name="street"
            value={manualAddress.street}
            onChange={handleAddressChange}
            fullWidth sx={{ my: 3 }} label="Street"
          />
          <TextField
            name="district"
            value={manualAddress.district}
            onChange={handleAddressChange}
            fullWidth label="District"
          />
          <TextField
            name="town"
            value={manualAddress.town}
            onChange={handleAddressChange}
            fullWidth sx={{ my: 3 }} label="Town"
          />
          <TextField
            name="county"
            value={manualAddress.county}
            onChange={handleAddressChange}
            fullWidth label="County"
          />
          <TextField
            name="postcode"
            value={manualAddress.postcode}
            onChange={handleAddressChange}
            fullWidth sx={{ my: 3 }} label="PostCode"
          />
          <TextField
            name="country"
            value={manualAddress.country}
            onChange={handleAddressChange}
            fullWidth label="Country"
          />
        </Box>

        <Button onClick={() => setUseManualAddress(false)} className="small">Use postcode finder</Button>
      </Box>
    );
  };

  return useManualAddress ? <ManualAddress /> : <PostCodeFinder />;
};

export default AddressLookup;
