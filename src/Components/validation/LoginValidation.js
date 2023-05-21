export default function LoginValidation(values) {
    let errors={};
    let emailValidator=/^\w+@[a-zA-Z_]+?\.[a-zA-Z_]{2,3}$/;
    let passwordValidator=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    
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