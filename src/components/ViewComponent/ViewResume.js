import React, { useState, useEffect } from "react";
import Header from "../HeaderComponent/Header";
import { Flex, Text, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";

const ViewResume = () => {
  const [profileData, setProfileData] = useState();
  const { id } = useParams();
  function getData(id) {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => setProfileData(data?.resume));
  }
  useEffect(() => {
    if (id !== undefined) {
      getData(id);
    }
  }, []);
  return (
    <>
      <Header back="back" />
      <Profile profileData={profileData} />
    </>
  );
};

export default ViewResume;

const Profile = ({ profileData }) => {
  return (
    <Box w="100%" h="90vh" overflow={"scroll"}>
      <Flex
        w={"100%"}
        p={2}
        justifyContent="center"
        alignItems={"center"}
        flexDir={"column"}
        rowGap={2}
      >
        <Box width={"80%"} border={"1px solid #4F44E0"} p={4}>
          <Text fontSize={"18px"} fontWeight={"700"}>
            {profileData?.profileValue?.fullName}
          </Text>
          <Text fontSize={"16px"} fontWeight={"500"}>
            {profileData?.profileValue?.current_Designation}
          </Text>
          <Text fontSize={"14px"} fontWeight={"500"}>
            Location: {profileData?.profileValue?.location}
          </Text>
          <Text fontSize={"14px"} fontWeight={"500"}>
            Email: {profileData?.profileValue?.email}
          </Text>
          <Text fontSize={"14px"} fontWeight={"500"}>
            Pnone No: {profileData?.profileValue?.phone_No}
          </Text>
        </Box>
        <Box width={"80%"} border={"1px solid #4F44E0"} p={4}>
          <Text fontSize={"18px"} fontWeight={"700"}>
            About Me:
          </Text>
          <Text fontSize={"16px"} fontWeight={"500"}>
            {profileData?.aboutMe}
          </Text>
        </Box>
        <Box width={"80%"} border={"1px solid #4F44E0"} p={4}>
          <Text fontSize={"18px"} fontWeight={"700"}>
            Education:
          </Text>
          <Flex flexWrap={"wrap"} rowGap={3} columnGap={3} mt={3}>
            {profileData?.education.map((item, i) => (
              <Box key={i} boxShadow="md" p={4}>
                <Text fontSize={"16px"} fontWeight={"600"}>
                  {item?.institution}
                </Text>
                <Text fontSize={"14px"} fontWeight={"500"}>
                  {item?.academics} in {item.fieldOfStudy}
                </Text>
                <Text fontSize={"14px"} fontWeight={"500"}>
                  {item?.graduationYear}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
        <Box width={"80%"} border={"1px solid #4F44E0"} p={4}>
          <Text fontSize={"18px"} fontWeight={"700"}>
            Experince:
          </Text>
          <Flex flexWrap={"wrap"} rowGap={3} columnGap={3} mt={3}>
            {profileData?.exprince.map((item, i) => (
              <Box key={i} boxShadow="md" p={4}>
                <Text fontSize={"16px"} fontWeight={"600"}>
                  {item?.designation}
                </Text>
                <Text fontSize={"14px"} fontWeight={"500"}>
                  {item?.company}, {item.startDate} to {item.endDate}
                </Text>
                <Text fontSize={"14px"} fontWeight={"500"}>
                  Role(Job Description): {item?.role.slice(0, 35) + "..."}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
        <Box width={"80%"} border={"1px solid #4F44E0"} p={4}>
          <Text fontSize={"18px"} fontWeight={"700"}>
            Project:
          </Text>
          <Flex flexWrap={"wrap"} rowGap={3} columnGap={3} mt={3}>
            {profileData?.project.map((item, i) => (
              <Box key={i} boxShadow="md" p={4}>
                <Text fontSize={"16px"} fontWeight={"600"}>
                  Project Name: {item?.name}
                </Text>
                <Text fontSize={"14px"} fontWeight={"500"}>
                  Duration: {item?.duration}
                </Text>
                <Text fontSize={"14px"} fontWeight={"500"}>
                  Url: {item?.url.slice(0, 35) + "..."}
                </Text>
                <Text fontSize={"12px"} fontWeight={"500"}>
                  Description: {item?.description}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
        <Box width={"80%"} border={"1px solid #4F44E0"} p={4}>
          <Text fontSize={"18px"} fontWeight={"700"}>
            Skills:
          </Text>
          <Flex flexWrap={"wrap"} rowGap={3} columnGap={3} mt={3}>
            {profileData?.skills?.map((item, index) => (
              <ul
                style={{
                  listStyleType: "none",
                  display: "flex",
                  flexWrap: "wrap",
                  rowGap: "4px",
                  columnGap: "4px",
                }}
              >
                <Flex
                  key={index}
                  alignItems={"center"}
                  textAlign={"center"}
                  p={2}
                  mb={2}
                  pr={6}
                  borderRadius={"4px"}
                  bg="#4F44E04D"
                  justifyContent={"space-between"}
                >
                  <li>
                    <strong style={{ marginRight: "10px", fontSize: "16px" }}>
                      {item.skill}
                    </strong>
                    {Array.from(
                      { length: item.rating },
                      (_, index) => index + 1
                    ).map((item, i) => (
                      <StarIcon
                        key={i}
                        fontSize={"16px"}
                        color={"#4F44E0"}
                        cursor="pointer"
                      />
                    ))}
                  </li>
                </Flex>
              </ul>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
