  import ExpenseTable from './Components/ExpenseTable/ExpenseTable';
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import AddExpense from './Components/AddExpense/AddExpense';
import Modal from './Components/Modal';


function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/login' element={ <Login/>}/>
      <Route path='/dashboard' element={<ExpenseTable/>}/>
      <Route path='/addexpense' element={<AddExpense/>}/>
     </Routes>
     </BrowserRouter>
     {/* <Modal/> */}
    </div>
  );
}

export default App;
