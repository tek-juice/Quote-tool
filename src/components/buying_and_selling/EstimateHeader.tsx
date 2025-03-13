import { Box, Typography } from '@mui/material'
import { formatCurrency } from '../../services/buyingService';

export interface Props {
  name: string
  email: string
  phone_number: string
  reference_number: number
  purchase_price: number

}



const EstimateHeader: React.FC<Props> = ({ email, name, phone_number, purchase_price, reference_number }) => {

  return (
    <Box display={"flex"} justifyContent={"space-between"}>

      {/* bio  */}
      <Box>
        <Typography fontWeight={600}>Your Details</Typography>
        <Typography color="textSecondary">{name}</Typography>
        <Typography color='textSecondary'>{phone_number}</Typography>
        <Typography color='textSecondary'>{email}</Typography>
      </Box>

      <Box width={200}/>

      {/* purchase details  */}
      <Box display={"flex"} flexDirection={"column"} alignItems={"flex-end"}>
        <Typography fontWeight={600}>Reference</Typography>
        <Typography color='textSecondary'>{reference_number}</Typography>
        <Typography fontWeight={600}>Purchase Price</Typography>
        <Typography>£{formatCurrency(purchase_price)}</Typography>
      </Box>

    </Box>
  )
}

export default EstimateHeader