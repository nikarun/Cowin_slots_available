'use strict';
console.log('hey bro')
const submitButton=document.querySelector('.btn');
const errorMessage=document.querySelector('.error');
const pinCode=document.querySelector('.pincode-field');
const date=document.querySelector('.date-field');
const result=document.querySelector('.result');
const result1=document.querySelector('.result1');

let vaccineAvailablefor18=false;
let vaccineForage18count=0;
let vaccineAvailablefor45count=0;
submitButton.addEventListener('click',function(){
    result1.innerHTML='';
    result.innerHTML='';
    vaccineForage18count=0;
    vaccineAvailablefor45count=0;
    if(!pinCode.value||!date.value) errorMessage.innerHTML="Please enter valid data";
    else{
    fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${parseInt(pinCode.value)}&date=${parseInt(date.value)}`).
    then((response)=>{
        if(!response.ok) errorMessage.innerHTML="Please enter valid data";
        else if(!(response.status==200)) {
         errorMessage.innerHTML="Please enter valid data";
        }else{
            errorMessage.innerHTML="";
       response.json()
       .then((data)=>{
        // console.log(data);
        if(data.sessions.length===0) result.innerHTML="sorry  no centers available for any age or date for these pincode";
        else{
            console.log(data.sessions);
            for(let i=0; i<data.sessions.length;++i){
                if(data.sessions[i].min_age_limit===18) {
                    vaccineAvailablefor18=true;
                    vaccineForage18count++;
                }else if(data.sessions[i].min_age_limit===45){
                    vaccineAvailablefor45count++;
                }
            }
        if(vaccineForage18count>0) {
            result.innerHTML=`Hurry up schedule your appointement now there are ${vaccineAvailablefor18} centres available for 18+ age in your city ${data.sessions[0].district_name}`
        } else{
            result.innerHTML=`sorry currently there are no centres available for 18+ age in your city ${data.sessions[0].district_name} but keep checking`
        }
        if(vaccineAvailablefor45count){
            result1.innerHTML=`Hurry up schedule your appointement now there are ${vaccineAvailablefor45count} centres available for 45+ age in your city ${data.sessions[0].district_name}`
        } else{
            result.innerHTML=`sorry currently there are no centres available for 45+ age in your city ${data.sessions[0].district_name} but keep checking`
        }
    }

    })
}
    })
    
}
})
// fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=482001&date=17-05-2021').
// then((response)=>{
//     response.json()
//     .then((data)=>{
//         console.log(data);
//     })
// })

