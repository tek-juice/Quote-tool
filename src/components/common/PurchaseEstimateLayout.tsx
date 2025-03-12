import { Container, Step, StepLabel, Stepper, Typography } from "@mui/material"
import { ReactNode } from "react"
import { getActiveStep, getSteps } from "../../store/data"
import { useSelector } from "react-redux"

export interface Props {
  children: ReactNode
  subtitle?: string
  no_steppers?: boolean
  title?: string
}

const PurchaseEstimateLayout: React.FC<Props> = ({ children, subtitle, no_steppers , title}) => {

  const steps = useSelector(getSteps)
  const activeStep = useSelector(getActiveStep)

  return (
    <Container maxWidth="sm" className="shadow" sx={{ p: 4, overflow: "auto", height: "95vh" }}>
      <Typography fontWeight={600} variant="h4" textAlign={"center"}>{ title ? title : "Purchase Estimate"}</Typography>
      {subtitle && <Typography textAlign={"center"} sx={{ mb: 2 }}>{subtitle}</Typography>}
      {/* stepper  */}
      {
        !no_steppers &&
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
          <br />
        </Stepper>}
      <Typography sx={{ mt: 3 }}></Typography>
      {children}
    </Container>
  )
}

export default PurchaseEstimateLayout