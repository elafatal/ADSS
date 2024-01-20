// import Profile from "./Component/profile"
import {Route,Routes} from 'react-router-dom'
import Home1 from "./Component/home/Home1"
import Home from "./Component/home/Home"
import Signup from './Component/start/Signup'
import Signin from './Component/start/Signin'
import Info from './Component/info/info'
import Newtrips from './Component/trips/NewTrips'
import Pay from './Component/pay/Pay'
import About from './Component/about/About'
import ExistingTrips from './Component/eTrips/ExistingTrips'
import SearchTrips from './Component/eTrips/SearchTrips'




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
                <Route path='/searshTrips' element={<SearchTrips/>} />
                <Route path='/existtrips' element={<ExistingTrips/>} />
                <Route path='/pay' element={<Pay/>} />
                <Route path='/about' element={<About/>} />
                
                
            </Routes>

        </>
    )
}
export default App