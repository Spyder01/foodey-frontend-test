import {firebase} from './firebaseConfig';



const Auth = async (phoneNumber)=> {
    const recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    const Auth = await firebase.auth().signInWithPhoneNumber (phoneNumber, recaptcha);
    return Auth;
}


export default Auth;