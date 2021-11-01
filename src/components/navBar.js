import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  Drawer,
  List,
  ListItem,
  Divider,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Avatar,
  Fade,
} from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "./menu";
import Store from "../store/index";
import "./styles/navBar.css";
import logo from "../assets/logo.png";

const useStyles = makeStyles(() => ({
  ele: {
    ["@media (max-width:500px)"]: {
      // eslint-disable-line no-useless-computed-key
      height: "5vh",
    },
  },
  appBar: {
    flexGrow: 1,
    height: "10vh",
  },
  logo: {
    flexGrow: 1,
  },
}));

const NavBar = ({ active, Color, scroll }) => {
  const History = useHistory();
  const loggedIn = useRecoilValue(Store.isLoggedIn);
  const name = useRecoilValue(Store.name);
  const [open, setOpen] = useState(false);
  const styles = useStyles();

  const Colorizer = (Activated) => {
    if (Activated === active) return "#f36f27";
    else return "#707070";
  };

  return (
    <ElevationScroll enableScroll={scroll} className={styles.ele}>
      <AppBar className={styles.appBar} style={{ backgroundColor: Color }}>
        <Toolbar>
          <div className={styles.logo}>
            <img
              src={logo}
              alt="logo"
              className="Logo"
              onClick={() => History.push("/")}
            ></img>
          </div>

          <NavItems
            name={name}
            Colorizer={Colorizer}
            loggedIn={loggedIn}
            History={History}
          />
          <div className="menu-icon">
            <MenuIcon open={open} click={() => setOpen(!open)} />
          </div>
          <NavDrawer
            open={open}
            History={History}
            loggedIn={loggedIn}
            Colorizer={Colorizer}
            name={name}
            setOpen={setOpen}
          />
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default NavBar;

NavBar.defaultProps = {
  Color: "#FBFEFD",
};

function ElevationScroll(props) {
  const { enableScroll } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: enableScroll || false,
    threshold: 0,
  });

  return React.cloneElement(props.children, {
    elevation: trigger ? 4 : 0,
  });
}

const useDrawerStyles = makeStyles(() => ({
  root: {
    width: "60%",
  },
  navItems: {
    cursor: "pointer",
  },
}));

const NavItems = ({ Colorizer, loggedIn, name, History }) => {
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);
  const handleClose = () => setAnchor(null);
  const handleClick = (e) => setAnchor(e.currentTarget);
  const [, setLoggedIn] = useRecoilState(Store.isLoggedIn);
  const [, setName] = useRecoilState(Store.name);
  const [, setEmail] = useRecoilState(Store.email);
  const [, setIsOrdered] = useRecoilState(Store.isOrdered);
  const handleLogOut = () => {
    setLoggedIn(false);
    setName("");
    setEmail("");
    setIsOrdered(false);
    History.push("/");
  };
  return (
    <>
    <div className="nav-items sun">
      <span
        style={{ color: Colorizer("Home") }}
        onClick={() => History.push("/")}
      >
        Home
      </span>
      <span
        style={{ color: Colorizer("Community") }}
        onClick={() => History.push("/community")}
      >
        Community
      </span>
      <span
        onClick={() => History.push("/login")}
        style={{
          color: Colorizer("SignIn"),
          display: !loggedIn ? "inline-block" : "none",
        }}
      >
        Sign In
      </span>
      <Avatar
        src={`https://avatars.dicebear.com/api/avataaars/${name}.svg`}
        onClick={handleClick}
        style={{ display: loggedIn ? "inline-block" : "none", color: "orange" }}
      />
      <Menu
        anchorEl={anchor}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => History.push("/menu")}>Menu</MenuItem>
        <MenuItem onClick={() => History.push("/orders")}>Orders</MenuItem>
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </div>

    <div className="nav-items mon">
    <Avatar
        src={`https://avatars.dicebear.com/api/avataaars/${name}.svg`}
        onClick={handleClick}
        style={{ display: loggedIn ? "inline-block" : "none", color: "orange" }}
      />
      <Menu
        anchorEl={anchor}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => History.push("/menu")}>Menu</MenuItem>
        <MenuItem onClick={() => History.push("/orders")}>Orders</MenuItem>
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>

    </div>
    </>
  );
};

const NavDrawer = ({ open, Colorizer, loggedIn, History, name, setOpen }) => {
  const styles = useDrawerStyles();
  const [anchor, setAnchor] = useState(null);
  const Open = Boolean(anchor);
  const handleClose = () => setAnchor(null);
  const handleClick = (e) => setAnchor(e.currentTarget);
  const [, setLoggedIn] = useRecoilState(Store.isLoggedIn);
  const [, setName] = useRecoilState(Store.name);
  const [, setEmail] = useRecoilState(Store.email);
  const [, setIsOrdered] = useRecoilState(Store.isOrdered);
  const handleLogOut = () => {
    setLoggedIn(false);
    setName("");
    setEmail("");
    setIsOrdered(false);
    History.push("/");
  };

  return (
    <Drawer open={open} anchor="left" className={styles.root}>
      <List>
        <ListItem className="logo">
          <img
            src={logo}
            alt="logo"
            height="80"
            onClick={() => History.push("/")}
          ></img>
          <MenuIcon click={() => setOpen(!open)} />
        </ListItem>
        <Divider />
        <ListItem
          className={styles.navItems}
          style={{
            display: loggedIn ? "inline-block" : "none",
            color: "orange",
          }}
          button
        >
          {name}
        </ListItem>
        <Menu
          anchorEl={anchor}
          keepMounted
          open={Open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={() => History.push("/orders")}>Orders</MenuItem>
          <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
        </Menu>
        <ListItem
          className={styles.navItems}
          style={{ color: Colorizer("Home") }}
          onClick={() => History.push("/")}
          button
        >
          Home
        </ListItem>
        <ListItem
          className={styles.navItems}
          style={{ color: Colorizer("Community") }}
          onClick={() => History.push("/community")}
          button
        >
          Community
        </ListItem>
        <ListItem
          className={styles.navItems}
          onClick={() => History.push("/login")}
          style={{
            color: Colorizer("SignIn"),
            display: !loggedIn ? "inline-block" : "none",
          }}
          button
        >
          Sign In
        </ListItem>
      </List>
    </Drawer>
  );
};
