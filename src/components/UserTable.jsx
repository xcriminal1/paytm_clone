import { useState, useEffect } from "react";
import {
  Text,
  Button,
  IconButton,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  //add debouncing here
  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://13.127.184.71:3000/api/v1/user/bulk?filter=" + filter,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, [filter]);

  const sendMoney = (user) => {
    console.log(user);
    navigate("/send?userId=" + user._id + "&name=" + user.firstName);
  };

  return (
    <>
      <Stack direction={"row"} p={"5"} justify={"space-between"}>
        <Text fontSize="xl">Users</Text>
        <InputGroup size={"md"} maxW={"sm"}>
          <Input
            placeholder="Search users"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
          <InputRightElement width={"2.5rem"}>
            <IconButton
              colorScheme="blue"
              size={"sm"}
              icon={<SearchIcon />}
            ></IconButton>
          </InputRightElement>
        </InputGroup>
      </Stack>
      <TableContainer px={"3"}>
        <Table variant="striped" colorScheme="blue">
          <Tbody>
            {users.map((user) => (
              <Tr key={user.userId}>
                <Td>
                  {user.firstName} {user.lastName}
                </Td>
                <Td isNumeric>
                  <Button
                    colorScheme={"blue"}
                    onClick={() => {
                      sendMoney(user);
                    }}
                  >
                    Send
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTable;
