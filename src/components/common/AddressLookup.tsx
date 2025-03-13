import { Box, Button, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState, useImperativeHandle, forwardRef } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Address } from '../../types';
import { AddressesData } from "../../data/buying";

export interface Props {
  address: Address | null;
  setAddress: (address: Address | null) => void;
  validateAddress: () => boolean;
  ref?: React.Ref<{ validateManualAddress: () => boolean }>;

}

const AddressLookup: React.FC<Props> = forwardRef(({ address, setAddress }, ref) => {
  const [postCode, setPostCode] = useState("");
  const [useManualAddress, setUseManualAddress] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const handlePostcodeLookup = () => {
    const addr = AddressesData?.find((addr) => addr?.postcode === postCode);
    if (!addr) {
      setErrors((prev) => ({ ...prev, postCode: "No results found" }));
    } else {
      setUseManualAddress(true);
      setManualAddress(addr);
      setErrors({});
    }
  };

  const validateManualAddress = () => {
    if(!useManualAddress){
      setUseManualAddress(true);
    }
    const newErrors: { [key: string]: string } = {};
    if (!manualAddress.plotNumber) newErrors.plotNumber = "Plot Number is required";
    if (!manualAddress.buildingName) newErrors.buildingName = "Building Name is required";
    if (!manualAddress.buildingNumber) newErrors.buildingNumber = "Building Number is required";
    if (!manualAddress.street) newErrors.street = "Street is required";
    if (!manualAddress.district) newErrors.district = "District is required";
    if (!manualAddress.town) newErrors.town = "Town is required";
    if (!manualAddress.county) newErrors.county = "County is required";
    if (!manualAddress.postcode) newErrors.postcode = "PostCode is required";
    if (!manualAddress.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    validateManualAddress,
  }));

  useEffect(() => {
    setAddress(manualAddress);
  }, [manualAddress]);

  useLayoutEffect(() => {
    address && setManualAddress(address);
    address?.plotNumber && setUseManualAddress(true);
  }, [address]);



  return (
    <Box ref={ref}>
      {useManualAddress ? (
        <>
          <TextField
            name="plotNumber"
            value={manualAddress.plotNumber}
            onChange={handleAddressChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            label="Plot Number"
            error={!!errors.plotNumber}
            helperText={errors.plotNumber}
          />
          <TextField
            name="buildingName"
            value={manualAddress.buildingName}
            onChange={handleAddressChange}
            fullWidth
            sx={{ my: 3 }}
            label="Building Name"
            error={!!errors.buildingName}
            helperText={errors.buildingName}
          />
          <TextField
            name="buildingNumber"
            value={manualAddress.buildingNumber}
            onChange={handleAddressChange}
            fullWidth
            label="Building Number"
            error={!!errors.buildingNumber}
            helperText={errors.buildingNumber}
          />
          <TextField
            name="street"
            value={manualAddress.street}
            onChange={handleAddressChange}
            fullWidth
            sx={{ my: 3 }}
            label="Street"
            error={!!errors.street}
            helperText={errors.street}
          />
          <TextField
            name="district"
            value={manualAddress.district}
            onChange={handleAddressChange}
            fullWidth
            label="District"
            error={!!errors.district}
            helperText={errors.district}
          />
          <TextField
            name="town"
            value={manualAddress.town}
            onChange={handleAddressChange}
            fullWidth
            sx={{ my: 3 }}
            label="Town"
            error={!!errors.town}
            helperText={errors.town}
          />
          <TextField
            name="county"
            value={manualAddress.county}
            onChange={handleAddressChange}
            fullWidth
            label="County"
            error={!!errors.county}
            helperText={errors.county}
          />
          <TextField
            name="postcode"
            value={manualAddress.postcode}
            onChange={handleAddressChange}
            fullWidth
            sx={{ my: 3 }}
            label="PostCode"
            error={!!errors.postcode}
            helperText={errors.postcode}
          />
          <TextField
            name="country"
            value={manualAddress.country}
            onChange={handleAddressChange}
            fullWidth
            label="Country"
            error={!!errors.country}
            helperText={errors.country}
          />
          <Button onClick={() => setUseManualAddress(false)} className="small">
            Use postcode finder
          </Button>
        </>
      ) : (
        <>
          <TextField
            label="Post code"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value?.toUpperCase())}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button className="small" onClick={handlePostcodeLookup}>
                    Lookup
                  </Button>
                </InputAdornment>
              ),
            }}
            fullWidth
            error={!!errors.postCode}
            helperText={errors.postCode}
          />
          <Button onClick={() => setUseManualAddress(true)} className="small">
            Enter address manually
          </Button>
        </>
      )}
    </Box>
  );
});

export default AddressLookup;
