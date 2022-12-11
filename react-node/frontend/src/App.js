import "./App.css";
import Login from "./components/Login";
import Posts from "./components/Posts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Regis from "./components/Regis";
function App() {
  return (
    <div className="App">
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/register" element={<Regis />} />
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
