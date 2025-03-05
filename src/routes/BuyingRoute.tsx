import { Route, Routes } from "react-router"
import Buying from "../pages/Buying/Index"
import Confirmation from "../pages/Buying/Confirmation"

const BuyingRoute = () => {
  return (
    <Routes>
      <Route index path="/" Component={Confirmation}/>
      <Route path="/:confirmation" Component={Buying}/>
    </Routes>
  )
}

export default BuyingRoute