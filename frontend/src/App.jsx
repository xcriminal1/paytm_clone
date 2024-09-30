import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Send from "./pages/Send";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<LoadingPage />} />
        <Route path="home" element={<Home />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="send" element={<Send />} />
      </Routes>
    </Router>
  );
}

export default App;
