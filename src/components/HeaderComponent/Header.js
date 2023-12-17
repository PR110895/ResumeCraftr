import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = ({ back = "" }) => {
  return (
    <Flex width={"100%"} h={"12%"} bg={"#4F44E0"} color={"white"} p={3} justifyContent={'space-between'}>
      <Text fontSize={"22px"} fontWeight={"600"}>
        ResumeCraftr
      </Text>
      {back !== "" ? <Link to={"/"}><Button _hover={{bg:'transparent'}} variant={'outline'} color={'white'}>Back</Button></Link> : null}
    </Flex>
  );
};

export default Header;
