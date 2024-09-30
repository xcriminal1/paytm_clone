import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

const SignUp = () => {
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
      const err = e.response.data;
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className={"flex justify-center items-center h-screen"}>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
