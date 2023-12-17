import { Button, Box, Flex, Divider, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Header from "../HeaderComponent/Header";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  // Loading initial data from the server
  function getData() {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }
  useEffect(function () {
    getData();
  }, []);
  // Deleting data from the server using a DELETE request
  function deleteResume(id) {
    fetch(`/api/${id}`, {
      method: "DELETE",
    }).then(() => {
      getData();
    });
  }
  return (
    <>
      <Header />
      <Flex
        width={"80%"}
        border="2px solid #4F44E0"
        flexDirection={"column"}
        p={4}
        mt={2}
      >
        <Box width={"25%"}>
          <Link to={"/create-resume"}>
            <Button
              variant={"outline"}
              p={2}
              border={"1px solid #4F44E0"}
              bg={"transparent"}
              color={"#4F44E0"}
              _hover={{ bg: "transparent" }}
            >
              Create New Resume
            </Button>
          </Link>
        </Box>
        <Divider pt={3} />
        <Box pt={3} height={"77vh"} overflow={"scroll"}>
          {data.length ? (
            <>
              {data.map((item) => (
                <Card data={item} deleteResume={deleteResume} />
              ))}
            </>
          ) : (
            <>
              <Text textAlign={"center"} fontSize={"18px"} fontWeight={"700"}>
                No Data Found !
              </Text>
            </>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Home;
