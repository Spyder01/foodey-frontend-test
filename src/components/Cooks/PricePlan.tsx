import type {FC}
from 'react';
import {useState} from 'react';
import Store from '../../store';
import {useHistory} from 'react-router-dom';
import {Switch, Grid, Card, CardContent, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Thali from '../../assets/img/pngegg.png';
import '../styles/PriceCard.css';
import { useRecoilState, useRecoilValue } from 'recoil';


interface Props {
    image: string,
    ThaliDescription: string,
    VegWeeklyPrice: string,
    NonVegWeeklyPrice: string,
    VegMonthlyPrice: string,
    NonVegMonthlyPrice: string,
    id: any
}

const Component:FC<Props> = ({image, ThaliDescription, VegMonthlyPrice, NonVegMonthlyPrice, VegWeeklyPrice, NonVegWeeklyPrice, id})=> {

    const [nonVeg, setNonVeg] = useState (false);
    const [plan, setPlan]:any = useRecoilState (Store.plan);
    const [, setIsOrdered]:any = useRecoilState (Store.isOrdered); 
    const isLoggedIn:any = useRecoilValue (Store.isLoggedIn);
    const [, setCookID] = useRecoilState (Store.cookID)
    const History = useHistory ();

    console.log (plan, isLoggedIn)

    const useStyles = makeStyles({
        Grid: {
            display: "flex",
            padding: "60px",
            justifyContent: "space-between",
        },
        Card: {
            borderRadius: "0px",
            display: "flex",
            flexDirection: "column"
        }
    
    })

    const muiStyles = useStyles ();

    const handleClick = (time:string)=>{

        if (nonVeg) {
            if (time==="month")
                setPlan ("non-veg-monthly");
            else 
                setPlan ("non-veg-weekly");
        }
        else {
            if (time === "week")
                setPlan ("veg-monthly");
            else 
                setPlan ("veg-weekly");
        }
        console.log (id)
        setCookID (id);
        setIsOrdered (true);

        if (isLoggedIn) 
            History.push ('/invoice')
        else History.push ('/login');



        

    }

    return (
        <div className="PricePlan-container">

            <section className="PricePlan-Thali">
                <img src={image} className="PricePlan-image" />
                <div className="PricePlan-ThaliText">
                   {ThaliDescription}
            </div>
        </section>

        <section className="PricePlan-PriceCard">

            <div className="PricePlan-PriceCardHeading">
                Select your Plan:
            </div>

            <div>
                    <span className="PricePlan-veg"
                        style={
                            {
                                color: !nonVeg ? "green" : "grey"
                            }
                    }>Veg</span>
                    <Switch checked={nonVeg}
                        onChange={
                            () => setNonVeg(!nonVeg)
                        }/>
                    <span className="PricePlan-NonVeg"
                        style={
                            {
                                color: nonVeg ? "red" : "grey"
                            }
                    }>Non-Veg</span>
                </div>

                <Grid container spacing={3} className={muiStyles.Grid}>
                    <Grid xl={5}
                        lg={5}
                        md={5}
                        sm={6}
                        xs={6}>


                        <Card className={
                            muiStyles.Card
                        }>
                            <div className="PricePlan-Strip"
                                style={
                                    {
                                        backgroundColor: nonVeg ? "red" : "green"
                                    }
                            }></div>

                            <div className="PricePlan-price">
                                <div className="PricePlan-rupees">Rs.</div>
                                <div className="PricePlan-number">
                                    {
                                    nonVeg ? VegWeeklyPrice : NonVegWeeklyPrice
                                }</div>
                                <div>/week</div>
                            </div>

                            <CardContent>
                                <p className="PricePlan-CardContent">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </CardContent>
                                <Proceed nonVeg={nonVeg} click={()=>handleClick ("week")} />

                        </Card>

                    </Grid>

                    <Grid xl={5}
                        lg={5}
                        md={5}
                        sm={6}
                        xs={6}>

                        <Card className={
                            muiStyles.Card
                        }>
                            <div className="PricePlan-Strip"
                                style={
                                    {
                                        backgroundColor: nonVeg ? "red" : "green"
                                    }
                            }></div>

                            <div className="PricePlan-price">
                                <div className="PricePlan-rupees">Rs.</div>
                                <div className="PricePlan-number">
                                    {
                                    nonVeg ? NonVegMonthlyPrice : VegMonthlyPrice
                                }</div>
                                <div>/month</div>
                            </div>

                            <CardContent>
                                <p className="PricePlan-CardContent">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </CardContent>
                            <Proceed nonVeg={nonVeg} click={()=>handleClick ("month")} />
                        </Card>

                    </Grid>

                </Grid>

        </section>
        </div>
    )
}


export default Component;


const Proceed:FC<any> = ({nonVeg, click})=>{
    return (
        <Button style={{backgroundColor: nonVeg ? "red" : "green", color:"white"}} onClick={click} >Proceed To Checkout</Button>
    )
}

Component.defaultProps = {
    image: Thali,
    ThaliDescription: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    VegWeeklyPrice: '700',
    NonVegWeeklyPrice: '800',
    VegMonthlyPrice: '1200',
    NonVegMonthlyPrice: '1500'
}

