import React from 'react'
import { useState } from 'react'
import OtpInput from './OtpInput'
import { auth } from './firebase';
import { RecaptchaVerifier ,signInWithPhoneNumber} from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';

import { redirect } from "react-router-dom";

const OtpLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showOtp,setShowOtp] = useState(false)
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);


    const handlePhoneNumber =(e)=>{
    
        setPhoneNumber(e.target.value)
    }

    const handlePhoneSubmit =(e)=>{
              e.preventDefault();
              console.log(phoneNumber)

              const regex= /[^0-9]/g;
              if(phoneNumber.length<10 || regex.test(phoneNumber)){
                alert("Please enter valid phone number")
                return false;
               }
                // else{
                //     alert("OTP sent to your phone number")
                //     setShowOtp(true);
                //     return true;
                // }
                setShowOtp(true);
    };

    // const onOtpSubmit =(otp)=>{
    //     console.log(otp)
    //     //alert("OTP submitted successfully")
    // }

    function onSignup() {
      setLoading(true);
      onCaptchaVerify();
      console.log("in onSignup");
      console.log(user,"user");
  
      const appVerifier = window.recaptchaVerifier;
  
      const formatPh = "+91" + phoneNumber;
  
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOtp(true);
          toast.success("OTP sent successfully!");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }

    function onCaptchaVerify()
    {
      if(!window.recaptchaVerifier){
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignup();
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          }
        });
      }
    }

    function onOTPVerify(otp) {
      setLoading(true);
      console.log('OTP Verification', otp);
      window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          console.log(res);
          setUser(res.user);
          setLoading(false);
          redirect('/home');
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  
    
  return (
    <div >
       <Toaster toastOptions={{ duration: 4000 }} />
      {!user && <div id="recaptcha-container"></div>}
      
    {
        !showOtp? <div className='input_field'>
          <form onSubmit={handlePhoneSubmit}>
        <input className='phone-input' type="text" placeholder="Enter phone number" value={phoneNumber} onChange={handlePhoneNumber}></input>
        
        <button      onClick={onSignup} className='send-otp-btn' type="submit">Send OTP</button>
    </form></div>:(
    <div>
         {
          !user? <>
           <p className='heading2'>Enter OTP </p>
          <OtpInput length={6} onOTPVerify={onOTPVerify} ></OtpInput>
          </>: <h1>Login Sucess</h1>
         }
    </div>
    )
    }
    </div>
  )
}

export default OtpLogin
