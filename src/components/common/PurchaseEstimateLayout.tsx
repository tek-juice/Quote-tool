import { colors, Container, Step, StepLabel, Stepper, Typography } from "@mui/material"
import { ReactNode } from "react"
import { getActiveStep, getSteps } from "../../store/data"
import { useSelector } from "react-redux"

export interface Props {
  children: ReactNode
  subtitle?: string
}

const PurchaseEstimateLayout: React.FC<Props> = ({ children, subtitle }) => {

  const steps = useSelector(getSteps)
  const activeStep = useSelector(getActiveStep)

  return (
    <Container maxWidth="sm" sx={{p:4, background: colors.grey[50]}}>
      <Typography fontWeight={600} variant="h4" textAlign={"center"}>Purchase Estimate</Typography>
      {subtitle && <Typography textAlign={"center"} sx={{ mb: 2 }}>{subtitle}</Typography>}
      {/* stepper  */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
        <br />
      </Stepper>
      <Typography sx={{ mt: 3 }} variant="h5">{steps[activeStep]}</Typography>
      {children}
    </Container>
  )
}

export default PurchaseEstimateLayout