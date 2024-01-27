import "../eTrips/Trips.css"
import axios from 'axios'
import Cookies from 'universal-cookie';
import {useNavigate} from "react-router-dom"
import logo from '../eTrips/img/edit.jpg';
import logo1 from '../eTrips/img/search.png';
import logo2 from '../eTrips/img/car.jpg';
import logo3 from '../eTrips/img/clock.jpg';
import logo4 from '../eTrips/img/calendar.jpg';
import logo5 from '../eTrips/img/male.jpg';
import logo6 from '../eTrips/img/female.jpg';
import { useEffect } from 'react'
import {  useState } from 'react'


const Mytrips = () => {
    const [loc, setLoc] = useState([]);
    const [finish, setFinish]=useState(false)
    // {"data":{"id":3,"origin_city":"Babol","origin_location":"dar asli","destination_city":"Sari","destination_location":"meydun Imam","situation":"1","travelers":[{"id":2,"firstname":"","lastname":""},{"id":5,"firstname":"","lastname":""}]}}

    const getActiveTrips =async () => {
        const cookies = new Cookies();
        const response = await axios.get('http://127.0.0.1:8000/travels/active_travel/', {
            headers: {
              Authorization: `Bearer ${ cookies.get("access_token")}`
            }} );
        setLoc(response.data.data);
    }
    useEffect(() => {
        getActiveTrips();
      }, []); 
      useEffect(() => {
        console.log(loc);
      }, [loc]);

      
    let users = [];
    
     const member = (n) => {
        users=[]
        for (let i = 1; i <=4; i++) {
            users.push(
                <div className="user">
                    <img src={logo5} alt="logo5"/>
                   
                    <p style={{fontSize : "22px"}}>{ loc[n].travelers[i]===undefined ? "جای خالی" :loc[n].travelers[i].name}</p>
                </div>
        );}
       
   
     }

     const handleCancel=async () =>{
        const cookies = new Cookies();
        const response = await axios.delete('http://127.0.0.1:8000/travels/cancel/', {
            headers: {
              Authorization: `Bearer ${ cookies.get("access_token")}`
            }} );
        console.log(response);
            
     }
    
     const handleStart =async () =>{
        const cookies = new Cookies();
        setFinish(true)
        const response = await axios.put('http://127.0.0.1:8000/travels/start/', {
            headers: {
              Authorization: `Bearer ${ cookies.get("access_token")}`
            }} );
        console.log(response);
            
     }
     const handleFinish =async () =>{
        const cookies = new Cookies();
        setFinish(true)
        const response = await axios.put('http://127.0.0.1:8000/travels/finish/', {
            headers: {
              Authorization: `Bearer ${ cookies.get("access_token")}`
            }} );
            console.log(response);
     }
     
    return (
        <>
        
      <div style={{  height: "100vh"}}  className="yoho">
       
      <ul>{(loc === undefined) ? <p style={{fontSize: "50px"}}>سفر فعالی برای شما یافت نشد</p> : loc.map((trips, index) => (
          <li style={{display : "flex" , margin : "auto"}} key={index}><div className="container about">
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
                      <button onClick={handleCancel} style={{width: "80px" , height : "60px", marginTop : "30px" , fontSize : "20px" ,marginRight : "5px"}} >لغو سفر</button>
                    {finish===true ? <button onClick={handleFinish} style={{width: "80px" , height : "60px" , fontSize : "20px"}} >  اتمام </button> : 
                    <button onClick={handleStart} style={{width: "80px" , height : "60px" , fontSize : "20px"}} >حرکت   </button>
                     }
                      
                  </div>
              </div>
          </div>
          
          
      </div></li>
        )) }
        
      </ul>
      </div>
        
    
        </>
    )
}

export default Mytrips