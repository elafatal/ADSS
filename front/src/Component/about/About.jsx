import * as React from "react";
import axios from 'axios' 
import './About.css'

const About = () => {

    return(
        <>
        <div className="aboutall">
        <div className="aboutheading">
            <h1>درباره ما</h1>
            

        </div>
        <div className="aboutcontainer">
            <section className="about">
                
                <div className="about-content">
                    {/* <h2>snapp savaran mazandaran</h2> */}
                    <div className="about-image" style={{textAlign : 'center'}}>
                  <img  style ={{width:'200px'}} src="https://cdn-icons-png.flaticon.com/512/4963/4963835.png" />
                </div >
                    <p style={{backgroundColor : 'rgba(220, 213, 242,0.5)' , color : ' black'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet ad temporibus itaque molestiae minus tenetur neque laboriosam eveniet delectus aliquid unde dicta quidem quia iusto, ipsam quasi cupiditate dolore asperiores. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quae id dolorum voluptates ea ut adipisci nam accusamus eius, ad qui, fuga assumenda voluptatibus nulla tempore ratione, ipsum provident corporis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis minima tempora neque et quam porro tenetur quidem possimus vero saepe dolores, officia, consectetur ipsam, praesentium nam aut. Illo, quibusdam placeat!Lorem</p>
                    <a href="start" className="read-more"> back to Home</a>
                
                </div>

            </section>
        </div></div>
        
        </>
    )
}

export default About