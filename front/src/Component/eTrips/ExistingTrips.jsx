import "../eTrips/Trips.css"
import {useNavigate} from "react-router-dom"
import logo from '../eTrips/img/edit.jpg';
import logo1 from '../eTrips/img/search.png';
import logo2 from '../eTrips/img/car.jpg';
import logo3 from '../eTrips/img/clock.jpg';
import logo4 from '../eTrips/img/calendar.jpg';
import logo5 from '../eTrips/img/male.jpg';
import logo6 from '../eTrips/img/female.jpg';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios'


const ExistingTrips = (props) => {
    
    const dataArray = props.data;
     const location = useLocation();
  const data = location.state?.data || [];

    console.log('data:', data)
    // {"data":{"id":3,"origin_city":"Babol","origin_location":"dar asli","destination_city":"Sari","destination_location":"meydun Imam","situation":"1","travelers":[{"id":2,"firstname":"","lastname":""},{"id":5,"firstname":"","lastname":""}]}}
    const handleJoin =async (id) =>{
        const tok = { "travel_id": id };
        const cookies = new Cookies();
        const response = await axios.post('http://127.0.0.1:8000/travels/join/',tok, {
          headers: {
            Authorization: `Bearer ${ cookies.get("access_token")}`
          }} );

        console.log(response);
        console.log('gooooooh',id);
    }

    let users = [];
    
     const member = (n) => {
        users=[]
       
        for (let i = 0; i <4; i++) {
            users.push(
                <div className="user">
                    <img src={logo5} alt="logo5"/>
                   
                    <p style={{fontSize : "22px"}}>{ data[n].travelers[i]===undefined ? "جای خالی" :data[n].travelers[i].name}</p>
                </div>
        );}
        console.log(dataArray);
     }
    
     
    return (
        <>
        
      <div  className="yoho">
        
      <ul>
        {data.map((trips, index) => (
          <li key={index}><div className="container about">
          <div className="card-container">
              <div className="inner-card">
                  <div className="header-bg"></div>
                  <div className="card-header11">
                      <div className="car-icon11">
                          <img src={logo2} alt="logo2"/>
                          <p>{trips.origin_location}-{trips.origin_city} <br/>
                          {trips.destination_location} -<p>{trips.destination_city}</p></p>
                      </div>
                      <div className="time">
                          <img src={logo3} alt="logo3"/>
                          <p>{trips.time}</p>
                      </div>
                  </div>

                  <div className="card-list">
                  {member(index)}
                  {users}
                  </div>
                  <div className="ask-box">
                      <p></p>
                      <button onClick={(e)=>handleJoin(trips.id)} style={{width: "150px" , height : "60px", marginTop : "30px" , fontSize : "20px"}} >ورود به سفر</button>
                    
                  </div>
              </div>
          </div>
          
          
      </div></li>
        ))}
      </ul>
      </div>
        
    
        </>
    )
}

export default ExistingTrips