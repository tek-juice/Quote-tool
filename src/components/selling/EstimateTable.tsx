import { Typography, Box } from "@mui/material"
import { colors } from "../../theme/index"
import { useEffect, useState } from "react"
import { Estimate } from "../../types"
import { sellingEstimatesData as estimatesData, booleanQuestions } from "../../data"
import { formatCurrency } from "../../services/buyingService"
import CustomButton from "../common/CustomButton"
import { useDispatch, useSelector } from "react-redux"
import { updateActiveStep, getPurchaseDetails } from "../../store/data"

// Table Header Component
const TableHeader: React.FC<{ columns: string[] }> = ({ columns }) => (
  <thead style={{ background: colors?.primaryColor }}>
    <tr>
      {columns.map((text, index) => (
        <td key={index} style={{ padding: 10, borderRadius: 0 }}>
          <Typography color="white">{text}</Typography>
        </td>
      ))}
    </tr>
  </thead>
)

// Table Row Component
const Row = ({ estimate }: { estimate: Estimate }) => {
  return (
    <tr>
      <td style={{ padding: 10 }}><Typography>{estimate.label}</Typography></td>
      <td style={{ padding: 10 }}><Typography>£{formatCurrency(estimate.amount)}</Typography></td>
      <td style={{ padding: 10 }}><Typography>£{formatCurrency(estimate.vat)}</Typography></td>
      <td style={{ padding: 10 }}><Typography>£{formatCurrency(estimate.total)}</Typography></td>
    </tr>
  )
}

const EstimateTable = () => {
  const [estimates, setEstimates] = useState<Estimate[]>([])
  const dispatch = useDispatch()
  const purchaseDetails = useSelector(getPurchaseDetails)

  useEffect(() => {
    // Filter and calculate estimates based on boolean questions
    const filteredEstimates = estimatesData.filter((estimate) => {
      const question = booleanQuestions.find((q) => q.label === estimate.label)
      return question ? question.checked : true
    })

    // Calculate total for each estimate
    const calculatedEstimates = filteredEstimates.map((estimate) => ({
      ...estimate,
      total: estimate.amount + estimate.vat,
    }))

    setEstimates(calculatedEstimates)
  }, [purchaseDetails])

  const handleUpdate = () => {
    dispatch(updateActiveStep(0))
  }

  return (
    <Box width={"100%"}>
      <table cellPadding={0} cellSpacing={0} style={{ width: "100%", background: colors?.toggleButtonColor }}>
        <TableHeader columns={["Legal Fee (Residential Transaction)s", "Amount", "VAT", "Total"]} />
        <tbody>
          {/* legal fees */}
          {estimates.filter((estimate) => estimate.fee_type === "legal").map((estimate, index) => (
            <Row key={index} estimate={estimate} />
          ))}

          {/* additional fees */}
          <TableHeader columns={["Additional Fees", "", "", "", "", "", "", "", ""]} />
          {estimates.filter((estimate) => estimate.fee_type === "additional").map((estimate, index) => (
            <Row key={index} estimate={estimate} />
          ))}

          {/* Disbursements fees */}
          <TableHeader columns={["Disbursements", "", "", "", "", "", "", "", ""]} />
          {estimates.filter((estimate) => estimate.fee_type === "disbursements").map((estimate, index) => (
            <Row key={index} estimate={estimate} />
          ))}
        </tbody>
      </table>

      {/* total */}
      <Typography sx={{ m: 1 }} fontWeight={600} textAlign={"end"}>Total</Typography>
      <Typography sx={{ m: 1 }} fontWeight={600} textAlign={"end"}>£{formatCurrency(estimates.reduce((sum, estimate) => sum + estimate.total, 0))}</Typography>

      {/* actions */}
      <hr />
      <CustomButton action={() => dispatch(updateActiveStep(3))} title="NEXT" fullWidth />
      <hr />

      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <CustomButton action={() => dispatch(updateActiveStep(-1))} styles={{ background: colors?.toggleButtonColor }} title="CANCEL ESTIMATE" fullWidth />
        <CustomButton action={handleUpdate} styles={{ margin: "0px 10px" }} title="UPDATE ESTIMATE" fullWidth />
        <CustomButton action={() => dispatch(updateActiveStep(-2))} styles={{ background: colors?.toggleButtonColor }} title="EMAIL ESTIMATE" fullWidth />
      </Box>
    </Box>
  )
}

export default EstimateTable
