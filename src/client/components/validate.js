import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {

  let errors = {};

  if(validator.isEmpty(data.id)){
    errors.id = "this field is required"
  }

  if(validator.isEmpty(data.password)){
    errors.password = "this field is required"
  }else if(data.password.length < 4){
    errors.password = "the password must be more 3 digit"
  }



  return {
    errors,
    isValid: isEmpty(errors)
  }

}
