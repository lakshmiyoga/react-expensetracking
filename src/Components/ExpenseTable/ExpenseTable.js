import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'

function ExpenseTable() {

  const [getForm, setForm] = useState({
    name: "",
    expenseCategory: "",
    expenseAmount: "",
    paidBy: "",
    date: ""
})
  // const [getListData, setListData] = useState(sessionStorage.getItem('addlist') ? JSON.parse(sessionStorage.getItem('addlist')) : []);
  const[getListData, setListData]=useState([])
  const [getId, setId] = useState(-1)
  const [search, setSearch] = useState([])
  // const [show, setShow]= useState(false)

  
  

  const getListAPI =()=>{
    axios.get(`http://localhost:3000/book?email=${sessionStorage.getItem('email')}`).then((result)=>{
       console.log(result.data);
       setListData(result.data)
    }).catch(()=>{
      
    })
  }

  useEffect(()=>{
    getListAPI();
  },[])

  // useEffect(()=>{
  //   onEditSubmitHandler();
  // },[getListData])

  const onChangeHandler = (e) => {
    setForm({ ...getForm, [e.target.name]: e.target.value })
}

  const onDeleteHandler = (index) => {

    axios.delete(`http://localhost:3000/book/${getListData[index].id}`).then(()=>{
       getListAPI();
    }).catch(()=>{

    })


    // let deleteList = [...getListData];
    // deleteList.splice(index, 1);
    // setListData(deleteList)
    // sessionStorage.setItem('deletelist', JSON.stringify(deleteList));
  }

  const onExistBindHandler = (index) => {
    setId(index);
    setForm({
    name:getListData[index].name,
    expenseCategory: getListData[index].expenseCategory,
    expenseAmount:getListData[index].expenseAmount,
    paidBy: getListData[index].paidBy,
    date: getListData[index].date
    })
    // setShow(true);

  }

  const onEditSubmitHandler = () => {

    axios.put(`http://localhost:3000/book/${getListData[getId].id}`,{...getForm,email:getListData[getId].email}).then(()=>{
       getListAPI();
      //  setShow(false);
    }).catch(()=>{

    })


    // let editList = [...getListData]
    // editList[getId].name=getForm.name;
    // editList[getId].expenseCategory=getForm.expenseCategory;
    // editList[getId].expenseAmount=getForm.expenseAmount;
    // editList[getId].paidBy=getForm.paidBy;
    // editList[getId].date=getForm.date;
    // setListData(editList);
    // sessionStorage.setItem('editList', JSON.stringify(editList));
    // clearData();
  }

  const handleSearch = (e) => {
    setSearch(e.target.value); 
    if (e.target.value !== "")  {
      let filteredArr = getListData.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) 
      );
      setListData(filteredArr);
    } else {
      getListAPI();
    }
  }

  const ascending = () => {
    const ascendingList = getListData.sort((a, b) => a.name > b.name ? 1 : -1
    )
    console.log(ascendingList, "ascending");
    setListData([...ascendingList])
  }

  const descending = () => {
    const descendingList = getListData.sort((a, b) => a.name < b.name ? 1 : -1
    )
    setListData([...descendingList])
  }
 

  return (
    <div className="Wrapper">
      <Header login="true" />
      <div>
        <h3 className="heading p-3">Search Expense</h3>
        <div className="row p-3">
          <label for="inputExpenseDate" className="col-sm-2 col-form-label fs-4">Expense Search:</label>
          <div className="col-xl-4">
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" onChange={handleSearch} aria-label="Search" />
              {/* <button className="btn btn-primary" type="submit">Search</button> */}
            </form>
          </div>
        </div>
        <div className="container-fluid">
          <table className="table bg-dark text-white">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Exp.Name
                <button onClick={ascending}>asc</button>
            <button onClick={descending}>des</button>
                </th>
                <th scope="col">Exp.Category</th>
                <th scope="col">Exp.Amount</th>
                <th scope="col">Paid By</th>
                <th scope="col">Exp.Date</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>

              {getListData.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.expenseCategory}</td>
                    <td>{item.expenseAmount}</td>
                    <td>{item.paidBy}</td>
                    <td>{item.date}</td>
                    <td> <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { onExistBindHandler(index) }} >
                      Edit
                    </button></td>
                    <td><button type="button" className="btn btn btn-danger" onClick={() => { onDeleteHandler(index) }}>Delete</button></td>
                  </tr>
                )
              })}



            </tbody>
          </table>



         <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Expense</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                            
                            <div className="row mb-3">
                                <label htmlFor="inputExpenseTilte" className="col-sm-2 col-form-label">Name:</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="name" value={getForm.name} onChange={onChangeHandler}/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputExpenseCategory" className="col-sm-2 col-form-label">Expense Category:</label>
                                <div className="col-sm-10">
                                    <select className="form-select" aria-label="Default select example" name="expenseCategory" value={getForm.expenseCategory} onChange={onChangeHandler} >
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
                                    <input type="number" className="form-control" name="expenseAmount" value={getForm.expenseAmount} onChange={onChangeHandler} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPaid" className="col-sm-2 col-form-label">Paid By:</label>
                                <div className="col-sm-10">
                                    <select className="form-select" aria-label="Default select example" name="paidBy" value={getForm.paidBy}onChange={onChangeHandler}  >
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
                                    <input type="date" className="form-control" name="date" value={getForm.date} onChange={onChangeHandler} />
                                </div>
                            </div>
                            
                        </form>
                </div>
                <div class="modal-footer">
                  {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                  <button type="button" class="btn btn-primary" onClick={onEditSubmitHandler}>Save changes</button>
                </div>
              </div>
            </div>
          </div>

        </div>



      </div>




    </div>

  )
}

export default ExpenseTable
