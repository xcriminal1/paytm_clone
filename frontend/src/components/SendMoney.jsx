import {useState} from "react";
import {
  Text,
  Heading,
  Circle,
  Box,
  Button,
  ButtonGroup,
  Stack,
  Card,
  CardHeader,
  CardBody,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SendMoney = () => {
  const [amount, setAmount] = useState(0);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");
  const sendMoney = async () => {
    try {
      const response = await axios.post(
        "http://13.127.184.71:3000/api/v1/account/transfer",
        {
          to: userId,
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Card w={"sm"}>
        <CardHeader textAlign={"center"}>
          <Heading size="2xl">Send Money</Heading>
        </CardHeader>
        <CardBody>
          <Stack gap={0}>
            <Stack direction={"row"} gap={"3"} mb={"3"}>
              <Circle size={"40px"} bg={"green"} color={"white"}>
                <Box as="span" fontWeight="bold" fontSize="lg">
                  {name[0]}
                </Box>
              </Circle>
              <Text fontSize="lg" as={"kbd"} mt={"1.5"} textAlign={"center"}>
                {name}
              </Text>
            </Stack>
            <FormLabel>Amount</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="green.500"
                fontSize="1.2em"
              >
                ₹
              </InputLeftElement>
              <Input placeholder="1,000" type="number" mb={3} onChange={(e)=>{setAmount(e.target.value)}}/>
            </InputGroup>
            <ButtonGroup className="flex justify-end">
              <Button colorScheme="blue" mt={3} onClick={sendMoney}>
                Send
              </Button>
              <Button colorScheme="gray" mt={3}>
                Cancel
              </Button>
            </ButtonGroup>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
};

export default SendMoney;
