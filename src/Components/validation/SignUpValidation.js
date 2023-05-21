// Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
// "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"


export default function SignUpValidation(values) {
    let errors={};
    let emailValidator=/^\w+@[a-zA-Z_]+?\.[a-zA-Z_]{2,3}$/;
    let passwordValidator=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if(!values.firstName){
        errors.firstName="Firstname required"
    }
    if(!values.lastName){
        errors.lastName="Lastname required"
    }
    if(!values.email){
        errors.email="email required"
    }else if(!emailValidator.test(values.email)){
        errors.email="email invalid"
    }
    if(!values.password){
        errors.password="password required"
    }else if(!passwordValidator.test(values.password)){
        errors.password="password invalid"
    }

    // confirm password 

    // if(!values.password2.trim()){
    //     errors.password="password required"
    // }else if(values.password !== values.password2){
    //     errors.password2="password does not match"
    // }

    return errors;
}