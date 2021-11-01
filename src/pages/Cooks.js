import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
  Collapse,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState, useRecoilValue } from "recoil";
import Store from "../store";
import NavBar from "../components/navBar";
import cooksData from "../store";
import "./styles/Cooks.css";

const { subscription: Subscription, isLoggedIn: loggedIn } = Store;

const useCookStyles = makeStyles({
  grid: {
    paddingLeft: "15vh",
  },
});

const Cooks = () => {
  const params = useParams();
  const History = useHistory();
  const state = params.state;
  const styles = useCookStyles();
  const reqCooks = useRecoilValue (cooksData.currCook);
  console.table(reqCooks)

  const contentCreator = (name, region, experience, specialization) =>
    `${name} hails from ${region}. He has ${experience} years of experience in cooking and specilises in ${specialization} dishes.`;

  return (
    <div className="CooksPage">
      <NavBar active="Community" display={true}  Color="#FBFEFD" />
      <div className="cooksHeader">
        <h1>Select a Cook</h1>
      </div>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={styles.grid}
      >
        {reqCooks.map((cook) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <Carder
              name={cook.Name}
              ratings={cook.Ratings}
              image={cook.Profile_Image}
              History={History}
              id={cook.id}
              cook={cook}
              description={contentCreator(
                cook.Name,
                cook.Region,
                cook.Year_Of_Experience,
                cook.Speciality
              )}
            />{" "}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Cooks;

const useStyles = makeStyles({
  body: {
    maxWidth: 250,
    fontFamily: `'Poppins', sans-serif`,
    borderRadius: 0,
    //  backgroundColor: 'rgba(251,254,253 ,0.1)'
  },
 /*flex: {
      // ignore no-useless-computed-key
    ["@media (max-width:500px)"]: {
      // eslint-disable-line no-useless-computed-key
      //        display: 'flex'
    },
  }, */

  image: {
    height: 250,
    //   objectToFit: "cover"
  },
  btn: {
    backgroundColor: "#f36f27",
    color: "#fff",
    boxShadow: "none",
    marginLeft: "55%",
    borderRadius: 0,
  },
  btns: {
    width: "100%",
    backgroundColor: "#f36f27",
    color: "#fff",
    boxShadow: "none",
    borderRadius: 0,
    marginTop: "10px",
  },
});

const Carder = (props) => {
  //  const History = useHistory();
  const styles = useStyles();
  const [subscription, setSubscription] = useRecoilState(Subscription);
  const [, setCook] = useRecoilState (cooksData.selectedCook);
  const [open, setOpen] = useState(false);
  const handleChange = (e) => setSubscription(e.target.value);
  const handleClick = ()=>{
    setCook (props.cook)
    props.History.push(`/cook/${props.id}`);

  }
  const isLoggedIn = useRecoilValue(loggedIn);
  return (
    <div id={props.Id}>
      <Card
        className={styles.body}
        onClick={handleClick}
      >
        <CardActionArea className={styles.flex}>
          <CardMedia
            image={props.image}
            className={styles.image}
            title={props.name}
          />
          <CardContent>
            <h4 className="card-title">{props.name}</h4>
            <p className="card-body">{props.description}</p>
            <div className="cook-ratings">Ratings: {props.ratings}/5</div>
            <Button
              className={styles.btn}
              variant="contained"
              style={{
                backgroundColor: !open ? "#f36f27" : "grey",
                display: "none",
              }}
              onClick={() => setOpen(!open)}
            >
              {!open ? "Select" : "Unselect"}
            </Button>
            <Collapse in={open}>
              <form className="forms">
                <InputLabel id="subscription">Type of Subscription</InputLabel>
                <FormControl variant="outlined" className={styles.formControl}>
                  <Select
                    labelId="subscription"
                    value={subscription}
                    onChange={handleChange}
                  >
                    <MenuItem value={"month"}>Monthly</MenuItem>
                    <MenuItem value={"week"}>Weekly</MenuItem>
                    <MenuItem value={"daily"}>Daily</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  className={styles.btns}
                  variant="contained"
                  onClick={() =>
                    !isLoggedIn
                      ? props.History.push("/login")
                      : props.History.push("/invoice")
                  }
                >
                  Proceed to Checkout
                </Button>
              </form>
            </Collapse>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
