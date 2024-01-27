import React, { useState } from "react";
import "./Admin.css"
import logo5 from '../admin/male.jpg';
function Admin() {
  const [isActive, setActive] = useState(false);

  const response={
    "data": [
        {
            "card_number": "6037997404365943",
            "price": 16000,
            "pay_in_cash": false,
            "user": "mamad arab"
        },
        {
            "card_number": "6037997404365943",
            "price": 16000,
            "pay_in_cash": false,
            "user": "younes ebrahimi"
        },
        {
            "card_number": "6037997404365943",
            "price": 16000,
            "pay_in_cash": false,
            "user": "sepehr"
        },
        {
            "card_number": "6037997404365943",
            "price": 16000,
            "pay_in_cash": false,
            "user": "kazemi",        }
    ]
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
          <li className="active">
            <a href="#">
              <i className='bx bxs-dashboard' ></i>
              <p className="text">Dashboard</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i className='bx bxs-shopping-bag-alt' ></i>
              <p className="text">My Store</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i className='bx bxs-doughnut-chart' ></i>
              <p className="text">Analytics</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i className='bx bxs-message-dots' ></i>
              <p className="text">Message</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i className='bx bxs-group' ></i>
              <p className="text">Team</p>
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
              <h1>Dashboard</h1>
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
                    <th>User</th>
                    <th>Date Order</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2023</td>
                    <td><div class="status completed">Completed</div></td>
                  </tr>
                  <tr>
                    <td>
                      <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2023</td>
                    <td><div class="status pending">Pending</div></td>
                  </tr>
                  <tr>
                    <td>
                      <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2023</td>
                    <td><div class="status process">Process</div></td>
                  </tr>
                  <tr>
                    <td>
                      <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2023</td>
                    <td><div class="status pending">Pending</div></td>
                  </tr>
                  <tr>
                    <td>
                      <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2023</td>
                    <td><div class="status completed">Completed</div></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="todo">
            <img style={{borderRadius: "50%"}} src={logo5} alt="logo2"/>
            <p style={{marginTop:"25px", fontSize:"30px", display : "inline" , padding:"0px"}}> پنل ادمین  </p>
            </div>
          </div>
        </main>
       
      </section>
     
    </div>
  );
}

export default Admin;