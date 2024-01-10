import * as React from "react";
import axios from 'axios' 
import '../about/About.css'
import "../home/Home.css"

const Home1 = () => {

    return(
        <>
        <div className="abutall">
        <div className="aboutheading">
            <h1>همسفریاب</h1>
            <p> سلام فقیر! شنیدم دنبال همسفر میگردی تا کرایه ی کمتری بدی : )</p>

        </div>
        <div className="aboutcontainer">
            <section className="about">
                <div className="about-image">
                  <img src="https://img.freepik.com/free-photo/close-up-shot-taxi-sign-warm-colours-sunset-with-bokeh-lights-background_181624-54985.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704672000&semt=ais" />
                </div>
                <div className="about-content">
                    <h2>snapp savaran mazandaran</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet ad temporibus itaque molestiae minus tenetur neque laboriosam eveniet delectus aliquid unde dicta quidem quia iusto, ipsam quasi cupiditate dolore asperiores. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quae id dolorum voluptates ea ut adipisci nam accusamus eius, ad qui, fuga assumenda voluptatibus nulla tempore ratione, ipsum provident corporis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis minima tempora neque et quam porro tenetur quidem possimus vero saepe dolores, officia, consectetur ipsam, praesentium nam aut. Illo, quibusdam placeat!Lorem</p>
                    <a href="signup" className="read-more"> get started</a>
                
                </div>

            </section>
        </div></div>
        
        </>
    )
}

export default Home1