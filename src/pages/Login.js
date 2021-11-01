import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import NavBar from "../components/navBar";
import {useHistory} from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import MuiPhoneNumber from "material-ui-phone-number";
import { isUserExists, getUser } from "../firebase/db";
import { Link } from "react-router-dom";
import Auth from "../firebase/auth.js";
import store from "../store";
import logo from "../assets/logo.png";

const useStyles = makeStyles({
  btn: {
    backgroundColor: "#f36f27",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#f36f27",
      color: "#fff",
    },
  },
});

const SignUp = () => {
  const styles = useStyles();
  const History = useHistory();

  const HandleOTP = async ()=>{
      const userExists = await isUserExists(phone);
      if (userExists) {
        const phoneNumber = phone.replace(" ", "").replace("-", "");
        const Verify = await Auth(phoneNumber);
        setVerify(Verify);
        console.log(Verify);
        setDisplay(true);     
      }
      else alert("User doesn't exist");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    verify.confirm(OTP).then(result=>{
      getUser (phone).then(data=>{
        setName (data.Name);
        setEmail (data.email);
        setIsLoggedIn (true)
        isOrdered? History.push("/invoice"):History.push ("/");
      })

    }).catch(err=>alert("Invalid Code"))

  };
  const [phone, setPhone] = useRecoilState(store.phoneNo);
  const [, setEmail] = useRecoilState(store.email);
  const [, setName] = useRecoilState(store.name);
  const [, setIsLoggedIn] = useRecoilState(store.isLoggedIn);
  const isOrdered = useRecoilValue(store.isOrdered);
  const [verify, setVerify] = useState (null);
  const [display, setDisplay] = useState(false);
  const [OTP, setOTP] = useState (null);

  const handleOnBlur = (e) => {
    setPhone(e.target.value);
    console.log(phone);
  };

  return (
    <>
      <NavBar active={"login"} Color="transparent" scroll={false} />
      <Grid container>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 16,
              height: "100vh",
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={logo} width="100" alt="logo" />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <MuiPhoneNumber
                margin="normal"
                required
                fullWidth
                id="phone"
                defaultCountry={"in"}
                label="Phone Number"
                name="Phone No."
                autoComplete="phone"
                autoFocus
                variant="outlined"
                onChange={(e) => setPhone(e)}
                value={phone}
                onBlur={handleOnBlur}
              />
              <div id="recaptcha"></div>
              <TextField
                margin="normal"
                required
                fullWidth
                name="OTP"
                label="OTP"
                type="password"
                id="password"
                onChange={(e)=>setOTP(e.target.value)}
                autoComplete="current-password"
                style={{
                  display: display ? "inline-flex" : "none",
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className={styles.btn}
                onClick={HandleOTP}
                style={{
                  display: !display ? "inline-flex" : "none",
                }}
              >
                Send OTP
              </Button>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 3, mb: 2 }}
                className={styles.btn}
                onClick={handleSubmit}
                style={{
                  display: display ? "inline-flex" : "none",
                }}
              >
                Submit
              </Button>
              <Typography variant="caption">
                Don't have an account?
                <Link to={{ pathname: "/signup" }}> Sign Up</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
