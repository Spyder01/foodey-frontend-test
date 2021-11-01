import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
} from "@material-ui/core";
import {getCookByState} from '../firebase/db';
import {useRecoilState} from 'recoil';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import NavBar from "../components/navBar";
import StateData from "../store/StateData";
import cooksData from "../store";
import "./styles/stateScreen.css";

const Styles = makeStyles({
  body: {
    maxWidth: 250,
    fontFamily: `'Poppins', sans-serif`,
    borderRadius: 0,
    //  height: 500
    ["@media (max-width:500px)"]: {
      // eslint-disable-line no-useless-computed-key
      display: "flex",
      justifyContent: "center",
    },
  },
  grid: {
    margin: "10vh 5vw 0 10vw",
    ["@media (max-width:500px)"]: {
      // eslint-disable-line no-useless-computed-key
      margin: 0,
      overFlowX: "hidden",
      paddingLeft: "15vw",
    },
  },

  image: {
    height: 250,
    //   objectToFit: "cover"
  },
});

const stateScreen = () => {
  const styles = Styles();

  return (
    <div className="stateScreen">
      <NavBar active="Community" display={true} Color="#FBFEFD" />
      <div className="statesHeader">
        <h1>Select a State of your choice</h1>
      </div>
      <Grid
        container
        spacing={3}
        className={styles.grid}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {StateData.map((state) => (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Carder
              title={state.title}
              content={state.content}
              Id={`grid${state.Id}`}
              image={state.image}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default stateScreen;

const Carder = (props) => {
  const styles = Styles();
  const History = useHistory();
  const [, setCurrCooks] = useRecoilState (cooksData.currCook);
  const [, setCook] = useRecoilState (cooksData.selectedCook)
  const path = () => {
    const state = props.title;
    getCookByState (state).then(cooks=>{
      if (cooks===null)
        alert ("No Cooks assinged for this state.");
      else if (cooks.length === 1) {
        setCook (cooks[0]);
        History.push (`/cook/${cooks[0].id}`)
      }
      else {
        setCurrCooks (cooks);
        History.push (`/cooks/${state}`);
      }
    })
  };
  return (
    <div id={props.Id}>
      <Card
        className={styles.body}
        onClick={path}
      >
        <CardActionArea>
          <CardMedia
            image={props.image}
            className={styles.image}
            title={props.title}
          />
          <CardContent>
            <h4 className="card-title">{props.title}</h4>
            {/*  <p className="card-body">{props.content}</p>   */}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
