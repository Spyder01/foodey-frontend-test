import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import { getOrders } from "../firebase/db";
import { useRecoilValue } from "recoil";
import { makeStyles } from "@material-ui/core/styles";
import {useHistory} from 'react-router-dom';
import {
  List,
  Chip,
  ListItem,
  ListItemText,
  Card,
  Divider,
} from "@material-ui/core";
import Cooks from "../store/cooks";
import store from "../store";
import "./styles/Orders.css";

const useStyles = makeStyles({
  Card: {
    width: "75%",
    ["@media (max-width:500px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "100%",
    },
  },
  List: {},
  ListItem: {
    position: "relative",
  },
  Badge: {
    position: "absolute",
    top: "0",
    right: "0",
    color: "white",
    backgroundColor: "green",
  },
});

const Orders = () => {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const isLoggedIn = useRecoilValue(store.isLoggedIn);
  const phone = useRecoilValue(store.phoneNo);
  const History = useHistory ();

  const Data = data.map((ele) => {
    const name = Cooks.filter((cook) => {
      if (cook.id === ele.cookID) return cook.Name;
    })[0]["Name"];
    console.log(ele.verified)
    return {
      ...ele,
      name,
    };
  });



  useEffect(() => {
  if (!isLoggedIn) return History.push("/login");

    getOrders(null, phone).then((ele) => setData(ele));
  }, []);

  if (phone === null) 
    History.push ('/login');

  return (
    <>
      <NavBar active="Community" display={true} Color="#FBFEFD" />
      <div className="OrdersMainArea">
        <Card className={styles.Card}>
          <List className={styles.List}>
            {Data.map((item) => (
              <Items
                name={item.name}
                date={item.date}
                subscription={item.subscription}
                verified={item.verified}
              />
            ))}
          </List>
        </Card>
      </div>
    </>
  );
};

export default Orders;

const Items = (props) => {
  const styles = useStyles();
  return (
    <>
      <Divider />
      <ListItem className={styles.ListItem}>
        <Chip
          label="Verified"
          style={{ display: props.verified ? "flex" : "none" }}
          className={styles.Badge}
        />
        <ListItemText
          primary={props.name}
          secondary={
            <>
              Subscription: {props.subscription} <br />
              Date: {props.date}
            </>
          }
        />
      </ListItem>
    </>
  );
};
