import React from "react";
//import { Link } from "react-router-dom";
import NavBar from "../components/navBar";
import thali from "../assets/img/pngegg.png";
import Post from "../assets/img/My Post (2).png";
import Post11 from "../assets/img/My Post (11).png";
import cook2 from "../assets/img/cook2.png";
import cook3 from "../assets/img/cook3 Copy.png";
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import "./styles/Home.css";

const Home = () => {
  const History = useHistory ();
  return (
    <div className="Home">
      <NavBar active="Home" Color="#FBFEFD" />
      <section className="home" id="home">
        <div className="home__container bd-container bd-grid">
          <div className="home__data">
            <h1 className="home__title">
              Subscription based{" "}
              <strong style={{ color: "orange" }}>Meals</strong> made <br />
              by cooks from your{" "}
              <strong style={{ color: "orange" }}>states</strong>
              <br />
              delivered at your{" "}
              <strong style={{ color: "orange" }}>doorstep.</strong>
            </h1>
            <br />
            <h3 className="home__subtitle">
              {" "}
              At <strong style={{ color: "#f36f27" }}>'Foodey'</strong> we have
              Cooks that come from different parts of the
              <strong style={{ color: "#f36f27" }}>country</strong> who cook
              meals with homemade flavours , and we get it delivered at your
              doorstep.
            </h3>
          </div>
          <img src={thali} alt="" className="home__img"></img>
        </div>
      </section>

      <section className="join-Community">
        <Button style={{background: "orange", color: "white"}} onClick={()=>History.push("/community")}>Join our Community</Button>
      </section>

      <section className="about section bd-container" id="about">
        <div className="about__container  bd-grid">
          <div className="about__data">
            <p className="about__description ">
              <strong style={{ color: "#f36f27" }}>Selection :</strong>
              <br />
              Select a Cook from our Cloud community that suits your meal
              preferences.
            </p>
            <p className="about__description ">
              <strong style={{ color: "#f36f27" }}>Subscription :</strong>
              <br />
              After checking the availability of slots for the cook. Select a
              weekly/monthly subscription as per your requirement.
            </p>
            <p className="about__description ">
              <strong style={{ color: "#f36f27" }}>
                Sorting and Delivery:
              </strong>
              <br />
              Everyday before 9 am.
              <br /> Select your ideal amount of carbs(Roti/Rice) and any two
              main course items from the 4 options available, which will be
              offered by the cook along with Dal, salad &amp; a desert.
              <br /> And then get your food delivered everyday.
            </p>
          </div>
          <img
            src={Post}
            alt=""
            className="about__img"
            width={600}
            height={600}
          />
        </div>
      </section>

      <section className="services section bd-container" id="services">
        <div className="services__container  bd-grid">
          <div className="services__content">
            <img
              style={{ marginTop: "18px" }}
              src={Post11}
              alt=""
              width={100}
              height={100}
            />
            <h3 className="services__title"> Community of Cooks: </h3>
            <p className="services__description">
              A Cloud based co-working environment where cooks from different
              parts of the country can cook and get their food delivered to the
              customers and they can expect a better sense of job security and
              growth.
            </p>
          </div>

          <div className="services__content">
            <img src={cook2} alt="" width={150} height={150} />
            <h3 className="services__title">Home like food:</h3>
            <p className="services__description">
              The cooks will be hired from different parts of the country to
              fulfill everyday meal needs of the customer based on the customers
              regional preference.
            </p>
          </div>

          <div className="services__content">
            <img
              style={{ marginTop: "36px" }}
              src={cook3}
              alt=""
              width="150"
              height="100"
            />

            <h3 className="services__title">Door-to-Door Delivery:</h3>
            <p className="services__description">
              We provide hygienic door-to-door service for our customers
              straight from our Cloud Kitchen.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer section bd-container">
        <div className="footer__container bd-grid">
          <div className="footer__content">
            <a href="#" className="footer__logo">Foodey</a>
            <span className="footer__description">Cloud Resturants</span>
            <div>
              {/* <a href="#" class="footer__social"><i class='bx bxl-facebook'></i></a> */}
              <a href={"https://instagram.com/foodey_cloud?utm_medium=copy_link"} className="footer__social"><i className="bx bxl-instagram" /></a>
              {/* <a href="#" class="footer__social"><i class='bx bxl-twitter'></i></a> */}
            </div>
          </div>
          <div className="footer__content">
            <h3 className="footer__title">Contact us</h3>
            <ul>
              <li>E-Cell,Ramaiah Institute of Technology</li>
              <li>MSR Nagar, Bangalore-560054,
                <br />INDIA
              </li>
              <li>Phone no: 8197244194/9258464052</li>
              <li>EMAIL- info@foodey.co.in</li>
            </ul>
          </div>
        </div>
        <p className="footer__copy">© Copyrights All right reserved -- Foodey from 2021</p>
      </footer>
    </div>
  );
};

export default Home;
