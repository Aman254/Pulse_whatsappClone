import { useSelector } from "react-redux";
import { logout } from "./features/userSlice";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Error from "./components/Error.jsx";

const App = () => {
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
