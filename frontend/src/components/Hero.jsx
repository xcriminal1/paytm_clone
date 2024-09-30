import { useEffect, useState } from "react";
import { Heading, Stack, Text } from "@chakra-ui/react";
import axios from "axios";

const Hero = () => {
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState(0);

  const getUser = async () => {
    const userResponse = await axios.get(
      "http://13.127.184.71:3000/api/v1/user/details",
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setUser(userResponse.data.user);
    const response = await axios.get(
      "http://13.127.184.71:3000/api/v1/account/balance",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setBalance(response.data.balance);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Stack spacing={4} p={"5"}>
      <Heading>Hi, {user.firstName} {user.lastName}</Heading>
      <Text>Balance: ₹{balance}</Text>
    </Stack>
  );
};

export default Hero;
