import { Box, Step, StepLabel, Stepper } from "@mui/material"
import { ReactNode } from "react"

export interface Props {
  children: ReactNode
  steps: string[],
  activeStep: number
}

const PurchaseEstimateLayout: React.FC<Props> = ({ children, activeStep, steps }) => {

  return (
    <Box>

      {/* stepper  */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
        <br />
      </Stepper>

      {children}
    </Box>
  )
}

export default PurchaseEstimateLayout