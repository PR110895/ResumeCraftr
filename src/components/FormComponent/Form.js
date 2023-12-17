import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import {
  Profile,
  AboutMe,
  Education,
  Experince,
  Project,
  SkillAddComponent,
} from "./Form.utils";
import Header from "../HeaderComponent/Header";
import { useNavigate, useParams } from "react-router-dom";

export const Form = () => {
  const [profileFormValue, setProfileFormValue] = useState({
    profileValue: {
      fullName: "",
      current_Designation: "",
      location: "",
      email: "",
      phone_No: "",
      website: "",
    },
    aboutMe: "",
    education: [],
    exprince: [],
    project: [],
    skills: [],
  });

  const [profileValue, setProfileValue] = useState({
    fullName: "",
    current_Designation: "",
    location: "",
    email: "",
    phone_No: "",
    website: "",
  });
  const { id } = useParams();
  function getData(id) {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => setProfileFormValue(data?.resume));
  }
  useEffect(() => {
    if (id !== undefined) {
      getData(id);
    }
  }, []);
  let navigate = useNavigate();
  const [error, setError] = useState(false);

  function onSubmitHandlaer() {
    setError(false);
    if (
      profileFormValue.education.length===0 ||
      profileFormValue.exprince.length===0 ||
      profileFormValue.project.length===0 ||
      profileFormValue.skills.length===0 ||
      profileValue.fullName === "" ||
      profileValue.location === "" ||
      profileValue.current_Designation === "" ||
      profileValue.email === "" ||
      profileValue.phone_No === ""
    ) {
      setError(true);
    } else {
      if (id !== undefined) {
        const resume = { ...profileFormValue, profileValue: profileValue };
        fetch(`/api/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resume }),
        })
          .then((res) => res.json())
          .then((newData) => {
            console.log("first", newData);
            navigate("/");
          })
          .finally(() => {
            setProfileFormValue({
              profileValue: {},
              aboutMe: "",
              education: [],
              exprince: [],
              project: [],
              skills: [],
            });
          });
      } else {
        const resume = { ...profileFormValue, profileValue: profileValue };
        fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: uuidv4(), resume }),
        })
          .then((res) => res.json())
          .then((newData) => {
            console.log("first", newData);
            navigate("/");
          })
          .finally(() => {
            setProfileFormValue({
              profileValue: {},
              aboutMe: "",
              education: [],
              exprince: [],
              project: [],
              skills: [],
            });
          });
      }
    }
  }
  useEffect(() => {
    if (profileFormValue.profileValue !== {}) {
      setProfileValue(profileFormValue.profileValue);
    }
  }, [profileFormValue.profileValue]);

  return (
    <>
      <Header back="back" />
      <Box
        border="1px solid #4F44E0"
        p={5}
        mt={5}
        maxH={"89vh"}
        overflow={"scroll"}
      >
        <Profile
          setProfileValue={setProfileValue}
          profileValue={profileValue}
        />
        <AboutMe
          setProfileFormValue={setProfileFormValue}
          profileFormValue={profileFormValue}
        />
        <Education education={profileFormValue.education} />
        <Experince exprince={profileFormValue.exprince} />
        <Project project={profileFormValue.project} />
        <SkillAddComponent skillsList={profileFormValue.skills} />
        {error ? (
          <Text p={2} fontWeight={"600"} fontSize={"16px"} color={"red"}>
            Please fill all feilds with correct data !
          </Text>
        ) : null}

        <Button
          border={"1px solid #4F44E0"}
          bg={"transparent"}
          color={"#4F44E0"}
          onClick={onSubmitHandlaer}
        >
          {id !== undefined ? "Update Resume" : "Create Resume"}
        </Button>
      </Box>
    </>
  );
};
