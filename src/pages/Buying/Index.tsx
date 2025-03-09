import { useSelector } from "react-redux"
import PurchaseDetails from "../../components/Buying/PurchaseDetails"
import PurchaseEstimateLayout from "../../components/common/PurchaseEstimateLayout"
import { getActiveStep } from "../../store/data"
import About from "../../components/Buying/About"
import CostEstimates from "../../components/Buying/CostEstimates"

const Index = () => {

  const activeStep = useSelector(getActiveStep)

  return (

    activeStep == 0
      ?
      <PurchaseEstimateLayout subtitle="Get a personalised estimate in just a few clicks">
        <PurchaseDetails />
      </PurchaseEstimateLayout>
      :
      activeStep == 1
        ?
        <PurchaseEstimateLayout subtitle="Get a personalised estimate in just a few clicks">
          <About />
        </PurchaseEstimateLayout>
        :
        activeStep == 2
          ?
          <PurchaseEstimateLayout no_steppers>
            <CostEstimates />
          </PurchaseEstimateLayout>
          :
          ""

  )
}

export default Index