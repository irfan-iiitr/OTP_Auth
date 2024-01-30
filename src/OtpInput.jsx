import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ({length,onOTPVerify}) => {
    const [otp,setOtp]=useState(new Array(length).fill(""));
    //const [activeInput,setActiveInput]=useState(0);
    const inputRefs=useRef([]);

    const handleChange =(e,index)=>{
       
        // setOtp([...otp.map((d,i)=>(i===index)?e.target.value:d)]);
        // if(e.target.value!==""){
        //     if(index===otp.length-1){
        //         onOtpSubmit(otp.join(""));
        //     }else{
        //         setActiveInput(activeInput+1);
        //     }
        // }
        const value=e.target.value;
         if(isNaN(value)) return;

         const newOtp=[...otp];
          //allow one input   
         newOtp[index]=value.substring(value.length-1);
        setOtp(newOtp);
        //submit trigger

        const combinedOtp=newOtp.join("");
        if(combinedOtp.length===length){
            onOTPVerify(combinedOtp);
        }
        console.table(otp,combinedOtp)
        //onOtpSubmit(combinedOtp);

        //move to next box
        if(value!==""){
            if(value && index<length-1 && inputRefs.current[index+1]){
                inputRefs.current[index+1].focus();
            }
        }


    }

    const handleKeyDown =(e,index)=>{
           if(e.key === "Backspace"){
               if(index>0 && !otp[index] && inputRefs.current[index-1]){
                   inputRefs.current[index-1].focus();
               }
           }
    }

    const handleCLick =(index)=>{
        
        if(inputRefs.current[index]){
            inputRefs.current[index].setSelectionRange(1,1); 
        }  
        if(index >0 && !otp[index-1]){
            inputRefs.current[otp.indexOf("")].focus();
        }
    }

    useEffect(()=>{
        if(inputRefs.current[0])
        inputRefs.current[0].focus();
    },[])


  return (
    <div>
        {
            otp.map((data,index)=>(
                <input
                className="otp-field"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                ref={(input)=>inputRefs.current[index]=input}
                // onChange={(e)=>handleChange(e,index)}
                // onFocus={()=>setActiveInput(index)}
                onClick={()=>handleCLick(index)}
                onKeyDown={e=>handleKeyDown(e,index)}
                onChange={e=>handleChange(e,index)}
                // style={{
                //     borderColor:activeInput===index?"#FB7B76":"#000"
                // }}
                />
            ))
        }
        
    </div>
  )
}

export default OtpInput
