import { useState } from "react";
import {
  Text,
  Heading,
  Link,
  Button,
  Stack,
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const SignUpHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://13.127.184.71:3000/api/v1/user/signup",
        userDetails
      );
      localStorage.setItem("token", response.data.token);
      setUserDetails({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
      });
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handlePassword = () => { 
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Card w={"sm"}>
        <CardHeader>
          <Heading size="lg">Sign Up</Heading>
        </CardHeader>
        <CardBody>
          <Stack gap={0}>
            <FormLabel>First name</FormLabel>
            <Input
              placeholder="Jhon"
              mb={3}
              onChange={(e) => {
                setUserDetails({ ...userDetails, firstName: e.target.value });
              }}
              value={userDetails.firstName}
            />
            <FormLabel>Last name</FormLabel>
            <Input
              placeholder="Doe"
              mb={3}
              onChange={(e) => {
                setUserDetails({ ...userDetails, lastName: e.target.value });
              }}
              value={userDetails.lastName}
            />
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="abc@xyz.com"
              type="email"
              mb={3}
              onChange={(e) => {
                setUserDetails({ ...userDetails, username: e.target.value });
              }}
              value={userDetails.username}
            />
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="helloworld"
                type={showPassword ? "text" : "password"}
                mb={3}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, password: e.target.value });
                }}
                value={userDetails.password}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handlePassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Button
              colorScheme="blue"
              mt={3}
              alignSelf={"center"}
              onClick={SignUpHandler}
              isLoading={isLoading}
            >
              Sign up
            </Button>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter textAlign={"center"}>
          <Text as={"i"}>
            Already have an account?{" "}
            <Link href="/signin" textColor={"blue"}>
              Sign in
            </Link>
          </Text>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpForm;
