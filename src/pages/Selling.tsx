import { useDispatch, useSelector } from "react-redux"
import PurchaseDetails from "../components/selling/PurchaseDetails"
import PurchaseEstimateLayout from "../components/common/PurchaseEstimateLayout"
import { getActiveStep, updateSteps } from "../store/data"
import About from "../components/selling/About"
import CostEstimates from "../components/selling/CostEstimates"
import Confirmation from "../components/selling/Confirmation"
import Final from "../components/selling/Final"
import CancelEstimation from "../components/common/CancelEstimation"
import SendEmail from "../components/common/SendEmail"
import { useLayoutEffect } from "react"

const Index = () => {

  const activeStep = useSelector(getActiveStep)
  const dispatch = useDispatch()

  useLayoutEffect(()=>{
dispatch(updateSteps(["selling details", "About you", "Cost Estimate"]))
  },[])

  return (

    activeStep == 0
      ?
      <PurchaseEstimateLayout title="selling Estimates" subtitle="Get a personalised estimate in just a few clicks">
        <PurchaseDetails />
      </PurchaseEstimateLayout>
      :
      activeStep == 1
        ?
        <PurchaseEstimateLayout title="selling Estimates" subtitle="Get a personalised estimate in just a few clicks">
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
          <PurchaseEstimateLayout  title="Lets get you moving!" no_steppers>
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