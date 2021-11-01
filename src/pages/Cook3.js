import {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {useParams} from 'react-router-dom';
import {useRecoilState, useRecoilValue} from 'recoil';
import SideBar from '../components/Cooks/SideBar';
import PricePlan from '../components/Cooks/PricePlan';
import NavBar from "../components/navBar";
import Store from '../store';
import './styles/CooksTs.css';

var renderer = 0

const useStyles = makeStyles({
    GridContainer: {
        height: '100%',
        overflowY: 'hidden'
    }
})


const Page = ()=>{
    const params = useParams();
    const styles = useStyles ();
    const id = params.id
    
    const cook = useRecoilValue (Store.selectedCook);
    console.table (cook)
    const description = (data)=>`${data.Name} hails from ${data.Region}, ${data.State}. He has ${data.Year_Of_Experience} years of experience and specializes in ${data.Speciality} dishes`;
    console.log(params.id)
    

    if (cook === null) 
    return (<></>)

else {
    return (
        <>
            <NavBar active="Community" scroll={true} Color="#FBFEFD" />
            <main className="main">
                <Grid container className={styles.GridContainer}>
                    <Grid item lg={3} xl={3} md={3}>
                        <SideBar description={description(cook)} Ratings={parseInt(cook.Ratings)} Profile_Image={cook.Profile_Image} Name={cook.Name}/>
                    </Grid>
                    <Grid item lg={9} xl={9} md={9}>
                        <PricePlan id={id}/>
                    </Grid>
                </Grid>
            </main>
        </>
    )
}

}



export default Page;