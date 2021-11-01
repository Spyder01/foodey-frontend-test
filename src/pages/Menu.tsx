import type {FC} from 'react';
import {useState, useEffect} from 'react';
import {getMenu} from '../firebase/db';
import Store from '../store';
import {useRecoilValue} from 'recoil';
import {Card, CardContent, CardActionArea, Dialog, DialogTitle, List, ListItem, Avatar, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'; 
import NavBar from "../components/navBar";
import './styles/Main-Menu.css';

// Prop Interfaces 

interface MenuProps {
    Monday: any,
    Tuesday: any,
    Wednesday: any,
    Thursday: any,
    Friday: any,
    Saturday: any,
    Sunday: any
}

interface CardProps {
    Name: string,
    State: string,
    menu: MenuProps
}

interface MenuDialogProp {
    dialog: boolean,
    handleClose: VoidFunction,
    data: any
}






const Page:FC = ()=>{
    const [cooks, setCooks]:any = useState(null);
    const [menu, setMenu]:any = useState (null);
    const phone = useRecoilValue (Store.phoneNo);

    getMenu ('+91 12345-67890')

    const HandleAPI = ()=>{

    }


    useEffect (HandleAPI, []);

    
    



    
    const Data = {
        Name: "Babloo",
        State: "Rajasthan",
        subscription: "non-veg-weekly",
        menu: {
            Monday: {
                Dal: "",
                Curry: "",
                Rice: "",
                Roti: "",
                Sabji1: "",
                Sabji2: ""
            },
            Tuesday: "",
            Wednesday: "",
            Thursday: "",
            Friday: "",
            Saturday: "",
            Sunday: ""
        }
        
    }    
    

     
    return (
        <>
            <NavBar active="Community" scroll={true} Color="#FBFEFD" />
            <div className="Menu-Main">



            <Carder Name={Data.Name} State={Data.State} menu={Data.menu} ></Carder>
                
            </div>
        
        </>
    )
}


export default Page;



const useStyles = makeStyles({
    root: {
        position: "relative",
        ["@media (max-width:500px)"]: {
            // eslint-disable-line no-useless-computed-key
            transform: "scale(0.7)"
          },
    },
    Card: {
        maxHeight: "20vh",
        display: 'flex',
        color: 'grey',
        position: "relative",
        zIndex: 1,
        justifyContent: "center",
        padding: "4%"
    },
    image: {
        width: '100px',
        height: "100px",
        position: "absolute",
        right: "34.5%",
        top: -50,
        zIndex: 3
    },
    content: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign:"center",
        marginTop: '27px'
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
    },
    days: {
        display: "flex",
        justifyContent: 'space-between',
        flexDirection: "row",
        width: "100%",
        cursor: "pointer",
        paddingTop: "10px"
    },
    dayCard: {
        boxShadow: '0',
        borderColor: 'grey',
        padding: "5px",

    }
})

const Carder:FC<CardProps> = ({Name, State, menu})=>{

        const styles = useStyles ()
        const [dialog, setDialog] = useState (false);
        const [selectedMenu, setSelectedMenu] = useState (null)

        const handleDialogClose:VoidFunction = ()=>{
            setDialog (false);
        }

        console.log(new Date().getDay())

        const dayControll = (index:number)=> !(index >= new Date().getDay()); 
        

        const days = [
            {
                name: "Sun",
                click: ()=>{
                    setSelectedMenu (menu.Sunday)
                    setDialog (!dialog)
                }
            },
            {
                name: "mon",
                click: ()=>{
                    setSelectedMenu (menu.Monday)
                    setDialog (!dialog)
                }
            },
            {
                name: "tue",
                click: ()=>{
                    setSelectedMenu (menu.Tuesday)
                    setDialog (!dialog)
                }
            },
            {
                name: "wed",
                click: ()=>{
                    setSelectedMenu (menu.Wednesday)
                    setDialog (!dialog)
                }
            },
            {
                name: "thu",
                click: ()=>{
                    setSelectedMenu (menu.Thursday)
                    setDialog (!dialog)
                }
            },
            {
                name: "fri",
                click: ()=>{
                    setSelectedMenu (menu.Friday)
                    setDialog (!dialog)
                }
            },
            {
                name: "Sat",
                click: ()=>{
                    setSelectedMenu (menu.Saturday)
                    setDialog (!dialog)
                }
            },

        ]

        return (
            <div className={styles.root}>
                                <Avatar
                className={styles.image}
                src="https://st.depositphotos.com/1518767/4293/i/600/depositphotos_42930411-stock-photo-concentrated-male-chef-garnishing-food.jpg"
                
                />
            <Card className={styles.Card}>

                <CardContent className={styles.content}>
                    <h2>
                        {Name}
                    </h2>

                    <div className={styles.row}>
                        <div>
                            <strong>State</strong>: {State}
                        </div>

                        <div>
                            <strong>Subscription</strong>: Week
                        </div>
                    </div>
                    <div className={styles.days}>
                        {
                            days.map((day, i)=><DaysOfTheWeek day={day.name} click={day.click} disabled={dayControll(i)}/>)
                        }

                    </div>

                </CardContent>
                        <MenuDialog dialog={dialog} handleClose={handleDialogClose} data={menu}   />
            </Card>
            </div>
        )
}

interface daysOfTheWeekProps {
    day: string,
    click: VoidFunction,
    disabled: boolean
}

const DaysOfTheWeek:FC<daysOfTheWeekProps> = ({day, click, disabled})=>(<Button onClick={click} className={useStyles().dayCard} disabled={disabled}>{day}</Button>)



const useDialogStyles = makeStyles({
    Dialog: {
        width: "150px" 
    }
})


const MenuDialog:FC<MenuDialogProp> = ({dialog,handleClose, data})=>{
    const styles = useDialogStyles ();
    return (
        <Dialog open={dialog} onClose={handleClose}>  
            <DialogTitle id="simple-dialog-title"><strong>Menu</strong></DialogTitle>
            <List>
                <ListItem>
                    Dal: {data.Dal}
                </ListItem>
                <ListItem>
                    Curry: {data.Dal}
                </ListItem>
                <ListItem>
                    Dal: {data.Dal}
                </ListItem>
                <ListItem>
                    Dal: {data.Dal}
                </ListItem>
            </List>
        </Dialog>
    )
}