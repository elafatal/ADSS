import React, { useState } from "react";
import "./Admin.css"
import FormInput from '../start/FormInput'
import axios from 'axios'
import { useEffect } from 'react'
import logo5 from '../admin/user.jpg';
import Cookies from 'universal-cookie'; 

function Admin() {
  const [isActive, setActive] = useState(false);
  const [user, setUser] = useState([]);
  const [travels, setTravels] = useState([]);
  const [values, setValues] = useState({
    user_id: ""
  });

  


  const GetUser = async () => {
      const response = await axios.get('http://127.0.0.1:8000/travels/admin/users');
      let data = [...user]
        data = response.data.data
      setUser(data);
     
  };
 useEffect(() => {
    console.log(user);
  }, [user]); 

  const GetTrips = async()=>{
    const cookies = new Cookies();
    const response = await axios.get('http://127.0.0.1:8000/travels/admin/travels/',{params:values} , {
      headers: {
        Authorization: `Bearer ${ cookies.get("access_token")}`
      }} );
      let data = [...user]
      data = response.data.data
    setTravels(data);

    console.log(response);
  }

  useEffect(() => {
    console.log("shashhhhhhhhhhh",travels);
  }, [travels]); 


  useEffect(() => {
    console.log(values);
   }, [values]);



  const onChange = (e) => {
    setValues({ ...values, ["user_id"]: e.target.value });
  };

  const handleCancel =async(id)=>{
    const tok = { "travel_id": id };
    const response = await axios.delete('http://127.0.0.1:8000/travels/admin/cancel/',{params:tok} );
    console.log(response);


  }


 
  const toggleclassName = () => {
    setActive(!isActive);
  };
  return (
    <div className="App">
  
      <section id="sidebar"  className={isActive ? 'hide': null} >
        <a href="#" className="brand">
          <i className='bx bxs-smile'></i>
          <div className="text">Admin Panel</div>
        </a>
        <ul className="side-menu top">
          <li style={{height: "80px"}} className="active">
            <a href="#">
              <i className='bx bxs-dashboard' ></i>
              <button style={{backgroundColor:"white", color : "black"}} className=".read-more">داشبورد</button>
            </a>
          </li>
          <li style={{height: "80px"}} className="active">
            <a href="#">
              <i className='bx bxs-dashboard' ></i>
              <button style={{backgroundColor:"white", color : "black"}} onClick={GetUser} className=".read-more">کاربران</button>
            </a>
          </li>
          <li style={{height: "80px"}} className="active">
            <a href="#">
              <i className='bx bxs-dashboard' ></i>
              <button style={{backgroundColor:"white", color : "black"}} onClick={GetTrips} className=".read-more">سفر ها</button>
              <FormInput style={{width : "40px"}}
            onChange={onChange}
          />
            </a>
          </li>
          
        </ul>
        
      </section>
     
      <section id="content">
       
        <nav className="d">
          <i  className='bx bx-menu'  onClick={toggleclassName}  ></i>
          <a href="#" className="nav-link">Categories</a>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <a style={{marginLeft : "12px"}} > <i className='bx bx-search' ></i></a>
            </div>
          </form>
          <a href="#" className="notification">
            <i className='bx bxs-bell' ></i>
            <div className="num">8</div>
          </a>
          <a href="#" className="profile">
            <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
          </a>
        </nav>
      
        <main>
          <div  className="head-title">
            <div className="left">
              <h1 style={{color:"white"}}>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li><i className='bx bx-chevron-right' ></i></li>
                <li>
                  <a className="active" href="#">Home</a>
                </li>
              </ul>
            </div>
            <a href="#" className="btn-download">
              <i className='bx bxs-cloud-download' ></i>
              <div className="text">Download PDF</div>
            </a>
          </div>

       

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                <i className='bx bx-search' ></i>
                <i className='bx bx-filter' ></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>کاربر</th>
                    <th>شماره دانشجویی</th>
                    <th>ID</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                    <img style={{borderRadius: "50%"}} src={logo5} alt="logo2"/>
                      <p>{(user[0])===undefined ? "کاربر1": user[0].name}</p>
                    </td>
                    <td>{(user[0])===undefined ? "1شماره دانشجویی": user[0].student_number}</td>
                    <td>{(user[0])===undefined ? "ID": user[0].id}</td>
                  </tr>
                  <tr>
                    <td>
                    <img style={{borderRadius: "50%"}} src={logo5} alt="logo2"/>
                      <p>{(user[1])===undefined ? "کاربر2": user[1].name}</p>
                    </td>
                    <td>{(user[1])===undefined ? "شماره دانشجویی2": user[1].student_number}</td>
                    <td>{(user[1])===undefined ? "ID": user[1].id}</td>
                  </tr>
                  <tr>
                    <td>
                    <img style={{borderRadius: "50%"}} src={logo5} alt="logo2"/>
                      <p>{(user[2])===undefined ? "کاربر3": user[2].name}</p>
                    </td>
                    <td>{(user[2])===undefined ? "شماره دانشجویی3": user[2].student_number}</td>
                    <td>{(user[2])===undefined ? "ID": user[3].id}</td>
                  </tr>
                  <tr>
                    <td>
                    <img style={{borderRadius: "50%"}} src={logo5} alt="logo2"/>
                      <p>{(user[3])===undefined ? "کاربر4": user[3].name}</p>
                    </td>
                    <td>{(user[3])===undefined ? "شماره دانشجویی4": user[3].student_number}</td>
                    <td>{(user[3])===undefined ? "ID": user[4].id}</td>
                  </tr>
                  <tr>
                    <td>
                    <img style={{borderRadius: "50%"}} src={logo5} alt="logo2"/>
                      <p>{(user[4])===undefined ? "کاربر5": user[4].name}</p>
                    </td>
                    <td>{(user[4])===undefined ? "شماره دانشجویی5": user[4].student_number}</td>
                    <td>{(user[4])===undefined ? "ID": user[4].id}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="todo">
             <div class="head">
                <h3>Todos</h3>
                <i class='bx bx-plus' ></i>
                <i class='bx bx-filter' ></i>
              </div>
              <ul class="todo-list">
              <button onClick={(m)=>handleCancel(travels[0].id)} style={{width: "20px",height:"20px"}}></button>
                <li class="completed">
                <p>{(travels[0])===undefined ? " " : travels[0].origin_city }</p>
                <p>{(travels[0])===undefined ? "  " : " : "}</p>
                <p>{(travels[0])===undefined ? "  " : travels[0].origin_location }</p>
                <p>{(travels[0])===undefined ? "     " : " ==>>" }</p>
                <p>{(travels[0])===undefined ? " " : travels[0].destination_city }</p>
                <p>{(travels[0])===undefined ? "  " : " :"}</p>
                <p>{(travels[0])===undefined ? " " : travels[0].destination_location }</p>
                </li>
                <button onClick={(m)=>handleCancel(travels[1].id)} style={{width: "20px",height:"20px"}}></button>
                <li class="completed">
                <p>{(travels[1])===undefined ? " " : travels[1].origin_city }</p>
                <p>{(travels[1])===undefined ? "  " : " : "}</p>
                <p>{(travels[1])===undefined ? "  " : travels[1].origin_location }</p>
                <p>{(travels[1])===undefined ? "     " : "==>>" }</p>
                <p>{(travels[1])===undefined ? " " : travels[1].destination_city }</p>
                <p>{(travels[1])===undefined ? "  " : " : "}</p>
                <p>{(travels[1])===undefined ? " " : travels[1].destination_location }</p>
                </li>
                <button onClick={(m)=>handleCancel(travels[2].id)} style={{width: "20px",height:"20px"}}></button>
                <li class="not-completed">
                <p>{(travels[2])===undefined ? " " : travels[2].origin_city }</p>
                <p>{(travels[2])===undefined ? "  " : ":"}</p>
                <p>{(travels[2])===undefined ? "  " : travels[2].origin_location }</p>
                <p>{(travels[2])===undefined ? "     " : " ==>> " }</p>
                <p>{(travels[2])===undefined ? " " : travels[2].destination_city }</p>
                <p>{(travels[2])===undefined ? "  " : ":"}</p>
                <p>{(travels[2])===undefined ? " " : travels[2].destination_location }</p>
                </li>
                <button onClick={(m)=>handleCancel(travels[3].id)} style={{width: "20px",height:"20px"}}></button>
                <li class="completed">
                <p>{(travels[3])===undefined ? " " : travels[3].origin_city }</p>
                <p>{(travels[3])===undefined ? "  " : ":"}</p>
                <p>{(travels[3])===undefined ? "  " : travels[3].origin_location }</p>
                <p>{(travels[3])===undefined ? "     " : " ==>> " }</p>
                <p>{(travels[3])===undefined ? " " : travels[3].destination_city }</p>
                <p>{(travels[3])===undefined ? "  " : ":"}</p>
                <p>{(travels[3])===undefined ? " " : travels[3].destination_location }</p>
                </li>
                <button onClick={(m)=>handleCancel(travels[4].id)} style={{width: "20px",height:"20px"}}></button>
                <li class="not-completed">
                <p>{(travels[4])===undefined ? " " : travels[4].origin_city }</p>
                <p>{(travels[4])===undefined ? "  " : "=>"}</p>
                <p>{(travels[4])===undefined ? "  " : travels[4].origin_location }</p>
                <p>{(travels[4])===undefined ? "     " : " : " }</p>
                <p>{(travels[4])===undefined ? " " : travels[4].destination_city }</p>
                <p>{(travels[4])===undefined ? "  " : "=>"}</p>
                <p>{(travels[4])===undefined ? " " : travels[4].destination_location }</p>
                </li>
              </ul>
            </div>
          </div>
        </main>
       
      </section>
     
    </div>
  );
}

export default Admin;