import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
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
      if (response.status === 200) {
        navigate("/home");
      }
    } catch (e) {
      navigate("/signin");
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return <div>Loading ....</div>;
};

export default LoadingPage;
