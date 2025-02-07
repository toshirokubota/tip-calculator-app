const form = document.querySelector('form');

const isCurrency = (n) => {
  // Check if the input is a positive number and at most 2 digits under decimal point. 
  if(!n || !n.trim()) return false; // undefined or empty

  n = Number(n);
  if (isNaN(n) || n < 0 || (n * 100) - Math.floor(n * 100) != 0) {
    return false;
  } else {
    return true;
  }
}

const isNaturalNumber = (n) => {
  // Check if the input is a positive integer 
  if(!n || !n.trim()) return false; // undefined or empty
  
  n = Number(n);
  if (isNaN(n) || !Number.isInteger(n) || n <= 0 ) {
    return false;
  }
  return true;
}

const isPercentage = (n) => {
  // Check if the input is a positive number 
  if(!n || !n.trim()) return false; // undefined or empty
  
  n = Number(n);
  if (isNaN(n) || n < 0) {
    return false;
  }
  return true;
}

const validations = {
  currency: (value) => isCurrency(value),
  count: (value) => isNaturalNumber(value),
  percentage: (value) => isPercentage(value),
}

const dataIsValid = (key, value, validations) => {
  if(!validations[key]) return true;

  return validations[key](value);
}

const error_messages = {
  currency: 'input valid dollar amount',
  count: 'how many people?',
  percentage: 'input valid percentage'
}

const handleError = (elm, message) => {
  // assign an error message to the form
  let error_msgs = elm.querySelectorAll('.error-msg');
  for(let elm of error_msgs){
    elm.innerText = message;
  }
  let error_elms = elm.querySelectorAll('.error-target');
  for(let elm of error_elms){
    elm.classList.add('invalid');
  }
}

const clearError = (elm) => {
  // render the success state
  let error_msgs = elm.querySelectorAll('.error-msg');
  for(let elm of error_msgs){
    elm.innerText = '';
  }
  let error_elms = elm.querySelectorAll('.error-target');
  for(let elm of error_elms){
    elm.classList.remove('invalid');
  }
}

const name2container = new Map(); //for rendering error indication
name2container['currency'] = document.querySelector('.bill');
name2container['percentage'] = document.querySelector('.tip');
name2container['count'] = document.querySelector('.party');

const myform = document.getElementById('form');
const handleSubmit = (e) => {
  e.preventDefault();

  let isValid = true; // form is valid
  let fdata = new FormData(myform);
  const data = Object.fromEntries(fdata);

  //handle radio buttons differently as they are not included in the FormData...
  let radio_btns = Array.from(document.querySelectorAll('input[name=tip-choice]'));
  let choice = radio_btns.findIndex((e)=>e.checked);
  let perc = ['5', '10', '15', '25', '50'];
  if(choice >= 0 && choice < 5) {
    data['percentage'] = perc[choice];
  }
  // console.log(data);

  Object.keys(data).forEach((name) => {
    // pass in the validations to `dataIsValid` as the third argument
    if(!dataIsValid(name, data[name], validations)) {
      // console.log('invalid: ', name, data[name]);
      let div = name2container[name];
      handleError(div, error_messages[name]);
      isValid = false;
    } else {
      let div = name2container[name];
      if(div) {
        clearError(name2container[name]);
      }
      // console.log('valid: ', name, data[name]);
    }
  });

  let result_area = document.querySelector('.result-card');
  if(!isValid) {
    handleError(result_area);
    document.getElementById('tip-amount').innerText = '$0.00';
    document.getElementById('total-amount').innerText = '$0.00';
  }
  else {
    clearError(result_area);
    let cost = parseFloat(data['currency']);
    let num_people = parseInt(data['count']);
    let tip_perc = parseFloat(data['percentage']);
    let tip_amount = cost * (tip_perc / 100.0);
    let total = cost + tip_amount;
  
    let tip_average = tip_amount / num_people;
    let average = total / num_people;
    // console.log(cost, num_people, tip_perc, tip_amount, total, tip_average, average);
    document.getElementById('tip-amount').innerText = '$' + tip_average.toFixed(2);
    document.getElementById('total-amount').innerText = '$' + average.toFixed(2);
  }

  return isValid;
}

const inputs = document.querySelectorAll('input');
for(let input of inputs) {
  input.addEventListener('change', (e)=> handleSubmit(e));
}

const reset = document.getElementById('reset-button');
reset.addEventListener('click', ()=> {
  form.reset();
});

//this prevents hitting RETURN key inside a textbox from submitting the form.
Array.from(document.querySelectorAll('input[type=text]')).forEach(elm => {
  elm.addEventListener('keydown', (event)=>{
  if(event.code == "Enter") {
    event.preventDefault();
    return false;
  }
  })
});
