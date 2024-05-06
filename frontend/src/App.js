import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/userSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
const App = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;