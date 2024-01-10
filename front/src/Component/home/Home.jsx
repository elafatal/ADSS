import "../home/Home.css"
import { useNavigate} from "react-router-dom"
import { Component } from "react";


class Home extends Component{

    state={clicked : false}
    handleClick = ()=>{
        this.setState(prevState => ({ clicked: !prevState.clicked }));
    }
    
    render(){
        return(<>
           <nav className="navbarItems" > <a><svg id="logo-85" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="ccustom" fill-rule="evenodd" clip-rule="evenodd" d="M10 0C15.5228 0 20 4.47715 20 10V0H30C35.5228 0 40 4.47715 40 10C40 15.5228 35.5228 20 30 20C35.5228 20 40 24.4772 40 30C40 32.7423 38.8961 35.2268 37.1085 37.0334L37.0711 37.0711L37.0379 37.1041C35.2309 38.8943 32.7446 40 30 40C27.2741 40 24.8029 38.9093 22.999 37.1405C22.9756 37.1175 22.9522 37.0943 22.9289 37.0711C22.907 37.0492 22.8852 37.0272 22.8635 37.0051C21.0924 35.2009 20 32.728 20 30C20 35.5228 15.5228 40 10 40C4.47715 40 0 35.5228 0 30V20H10C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM18 10C18 14.4183 14.4183 18 10 18V2C14.4183 2 18 5.58172 18 10ZM38 30C38 25.5817 34.4183 22 30 22C25.5817 22 22 25.5817 22 30H38ZM2 22V30C2 34.4183 5.58172 38 10 38C14.4183 38 18 34.4183 18 30V22H2ZM22 18V2L30 2C34.4183 2 38 5.58172 38 10C38 14.4183 34.4183 18 30 18H22Z" fill="#5417D7"></path></svg></a>
                 <div >
                 <ul id="navbar" className={this.state.clicked ? "navbar active" : "navbar"}>
                     <li><a className="active" href="Home"><i className="fa-solid fa-house"></i> Home</a></li>
                     <li><a href="info"><i className="fa-solid fa-user-pen"></i> edit profile </a></li>
                     <li><a href="newtrip"> <i className="fa-solid fa-taxi"></i> create trip</a></li>
                     <li><a href="#"><i className="fa-solid fa-users"></i> existing trips</a></li>
                     <li><a href="about"> <i className="fa-solid fa-circle-info"></i> about us</a></li>
                     <li><a href="pay"> <i class="fa-regular fa-credit-card"></i> Payment</a></li>
                     <li><a href="#">i'm driver</a></li>
                 </ul>
                 </div>
                    <div id="mobile" onClick={this.handleClick}>
                        <i id="bar" className={this.state.clicked ? ("fas fa-times") : "fas fa-bars"}></i>
                    </div>
                </nav>
             

            <div className="aboutall">
                    <div className="aboutheading">
                        <h1>همسفریاب</h1>
                        <p>sapiente vel ipsam accusantium. Molestias culpa cupiditate, obcaecati asperiores voluptatem nemo quis, consequatur quo necessitatibus fugiat, blanditiis maxime ex minus!</p>

                    </div>
                    <div className="aboutcontainer">
                        <section className="about">
                            <div className="about-image">
                            <img src="https://img.freepik.com/free-photo/close-up-shot-taxi-sign-warm-colours-sunset-with-bokeh-lights-background_181624-54985.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704672000&semt=ais" />
                            </div>
                            <div className="about-content">
                                <h2>snapp savaran mazandaran</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet ad temporibus itaque molestiae minus tenetur neque laboriosam eveniet delectus aliquid unde dicta quidem quia iusto, ipsam quasi cupiditate dolore asperiores. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quae id dolorum voluptates ea ut adipisci nam accusamus eius, ad qui, fuga assumenda voluptatibus nulla tempore ratione, ipsum provident corporis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis minima tempora neque et quam porro tenetur quidem possimus vero saepe dolores, officia, consectetur ipsam, praesentium nam aut. Illo, quibusdam placeat!Lorem</p>
                            
                            </div>

                        </section>
                    </div></div>
        </>
             
         )
    }
   

}
export default Home