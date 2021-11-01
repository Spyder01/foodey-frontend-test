import React from "react";
import NavBar from "../components/navBar";
import { useParams, useHistory } from "react-router-dom";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState, useRecoilValue } from "recoil";
import Store from "../store";
import cooksData from "../store/cooks";
import "./styles/cooksProfile.css";

const { subscription: Subscription, isLoggedIn: logIn } = Store;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 60,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60%",
    zIndex: 0,
    ["@media (max-width:500px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "100%",
    },
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    //  position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  form: {
    paddingTop: theme.spacing(4),
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: "#f36f27",
    color: "#fff",
    boxShadow: "none",
    marginLeft: "55%",
    borderRadius: 0,
    ["@media (max-width:500px)"]: {
      // eslint-disable-line no-useless-computed-key
      fontSize: "12px",
    },
  },
  formControl: {
    ["@media (max-width:720px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "80%",
    },
  },
}));

const Profile = () => {
  const History = useHistory();
  const Param = useParams();
  const styles = useStyles();
  const isLoggedIn = useRecoilValue(logIn);
  const cook_id = Param.id;
  const cook = cooksData.filter((cook) => cook.id === cook_id)[0];
  const [subscription, setSubscription] = useRecoilState(Subscription);
  const [, setCookId] = useRecoilState(Store.cookID);
  const handleChange = (e) => setSubscription(e.target.value);
  const {
    Profile_Image,
    Name,
    State,
    Year_Of_Experience,
    Region,
    Ratings,
    Speciality,
  } = cook;

  return (
    <>
      <NavBar active="Community" display={true} Color="#FBFEFD" />
      <div className="cookProfile">
        <Card className={styles.root}>
          <Avatar src={Profile_Image} alt={Name} className={styles.avatar} />
          <CardContent>
            <h4 className="cook-profile-name">{Name}</h4>
            <Divider />

            <List>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <ListItem>
                    <ListItemText>State: {State}</ListItemText>
                  </ListItem>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <ListItem>
                    <ListItemText>Region: {Region}</ListItemText>
                  </ListItem>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <ListItem>
                    <ListItemText>
                      Experience: {Year_Of_Experience} years
                    </ListItemText>
                  </ListItem>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <ListItem>
                    <ListItemText>Speciality: {Speciality}</ListItemText>
                  </ListItem>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <ListItem>
                    <ListItemText>Ratings: {Ratings}/5</ListItemText>
                  </ListItem>
                </Grid>
              </Grid>
            </List>
            <Divider />

            <form className="form">
              <InputLabel id="subscription">Type of Subscription</InputLabel>
              <div className="former">
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
                  className={styles.btn}
                  onClick={() => {
                    setCookId(cook_id);
                    !isLoggedIn
                      ? History.push("/login")
                      : History.push("/invoice");
                  }}
                  variant="contained"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Profile;
