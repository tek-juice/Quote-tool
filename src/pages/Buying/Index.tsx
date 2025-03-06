import { useParams } from "react-router"
import PurchaseEstimate1 from "../../components/Buying/PurchaseEstimate1"
import PurchaseEstimateLayout from "../../components/common/PurchaseEstimateLayout"

const Index = () => {

  const {confirmation} = useParams()
  console.log(confirmation)

  return (
    <PurchaseEstimateLayout subtitle="Get a personalised estimate in just a few clicks">
      <PurchaseEstimate1/>
    </PurchaseEstimateLayout>
  )
}

export default Index