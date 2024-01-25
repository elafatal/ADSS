import React, { useState } from "react";
import "./Admin.css"
function Admin() {
  const [isActive, setActive] = useState(false);
  const toggleclassName = () => {
    setActive(!isActive);
  };
  return (
    <div className="App">
  
      <section id="sidebar"  className={isActive ? 'hide': null} >
        <a href="#" className="brand">
          <i className='bx bxs-smile'></i>
          <span className="text">AdminHub</span>
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
        <ul className="side-menu">
          <li>
            <a href="#">
              <i className='bx bxs-cog' ></i>
              <p className="text">Settings</p>
            </a>
          </li>
          <li>
            <a href="#" className="logout">
              <i className='bx bxs-log-out-circle' ></i>
              <p className="text">Logout</p>
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
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
          </a>
        </nav>
      
        <main>
          <div className="head-title">
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
              <span className="text">Download PDF</span>
            </a>
          </div>

          <ul className="box-info">
            <li>
              <i className='bx bxs-calendar-check' ></i>
              <span className="text">
                <h3>1020</h3>
                <p>New Order</p>
              </span>
            </li>
            <li>
              <i className='bx bxs-group' ></i>
              <span className="text">
                <h3>2834</h3>
                <p>Visitors</p>
              </span>
            </li>
            <li>
              <i className='bx bxs-dollar-circle' ></i>
              <span className="text">
                <h3>$2543</h3>
                <p>Total Sales</p>
              </span>
            </li>
          </ul>


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
                    <td><span className="status completed">Completed</span></td>
                  </tr>
                  <tr>
                    <td>
                      <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2023</td>
                    <td><span className="status pending">Pending</span></td>
                  </tr>
                  <tr>
                    <td>
                      <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2023</td>
                    <td><span className="status process">Process</span></td>
                  </tr>
                  <tr>
                    <td>
                      <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2023</td>
                    <td><span className="status pending">Pending</span></td>
                  </tr>
                  <tr>
                    <td>
                      <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2023</td>
                    <td><span className="status completed">Completed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="todo">
              <div className="head">
                <h3>Todos</h3>
                <i className='bx bx-plus' ></i>
                <i className='bx bx-filter' ></i>
              </div>
              <ul className="todo-list">
                <li className="completed">
                  <p>Todo List</p>
                  <i className='bx bx-dots-vertical-rounded' ></i>
                </li>
                <li className="completed">
                  <p>Todo List</p>
                  <i className='bx bx-dots-vertical-rounded' ></i>
                </li>
                <li className="not-completed">
                  <p>Todo List</p>
                  <i className='bx bx-dots-vertical-rounded' ></i>
                </li>
                <li className="completed">
                  <p>Todo List</p>
                  <i className='bx bx-dots-vertical-rounded' ></i>
                </li>
                <li className="not-completed">
                  <p>Todo List</p>
                  <i className='bx bx-dots-vertical-rounded' ></i>
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