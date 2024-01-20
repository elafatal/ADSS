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
                    <p style={{backgroundColor : 'rgba(220, 213, 242,0.5)' , color : ' black'}}>
در سرویس ما، شما نیازی به تنهایی ندارید. با استفاده از فناوری ما، شما می‌توانید با دانشجویان دیگر که به همین مقصد سفر می‌روند ارتباط بگیرید و هزینه سفر را به اشتراک بگذارید.

ما با توجه به اینکه چگونه توانایی ما را برای کاهش هزینه های سفر استفاده کنید، فرصت سفر شادتر و ارزان تری را برای شما فراهم می‌کنیم.

با کلیک کردن روی دکمه "ثبت نام"، شروع کنید و همراهی با ما را تجربه کنید. امیدواریم که با ما همراه شوید</p>
                    <a href="start" className="read-more">  بازگشت به منوی اصلی</a>
                
                </div>

            </section>
        </div></div>
        
        </>
    )
}

export default About