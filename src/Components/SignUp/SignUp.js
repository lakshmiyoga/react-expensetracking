import React, { useState } from 'react'
import Header from '../Header/Header'
import SignUpValidation from '../validation/SignUpValidation'
import { useNavigate } from 'react-router-dom'
import './SignUp.css'
import axios from 'axios'


function SignUp() {

  const navigate = useNavigate()

  const [values, setValues]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })

  const[errors, setErrors]=useState("")
  

  const onChangeHandler =(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }

  const onSubmitHandler=(e)=>{
    e.preventDefault();
    if(Object.keys(SignUpValidation(values)).length>0){
      setErrors(SignUpValidation(values));
    }
    else{
  
    axios.post('http://localhost:3000/registration',values).then((result)=>{
      console.log(result.data);
     
      navigate('/login')
    }).catch((err)=>{
      console.log(err, "error");
    })
   
    
    // localStorage.setItem("email",values.email)
    // localStorage.setItem("password",values.password)

    
    }
   

  }

  return (
    <div className="Wrapper">
    <Header login="false"/>

    <div className="container-fluid">
      <div className="row row-expand-md">
         <div className="col-4"></div>
         <div className="col-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
          <form>
            <h2 className="heading">SignUp</h2>
            <div className="form-group ">
                
              <label htmlFor="exampleInputFirstName">FirstName</label>
              <input type="text" className="form-control" name="firstName" value={values.firstName} onChange={onChangeHandler}/>
            {errors.firstName && <p>{errors.firstName}</p>}
            </div>
            <div className="form-group">
                
              <label htmlFor="exampleInputLastName">LastName</label>
              <input type="text" className="form-control" name="lastName"value={values.lastName} onChange={onChangeHandler}/>
              {errors.lastName && <p>{errors.lastName}</p>}
            </div>
              <div className="form-group">
                
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" name="email" value={values.email} onChange={onChangeHandler}/>
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" name="password" value={values.password} onChange={onChangeHandler}/>
                {errors.password && <p>{errors.password}</p>}
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary submit-btn my-4" onClick={onSubmitHandler}>Submit</button>
              
              </div>
              
            </form>
         </div>
         <div className="col-4"></div>
        </div>
        </div>
       
      </div>
  )
}

export default SignUp
