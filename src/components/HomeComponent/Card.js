import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { ViewIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Card = ({ data, deleteResume }) => {
  let navigate = useNavigate();
  return (
    <Flex
      width={"90%"}
      p={4}
      m={2}
      ml={0}
      border={"1px solid #4F44E0"}
      bg={"#4F44E04D"}
      color={"#1b14ed"}
      alignItems={"center"}
      key={data.id}
    >
      <Text width={"60%"}>
        {data?.resume?.profileValue?.fullName}
      </Text>
      <Flex width={"40%"} justifyContent={"space-around"}>
        <ViewIcon onClick={() => navigate(`/view-resume/${data.id}`)} />
        <EditIcon onClick={() => navigate(`/edit-resume/${data.id}`)} />
        <DeleteIcon onClick={() => deleteResume(data.id)} />
      </Flex>
    </Flex>
  );
};

export default Card;
