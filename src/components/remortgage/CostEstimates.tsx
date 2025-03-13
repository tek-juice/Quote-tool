import { Box } from "@mui/material"

import EstimateHeader from "./EstimateHeader"
import EstimateTable from "./EstimateTable"

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
      <br />
      <EstimateTable/>
    </Box>
  )
}

export default CostEstimate
