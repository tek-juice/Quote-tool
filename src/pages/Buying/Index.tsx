import { useSelector } from "react-redux"
import PurchaseDetails from "../../components/Buying/PurchaseDetails"
import PurchaseEstimateLayout from "../../components/common/PurchaseEstimateLayout"
import { getActiveStep } from "../../store/data"
import About from "../../components/Buying/About"
import CostEstimates from "../../components/Buying/CostEstimates"

const Index = () => {

  const activeStep = useSelector(getActiveStep)

  return (
    <PurchaseEstimateLayout subtitle="Get a personalised estimate in just a few clicks">
      {
        activeStep == 0
          ?
          <PurchaseDetails />
          :
          activeStep == 1
            ?
            <About />
            :
            activeStep == 2
              ?
              <CostEstimates />
              :
              ""
      }
    </PurchaseEstimateLayout>
  )
}

export default Index