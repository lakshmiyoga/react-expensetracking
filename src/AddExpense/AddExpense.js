import './AddExpense.css';
import { Link } from 'react-router-dom';
import { useState,useNavigate } from 'react';
import axios from 'axios';
import Header from '../Header/Header';

function AddExpense() {
    const navigate = useNavigate();

    const [getlist, setList] = useState({
        expenseTitle: "",
        expenseNotes:"",
        expenseCategory: "",
        expenseAmount: "",
        paidBy: "",
        expenseDate: ""
    })

   

    const onChangeHandler = (e) => {
        setList({ ...getlist, [e.target.name]: e.target.value })
    }

    const clearData = () => {
        setList({
            expenseTitle: "",
            expenseNotes:"",
            expenseCategory: "",
            expenseAmount: "",
            paidBy: "",
            expenseDate: ""
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/book',{...getlist, email:sessionStorage.getItem('email')}).then(()=>{
            clearData();
            navigate('/dashboard')
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
        <div className="container-fluid">
            <div className="firstpage">
                <Header/>

                <div className="row row-1">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <form class="expense-tag">
                            <div className="form-group">
                                <label htmlFor="expensetitle">Expense Title</label>
                                <input type="text" pattern="[Link-Za-z]{3}" className="form-control" id="expensetitle" name="expenseTitle" value={getlist.expenseTitle} onChange={onChangeHandler} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expensenotes">Expense Notes</label>
                                <input type="text" pattern="[Link-Za-z]{3}" className="form-control" name="expenseNotes" value={getlist.expenseNotes} onChange={onChangeHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expensecategory">Expense Category</label>
                                <select  id="expensecategory" name="expenseCategory" value={getlist.expenseCategory} onChange={onChangeHandler} className="dropdowns">
                                    <option>--Select--</option>
                                    <option value="groceries">Groceries</option>
                                    <option value="snacks">Snacks</option>
                                    <option value="restaurant">Restaurant"</option>
                                    <option value="outing">Outing</option>
                                    <option value="movie">Movie</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="expenseamount">Expense Amount</label>
                                <input type="number" className="form-control" id="expenseamount" name="expenseAmount" value={getlist.expenseAmount} onChange={onChangeHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expensecategory" >Paid By</label>
                                <select id="paidby" className="dropdowns" name="paidBy" value={getlist.paidBy} onChange={onChangeHandler}>
                                    <option>--Select--</option>
                                    <option value="cash">Cash</option>
                                    <option value="card">Card</option>
                                    <option value="upi">UPI</option>
                                    <option value="accounttransfer">Account Transfer</option>

                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="expensedate">Expense Date</label>
                                <input type="date" className="form-control" id="expenseDate" name="expenseDate" value={getlist.expenseDate} onChange={onChangeHandler} />
                            </div>

                            <button type="submit" className="btn btn-lg signup-btn" onClick={onSubmitHandler}>Add Expense</button>
                        </form>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        </div>
    );
}

export default AddExpense;