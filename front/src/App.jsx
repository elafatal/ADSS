// import Profile from "./Component/profile"
import {Route,Routes} from 'react-router-dom'
import Home1 from "./Component/home/Home1"
import Home from "./Component/home/Home"
import Signup from './Component/start/Signup'
import Signin from './Component/start/Signin'
import Info from './Component/info/info'
import Newtrips from './Component/trips/NewTrips'
import Pay from './Component/pay/Pay'
import Payforme from './Component/pay/Payforme'
import About from './Component/about/About'
import ExistingTrips from './Component/eTrips/ExistingTrips'
import SearchTrips from './Component/eTrips/SearchTrips'
import MyTrips from './Component/eTrips/Mytrips'
import Admin from './Component/admin/Admin'
import AdminLogin from './Component/admin/AdminLogin'
import AdminViewTrips from './Component/admin/AdminViewTrips'


function App(){
    return(
        <>
            <Routes>
                <Route path='/' element={<Home1/>} />
                <Route path='/start' element={<Home/>} />
                <Route path='/signin' element={<Signin/>} />
                <Route path='/signup' element={<Signup/>} />
                <Route path='/info' element={<Info/>} />
                <Route path='/newtrip' element={<Newtrips/>} />
                <Route path='/mytrip' element={<MyTrips/>} />
                <Route path='/searshTrips' element={<SearchTrips/>} />
                <Route path='/existtrips' element={<ExistingTrips/>} />
                <Route path='/pay' element={<Pay/>} />
                <Route path='/payforme' element={<Payforme/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/admin' element={<Admin/>} />
                <Route path='/AdminLogin' element={<AdminLogin/>} />
                <Route path='/Adminviewtrips' element={<AdminViewTrips/>} />
                
                
            </Routes>

        </>
    )
}
export default App