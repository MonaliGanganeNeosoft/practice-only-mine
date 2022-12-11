import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navb from "./components/Navb"
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import Checkout from './components/Checkout';
import GetOrders from './components/GetOrders';
import Profile from "./components/Profile";
import Getuser from "./components/Getuser";
import Updateprofile from './components/Updateprofile';
function App() {
  return (
    <div className='App'>
      <Router>
        <Navb />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard />} />  
          <Route path='/cart' element={<Cart/>}></Route>   
          <Route path="/checkout" element={<Checkout/>}></Route> 
          <Route path="/getorders" element={<GetOrders/>}></Route>
          <Route path='/profile' element={<Profile/>} ></Route>
          <Route path="/user" element={<Getuser/>}/>
          <Route path="/updateprofile" element={<Updateprofile/>}></Route>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
