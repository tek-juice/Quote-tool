import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material"
import { ReactNode } from "react"

export interface Props {
  children: ReactNode
  steps: string[],
  activeStep: number
  subtitle?: string
}

const PurchaseEstimateLayout: React.FC<Props> = ({ children, activeStep, steps, subtitle }) => {

  return (
    <Box>
      <Typography fontWeight={600} variant="h4" textAlign={"center"}>Purchase Estimate</Typography>
      {subtitle && <Typography textAlign={"center"} sx={{mb:2}}>{subtitle}</Typography>}
      {/* stepper  */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
        <br />
      </Stepper>
      <Typography sx={{mt:3}} variant="h5">{steps[activeStep]}</Typography>
      {children}
    </Box>
  )
}

export default PurchaseEstimateLayout