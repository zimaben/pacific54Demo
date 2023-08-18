/* Submission */
const pacformsubmit = e => {
    e.preventDefault();
    
    let form = e.target.closest('FORM'); 
    let dialog = form.querySelector('.dialog');
    let islinked = form.dataset.linkedForm.length ? true : false;
   // let refresh_target = document.getElementById('booking-form-response');
    let submit_button = form.querySelector("button");
    if(false === formValidate(form.elements)){
        console.log("form did not validate");
        return;
    }
    let senddata = Array.from(form.elements).map( (input) => {
      return input.name + '=' + encodeURIComponent(input.value);
    }).join('&');
    /* Page validation */
    if(!form.dataset.action) {
        dialog.classList.add("warning");
        dialog.innerHTML = "Nothing to do";
        return;
    }

    if(typeof theme_vars === "undefined") {
        dialog.classList.add("warning");
        dialog.innerHTML = "Ajax not set correctly";
        return;
    }
    let url = theme_vars.ajaxurl + '?action=' + form.dataset.action;
   if( theme_vars.nonce ) senddata+='&nonce='+theme_vars.nonce;
   if( islinked) senddata+='&linked='+form.dataset.linkedForm;

    submit_button.innerHTML = "Sending...";
    submit_button.style.pointerEvents = 'none';

    sendit(url, senddata).then( (r)=>{
        if(r.status === 200){
            console.log(r);
            submit_button.innerHTML = "Submit";
            submit_button.style.pointerEvents = 'auto';
            blankFields(form);
            if(r.response) {
                dialog.innerHTML = r.response;
                if(islinked && r.payload){
                    let linkedTarget = document.getElementById(form.dataset.linkedForm);
                    if(linkedTarget) {
                        linkedTarget.classList.remove('bang');
                        const linkedCount = linkedTarget.children.length;
                        const linkedContainer = linkedTarget.querySelector(".form-cards");
                        if(linkedContainer) linkedContainer.innerHTML = r.payload;
                        linkedTarget.classList.add('bang');
                    }
                }
              return false;
            }

        } else {
            console.log(r);
            submit_button.innerHTML = "Submit";
            submit_button.style.pointerEvents = 'auto';
            dialog.innerHTML = r.response;
        }
    });
}


/* Quick Validation */
const pacformvalidate = e => {
    let form = e.target.closest('FORM'); 
    if(false === formValidate(form.elements)){
        return;
    }
}
const blankFields = form => {
    Array.from(form.elements).forEach( element => {
        if(element.value) element.value = null;
    })
}
const formValidate = elements => {
    let formValid = true;

    Array.from(elements).forEach( field => {
        if(field.tagName.toUpperCase() === "INPUT" || field.tagName.toUpperCase() === "TEXTAREA"){
            if(false === inputValidate(field)) {
                formValid = false;
            }
        }
    });
    

    return formValid;
}

const inputValidate = ( input ) =>{
    let valid = false;
    switch(input.dataset.validate){
        case "name":
            if(validName( input.value )){    
                doValid(input); 
                valid = true;
            } else {
                console.log("name did not validate");
                doInvalid(input, 'Name can\'t be empty');
                valid = false;
            }
        break;
        case "email":
            if(validEmail( input.value )){               
                doValid(input); 
                valid = true;
            } else {
                console.log("email did not validate");
                doInvalid(input, 'That email doesn\'t look right');
                valid = false;
            }
        break;
        case "phone":
            if(validPhone( input.value )){ 
                doValid(input); 
                valid = true;
            } else {
                console.log("phone did not validate");
                doInvalid(input, 'That phone doesn\'t look right');
                valid = false;
            }
        break;
        case "message":
            if(validMessage( input.value )){ 
                doValid(input); 
                valid = true;
            } else {
                console.log("message did not validate");
                doInvalid(input, 'Please enter a message');
                valid = false;
            }
        break;
        default: break;
    }
    return valid;
}
const validName = text => { return text.length ? true : false; }
const validEmail = text => { 
    
    if(text.length < 3) return false;
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text); 
}
//const validPhone = text => { return /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/.test(text)}
const validPhone = text => {return /^(?:\+1)?\d{3}-\d{3}-\d{4}$/.test(text);}
const validMessage = text => { return text.length ? true : false; }

const doValid = input => {
    let name = input.name;
    let feedback = document.querySelector('#validate-'+name);
    if(feedback) {
        feedback.classList.remove("error");
        feedback.innerHTML = "";
    }
}
const doInvalid = (input, message) => {
    let name = input.name;
    let feedback = document.querySelector('#validate-'+name);
    if(feedback){
        feedback.classList.add("error");
        feedback.innerHTML=message;
    }
}
/* End Validation */

/* Submission
 */
const sendit = async(location, senddata ) => {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:senddata
    };
    try {
        const fetchResponse = await fetch(location, settings);
        const receivedata = await fetchResponse.json();
        return receivedata;
    } catch (e) {
        console.log(e);
        return e;
    } 
}

/* Q&D */
window.pacformsubmit = pacformsubmit;
window.pacformvalidate = pacformvalidate;