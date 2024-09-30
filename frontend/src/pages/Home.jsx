import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UserTable from "../components/UserTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const checkAuth = async () => {
    try {
      const response = await axios.get(
        "http://13.127.184.71:3000/api/v1/user/details",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (e) {
      navigate("/signin");
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div>
      <Navbar />
      <Hero />
      <UserTable />
    </div>
  );
};

export default Home;
