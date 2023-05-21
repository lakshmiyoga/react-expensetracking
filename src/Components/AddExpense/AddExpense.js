import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import './AddExpense.css'

function AddExpense() {

const navigate = useNavigate();

    const [getlist, setList] = useState({
        name: "",
        expenseCategory: "",
        expenseAmount: "",
        paidBy: "",
        date: ""
    })

   

    const onChangeHandler = (e) => {
        setList({ ...getlist, [e.target.name]: e.target.value })
    }

    const clearData = () => {
        setList({
            name: "",
            expenseCategory: "",
            expenseAmount: "",
            paidBy: "",
            date: ""
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/book',{...getlist, email:sessionStorage.getItem('email')}).then(()=>{
            navigate('/dashboard')  
            clearData();
            
        }).catch()
       
    //     let list = sessionStorage.getItem('addlist');
    //  if(list){
    //   list = JSON.parse(list);
    //   list.push(getlist);
    //  }
    //  else{
    //   list=[];
    //   list.push(getlist); 
    //  }
    //  sessionStorage.setItem('addlist',JSON.stringify(list));
    //  clearData();
   
    }
    return (
        <div className="Wrapper">
            <Header />
            <div className="container-fluid">
                <div className="row row-expand-md">
                    <div className="col-2"></div>
                    <div className="col-8 col-xl-8 col-lg-8 col-md-6 col-sm-12 col-12">
                        <form>
                            <h2 className="heading">Add Expense</h2>
                            <div className="row mb-3">
                                <label htmlFor="inputExpenseTilte" className="col-sm-2 col-form-label">Name:</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="name" value={getlist.name} onChange={onChangeHandler} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputExpenseCategory" className="col-sm-2 col-form-label">Expense Category:</label>
                                <div className="col-sm-10">
                                    <select className="form-select" aria-label="Default select example" name="expenseCategory" value={getlist.expenseCategory} onChange={onChangeHandler}>
                                        <option selected>--Select--</option>
                                        <option value="Groceries">Groceries</option>
                                        <option value="Snacks">Snacks</option>
                                        <option value="Restaurant">Restaurant</option>
                                        <option value="Outing">Outing</option>
                                        <option value="Movie">Movie</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputExpenseAmount" className="col-sm-2 col-form-label">Expense Amount:</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" name="expenseAmount" value={getlist.expenseAmount} onChange={onChangeHandler} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPaid" className="col-sm-2 col-form-label">Paid By:</label>
                                <div className="col-sm-10">
                                    <select className="form-select" aria-label="Default select example" name="paidBy" value={getlist.paidBy} onChange={onChangeHandler}>
                                        <option selected>--Select--</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Card">Card</option>
                                        <option value="UPI">UPI</option>
                                        <option value="Account">Account Transfer</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputExpenseDate" className="col-sm-2 col-form-label" >Expense Date:</label>
                                <div className="col-sm-10">
                                    <input type="date" className="form-control" name="date"value={getlist.date} onChange={onChangeHandler} />
                                </div>
                            </div>
                            <div className="text-center">
                               <button type="submit" className="btn btn-primary submit-btn my-4" onClick={onSubmitHandler}>Add</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>

    )
}

export default AddExpense


