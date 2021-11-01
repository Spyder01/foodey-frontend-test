import React, {useEffect} from "react";
import NavBar from "../components/navBar";
import Store from "../store";
import { useRecoilValue} from "recoil";
import { useHistory } from "react-router-dom";
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {addOrder} from "../firebase/db";
import './styles/Invoice.css';


const useStyles = makeStyles({
    btn: {
        backgroundColor: 'orange',
        color: 'white',
        width: '17vw'
    }
})

const Invoice = () => {
    const styles = useStyles ();
    const History = useHistory();
    const phone = useRecoilValue(Store.phoneNo);
    const name = useRecoilValue(Store.name);
    const email = useRecoilValue(Store.email);
    const plan = useRecoilValue (Store.plan)
    const CookID = useRecoilValue(Store.cookID);
    const subscription = useRecoilValue(Store.subscription);
    console.log(plan)
    const data = {
      cookID: CookID,
      subscription: subscription,
      verified: false,
      plan: plan
    }
    useEffect(()=>{
      addOrder (phone, data)
    },[])
    
  return (
    <>
      <NavBar active="Community" display={true} Color="#FBFEFD" />
      <div className="Invoice-MainArea">
        <div className="Invoice-Msg">
          We have Succesfully Recieved your order!!
        </div>
       <div className='btn-groups'>
       <Button className={styles.btn} onClick={()=>History.push('/community')}>
            Place Another Order
        </Button>
        <Button className={styles.btn} onClick={()=>History.push('/')}>
            Go to Home
        </Button>
        </div> 

      </div>
    </>
  );
};

export default Invoice;
