import "./Login.css"
import React, { useState } from 'react'
import Header from "../Header/Header";
import LoginValidation from "../validation/LoginValidation";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

function Login() {

    const navigate = useNavigate()

    const [values, setValues]=useState({
        email:"",
        password:""
      })
    
      const[errors, setErrors]=useState("")

      const onChangeHandler =(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
      }
    
      const onSubmitHandler=(e)=>{
        e.preventDefault();
        if(Object.keys(LoginValidation(values)).length>0){
            setErrors(LoginValidation(values));
          }else{
            axios.get(`http://localhost:3000/registration?email=${values.email}&password=${values.password}`).then((result)=>{
            if(result.data && result.data.length>0){
                sessionStorage.setItem('email', values.email);
                navigate('/addExpense')
            }else{
                alert("email and password not match")
            }
            
          }).catch((err)=>{
      console.log(err, "error");
          })
          }

        
        // setErrors(LoginValidation(values));
        // console.log(values);

        // const email =localStorage.getItem('email');
        // const password =localStorage.getItem('password');
        // if(values.email!==email){
        //     alert("email not match")
        //     return;
        // }
        // if(values.password!==password){
        //     alert("password not match")
        //     return;
        // } 
        // navigate('/addexpense')
      }
    return (
        <div className="Wrapper">
            <Header/>
            
            <div className="container-fluid">
                <div className="row row-expand-md">
                    <div className="col-4"></div>
                    <div className="col-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                        <form>
                            <h2 className="heading">Login</h2>
                            <div className="form-group">

                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" name="email" value={values.email} onChange={onChangeHandler} />
                                {errors.email && <p>{errors.email}</p>}

                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" name="password" value={values.password} onChange={onChangeHandler} />
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

export default Login;