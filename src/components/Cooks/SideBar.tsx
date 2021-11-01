import type {FC} from 'react';
import StarRatings from 'react-star-ratings';
import {Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import '../styles/sideBar.css';



interface CookData {
    Name: string,
    Profile_Image: string,
    description: string,
    Ratings: number
}

const Component:FC<CookData> = ({Name, Profile_Image, description, Ratings})=>{
    const useStyles = makeStyles({
        avatar: {
            height: 150,
            width: 150
    
        }
    })

        const muistyles = useStyles ();


    
    return (
        <div className="sideBar-container">
            <Avatar src={Profile_Image} alt={Name} className={muistyles.avatar} />

            <h1 className="sideBar-name">
                {Name}
            </h1>

            <div className="sideBar-description">
                <h2 className="sideBar-ProfileHeader">
                  Profile
                </h2>

                <div className=".sideBar-descriptionContent">
                    {description}
                </div>
            </div>

            <div className="starRatings">
                        <StarRatings 
                          rating={Ratings}
                          starDimension="30px"
                          starSpacing="10px"
                          starRatedColor="yellow"
                        />
                    </div>


        </div>
    )
}

export default Component;


Component.defaultProps = {
    Profile_Image: 'https://galaxypress.com/wp-content/uploads/2017/07/Chef_AS110485015.jpg',
    Name: "Babloo",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    Ratings: 4.6

}

