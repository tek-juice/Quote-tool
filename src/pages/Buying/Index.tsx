import { useDispatch, useSelector } from "react-redux"
import PurchaseDetails from "../../components/Buying/PurchaseDetails"
import PurchaseEstimateLayout from "../../components/common/PurchaseEstimateLayout"
import { getActiveStep, updateSteps } from "../../store/data"
import About from "../../components/Buying/About"
import CostEstimates from "../../components/Buying/CostEstimates"
import Confirmation from "../../components/Buying/Confirmation"
import Final from "../../components/Buying/Final"
import CancelEstimation from "../../components/Buying/CancelEstimation"
import SendEmail from "../../components/Buying/SendEmail"
import { useLayoutEffect } from "react"

const Index = () => {

  const activeStep = useSelector(getActiveStep)
  const dispatch = useDispatch()

  useLayoutEffect(()=>{
    dispatch(updateSteps(["purchase details", "About you", "Cost Estimate"]))
  },[])

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
          activeStep == 3
            ?
          <PurchaseEstimateLayout title="Confirm Purchase Estimate Details" no_steppers>
            <Confirmation/>
          </PurchaseEstimateLayout>

            :
            activeStep == 4
            ?
              <Final/>
            :
            activeStep == -1
            ?
            <CancelEstimation/>
            :
            activeStep == -2
            ?
            <SendEmail/>
            :
          ""

  )
}

export default Index