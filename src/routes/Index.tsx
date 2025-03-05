import { Route, Routes } from 'react-router'
import BuyingRoute from './BuyingRoute'
import Landing from '../pages/Landing'
import Remortgage from '../pages/Remortgage'
import NotFound from '../pages/NotFound'
import Selling from '../pages/Selling'
import BuyingAndSelling from '../pages/BuyingAndSelling'

const Index = () => {
  return (
    <Routes>
        <Route path='/' Component={Landing}/>
        <Route path='/buying/*' Component={BuyingRoute}/>
        <Route path='/buying_and_selling' Component={BuyingAndSelling}/>
        <Route path='/selling' Component={Selling}/>
        <Route path='/remortgage' Component={Remortgage}/>
        <Route path='*' Component={NotFound}/>
    </Routes>
  )
}

export default Index