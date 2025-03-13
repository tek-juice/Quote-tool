import { useDispatch, useSelector } from "react-redux"
import PurchaseDetails from "../components/buying_and_selling/PurchaseDetails"
import PurchaseEstimateLayout from "../components/common/PurchaseEstimateLayout"
import { getActiveStep, updateSteps } from "../store/data"
import About from "../components/buying_and_selling/About"
import CostEstimates from "../components/buying_and_selling/CostEstimates"
import Confirmation from "../components/buying_and_selling/Confirmation"
import Final from "../components/buying_and_selling/Final"
import CancelEstimation from "../components/buying_and_selling/CancelEstimation"
import SendEmail from "../components/buying_and_selling/SendEmail"
import { useLayoutEffect } from "react"

const Index = () => {

  const activeStep = useSelector(getActiveStep)
  const dispatch = useDispatch()

  useLayoutEffect(()=>{
dispatch(updateSteps(["Sale & Purchase Details", "About you", "Cost Estimate"]))
  },[])

  return (

    activeStep == 0
      ?
      <PurchaseEstimateLayout title="Sale & Purchase Estimate" subtitle="Get a personalised estimate in just a few clicks">
        <PurchaseDetails />
      </PurchaseEstimateLayout>
      :
      activeStep == 1
        ?
        <PurchaseEstimateLayout title="Sale & Purchase Estimate" subtitle="Get a personalised estimate in just a few clicks">
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
          <PurchaseEstimateLayout  title="Confirm Purchase Estimate Details" no_steppers>
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