import { useDispatch, useSelector } from "react-redux"
import PurchaseDetails from "../components/remortgage/PurchaseDetails"
import PurchaseEstimateLayout from "../components/common/PurchaseEstimateLayout"
import { getActiveStep, updateSteps } from "../store/data"
import About from "../components/common/About"
import CostEstimates from "../components/remortgage/CostEstimates"
import Confirmation from "../components/remortgage/Confirmation"
import Final from "../components/remortgage/Final"
import CancelEstimation from "../components/remortgage/CancelEstimation"
import SendEmail from "../components/remortgage/SendEmail"
import { useLayoutEffect } from "react"

const Index = () => {

  const activeStep = useSelector(getActiveStep)
  const dispatch = useDispatch()

  useLayoutEffect(()=>{
dispatch(updateSteps(["Remortgage details", "About you", "Cost Estimate"]))
  },[])

  return (

    activeStep == 0
      ?
      <PurchaseEstimateLayout title="Remortgage Estimates" subtitle="Get a personalised estimate in just a few clicks">
        <PurchaseDetails />
      </PurchaseEstimateLayout>
      :
      activeStep == 1
        ?
        <PurchaseEstimateLayout title="Remortgage Estimates" subtitle="Get a personalised estimate in just a few clicks">
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