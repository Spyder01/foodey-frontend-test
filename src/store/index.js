import {atom} from 'recoil';


const store = {
    name: atom({
        key: 'name',
        default: null
    }),
    isLoggedIn: atom({
        key: 'isLoggedIn',
        default: false
    }),
    subscription: atom({
        key: 'subscription',
        default: 'month'
    }),
    email: atom({
        key: 'email',
        default: ''
    }),
    phoneNo: atom({
        key: 'phoneNo',
        default: ''
    }),
    isOrdered: atom({
        key: 'isOrdered',
        default: false
    }),
    cookID: atom({
        key: 'cookID',
        default: null
    }),
    plan: atom({
        key: 'plan',
        default: null
    }),
    currCook: atom ({
        key: "currentCooks",
        default: []
    }),
    selectedCook: atom ({
        key: "selectedCook",
        default: null
    })
    

}


export default store;