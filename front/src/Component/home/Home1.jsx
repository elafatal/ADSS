import * as React from "react";
import axios from 'axios' 
import '../about/About.css'
import "../home/Home.css"
import logo from "./01.jpg"

const Home1 = () => {

    return(
        <>
        <div className="abutall">
        <div className="aboutheading">
            <h1>همسفریاب</h1>
            <p style={{paddingRight : '15px' , paddingLeft : '15px' }}>  دنبال همسفر میگردید تا سفر اقتصادی تری داشته باشید؟</p>

        </div>
        <div className="aboutcontainer">
            <section className="about">
                <div className="about-image">
                <img src={logo} alt="logo" />
                </div>
                <div className="about-content">
                    <h2>چرا همسفریاب؟</h2>
                    <p>به جامعه ما خوش آمدید!

در سرویس ما، شما نیازی به تنهایی ندارید. با استفاده از فناوری ما، شما می‌توانید با دانشجویان دیگر که به همین مقصد سفر می‌روند ارتباط بگیرید و هزینه سفر را به اشتراک بگذارید.

ما با توجه به اینکه چگونه توانایی ما را برای کاهش هزینه های سفر استفاده کنید، فرصت سفر شادتر و ارزان تری را برای شما فراهم می‌کنیم.

با کلیک کردن روی دکمه "ثبت نام"، شروع کنید و همراهی با ما را تجربه کنید. امیدواریم که با ما همراه شوید</p>
                    <a href="signup" className="read-more">  ورود / ثبت نام</a>
                
                </div>

            </section>
        </div></div>
        
        </>
    )
}

export default Home1