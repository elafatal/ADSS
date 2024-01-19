import "../eTrips/ExistingTrips.css"
import logo from '../eTrips/img/edit.jpg';
import logo1 from '../eTrips/img/search.png';
import logo2 from '../eTrips/img/car.jpg';
import logo3 from '../eTrips/img/clock.jpg';
import logo4 from '../eTrips/img/calendar.jpg';
import logo5 from '../eTrips/img/male.jpg';
import logo6 from '../eTrips/img/female.jpg';


const ExistingTrips = () => {
    
    const response={
        "data": [
                { 
                "id": 0 ,
                "names" : ["محمدرضا شجریان","مهنا حسنی","حسین بهزادی"," یحیی گلمحمدی "],
                "time" : "15:00"
                },
                {
                "scity" : "بابل",
                "dcity" : "ساری",
                "id" : 1,
                "names": ["محمدرضا","مهنا حسنی"],
                "time" : "12:00"
                },
                {
                "id": 2,
                "names" : ["رضا","مهنا حسنی", "حسین بهزادی"],
                "time" : "8:00"
                }
        ]
    }
    let users = [];
    let m=0
    let t =4
    console.log(response.data.length) 
    response.data.forEach(item => {
        m=item.names.length
        
     });
     const member = (n) => {
        users=[]
        for (let i = 0; i <4; i++) {
            users.push(
                <div className="user">
                    <img src={logo5} alt="logo5"/>
                    <p style={{fontSize : "22px"}}>{ response.data[n].names[i]===undefined ? "جای خالی" :response.data[n].names[i]}</p>
                    {console.log(response.data[n].names[i])}
                </div>
        );}
   
     }
    
     
    return (
        <>
        <ul>
        {response.data.map((trips, index) => (
          <li key={index}><div className="container about">
          <div className="card-container">
              <div className="inner-card">
                  <div className="header-bg"></div>
                  <div className="card-header11">
                      <div className="car-icon11">
                          <img src={logo2} alt="logo2"/>
                          <p>nader street-sari <br/>
                          nooshirvani-babol</p>
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
                      <button style={{width: "150px" , height : "60px", marginTop : "30px" , fontSize : "20px"}} >ورود به سفر</button>
                    
                  </div>
              </div>
          </div>
          
          
      </div></li>
        ))}
      </ul>
    
        </>
    )
}

export default ExistingTrips