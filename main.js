const form = document.querySelector('form');

const clearError = () => {
  // remove any success or error states for a specific form field
}

const renderError = (message) => {
  // assign an error message to the form
}

const renderSuccess = () => {
  // render the success state
}

const dataIsValid = (name, value) => {
  // if the value passes validation return true
  // else return false
}

const handleChange = (e) => {
  // remove error message from the form
  clearError();
}

const validateCurrency = (input) => {
  // Using a regular expression for basic validation
  const regex = /^\d+(\.\d{0,2})?$/; // Matches numbers with optional 2 decimal places

  if (regex.test(input)) {
    return true;
  } else {
    return false;
  }
}

const validateNaturalNumber = (n) => {
  // Check if the input is a number 
  if (typeof n !== 'number' || isNaN(n) || !Number.isInteger(n) || n < 0 ) {
    return false;
  }
  return true;
}

const validatePercentage = (n) => {
  // Check if the input is a number 
  if (typeof n !== 'number' || isNaN(n) || !Number.isInteger(n) || 
       n <= 0 || n > 100) {
    return false;
  }
  return true;
}

const myform = document.getElementById('form');
const handleSubmit = (e) => {
  e.preventDefault();

  let isValid = true; // form is valid
  let fdata = new FormData(myform);
  const data = Object.fromEntries(fdata);
  console.log(fdata);
  console.log(data);

  let radio_btns = Array.from(document.querySelectorAll('input[name=percentage]'));
  let chosen = radio_btns.findIndex((e)=>e.checked);
  let perc = [5, 10, 15, 25, 50];
  let num_people = data['num-people'];
  let total = 0;
  let tip = 0;
  let cost = parseFloat(data['bill-dollars']);
  if(chosen >= 0 && chosen < 5) {
    tip = cost * perc[chosen] / 100.0;
    total = cost * (1 + perc[chosen] / 100.0);
  } else if(chosen == 5) { //custom percentage
    let val = parseInt(data['custom-perc-input']);
    tip = cost * val / 100.0;
    total = cost * (1 + val / 100.0);
  }
  tip = tip / num_people;
  total = total / num_people;
  document.getElementById('tip-amount').innerText = '$' + tip.toFixed(2);
  document.getElementById('total-amount').innerText = '$' + total.toFixed(2);
  //console.log(radio_btns, k);

  // get the data from the form
  //console.log(myform);
  //console.log(data);



  // // loop over the data
  // Object.keys(data).forEach((name) => {
  //   // check if the value of the field is valid
  //   if(!dataIsValid(name, data[name])) {
  //     // if the data is invalid set `isValid` to false
  //     isValid = false;
  //   }
  // });

  // // if the form is valid
  // if(isValid) {
  //   // render the success state
  //   renderSuccess()
  // } else {
  //   // else render an appropriate error message
  //   renderError('Some data you have supplied is invalid');
  // }
}

const inputs = document.querySelectorAll('input');
for(let input of inputs) {
  input.addEventListener('change', (e)=> handleSubmit(e));
}

const reset = document.getElementById('reset-button');
reset.addEventListener('click', ()=> {
  form.reset();
});

