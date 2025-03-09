import { Box } from "@mui/material"

import EstimateHeader from "./EstimateHeader"

const CostEstimate = () => {
  return (
    <Box>
      <hr />
      <EstimateHeader
        email="kigongovincent81@gmail.com"
        name="vincent kigongo"
        phone_number="0756643681"
        purchase_price={10000}
        reference_number={678370}
      />
    </Box>
  )
}

export default CostEstimate
