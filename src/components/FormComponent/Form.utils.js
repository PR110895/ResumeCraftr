import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  Button,
  useBreakpointValue,
  VStack,
  List,
  ListItem,
  Box,
  Stack,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ModalComponent } from "../ModalComponent/ModalComponent";
import { CloseIcon, StarIcon } from "@chakra-ui/icons";

export const Profile = ({ setProfileValue, profileValue }) => {
  const onChangeHandler = (event) => {
    event.preventDefault();
    setProfileValue((oldState) => ({
      ...oldState,
      [event.target.id]: event.target.value,
    }));
  };

  return (
    <>
      <Text fontSize={"18px"} fontWeight={"600"}>
        Profile:
      </Text>
      <Flex
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        mt={3}
        rowGap={2}
      >
        <FormControl isRequired width={"49%"}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your full name"
            onChange={onChangeHandler}
            id="fullName"
            value={profileValue.fullName}
          />
        </FormControl>
        <FormControl isRequired width={"49%"}>
          <FormLabel>Current Designation</FormLabel>
          <Input
            type="text"
            laceholder="Enter your Current Designation"
            onChange={onChangeHandler}
            id="current_Designation"
            value={profileValue.current_Designation}
          />
        </FormControl>
        <FormControl isRequired width={"49%"}>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            laceholder="Enter your Location"
            onChange={onChangeHandler}
            id="location"
            value={profileValue.location}
          />
        </FormControl>
        <FormControl isRequired width={"49%"}>
          <FormLabel>E-mail ID</FormLabel>
          <Input
            type="email"
            laceholder="Enter your email"
            onChange={onChangeHandler}
            id="email"
            value={profileValue.email}
          />
        </FormControl>
        <FormControl isRequired width={"49%"}>
          <FormLabel>Phone No.</FormLabel>
          <Input
            type="number"
            placeholder="Enter your Phone No"
            onChange={onChangeHandler}
            id="phone_No"
            value={profileValue.phone_No}
          />
        </FormControl>
        <FormControl width={"49%"}>
          <FormLabel>Website</FormLabel>
          <Input
            type="text"
            placeholder="Enter your Website"
            onChange={onChangeHandler}
            id="website"
            value={profileValue.website}
          />
        </FormControl>
      </Flex>
    </>
  );
};

export const AboutMe = ({ setProfileFormValue, profileFormValue }) => {
  const [aboutMe, setAboutMe] = useState("");
  useEffect(() => {
    setAboutMe(profileFormValue?.aboutMe);
  }, [profileFormValue?.aboutMe]);
  return (
    <>
      <Text fontSize={"18px"} fontWeight={"600"} mt={3}>
        About Me:
      </Text>
      <Textarea
        placeholder="Here you tell about your self"
        id="aboutMe"
        onChange={(e) => {
          e.preventDefault();
          setAboutMe(e.target.value);
          setProfileFormValue((oldState) => ({
            ...oldState,
            [e.target.id]: e.target.value,
          }));
        }}
        value={aboutMe}
      />
    </>
  );
};

export const Education = ({ education, setProfileFormValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const modalSizes = useBreakpointValue({
    base: "xl",
    sm: "xs",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  const removeEducation = (institution) => {
    const list = education.filter((item) => item.institution !== institution);
    if (list.length > 0) {
      setProfileFormValue((oldState) => ({
        ...oldState,
        education: list,
      }));
    } else {
      setProfileFormValue((oldState) => ({
        ...oldState,
        education: [],
      }));
    }
    setEducationList(list);
  };
  useEffect(() => {
    setEducationList(education);
  }, [education]);
  return (
    <>
      <Text fontSize={"18px"} fontWeight={"600"} mt={3}>
        Education:
      </Text>
      <Button
        _hover={{ bg: "transparent" }}
        border={"1px solid #4F44E0"}
        bg={"transparent"}
        color={"#4F44E0"}
        onClick={() => setIsOpen(!isOpen)}
      >
        Add Education
      </Button>
      {educationList?.length ? (
        <List
          mt={5}
          display={"flex"}
          flexWrap={"wrap"}
          rowGap={2}
          columnGap={3}
        >
          {educationList.map((detail) => (
            <Box
              border={"1px solid#4F44E0"}
              maxW="400px"
              p={3}
              pt={0}
              key={detail?.graduationYear}
            >
              <ListItem>
                <CloseIcon
                  color="#4F44E0"
                  fontSize={"14px"}
                  onClick={() => removeEducation(detail.institution)}
                />
                <VStack align="start">
                  <span>Institution: {detail.institution}</span>
                  <span>Degree: {detail.degree}</span>
                  <span>Field of Study: {detail.fieldOfStudy}</span>
                  <span>Graduation Year: {detail.graduationYear}</span>
                  <span>
                    Additional Information:
                    {detail.additionalInformation.slice(0, 25) + "..."}
                  </span>
                </VStack>
              </ListItem>
            </Box>
          ))}
        </List>
      ) : null}
      {isOpen ? (
        <ModalComponent
          defaultModalOpen={false}
          showOverLay={true}
          title={"Acedimic Details"}
          modalbodyBoderTop={`1px solid #4F44E0`}
          onClose={() => setIsOpen(false)}
          isOpen={true}
          size={modalSizes}
          id="Create"
        >
          <AcademicDetailsForm
            educationList={education}
            setIsOpen={setIsOpen}
          />
        </ModalComponent>
      ) : null}
    </>
  );
};

const AcademicDetailsForm = ({ educationList, setIsOpen }) => {
  const [academicDetails, setAcademicDetails] = useState({
    institution: "",
    academics: "",
    fieldOfStudy: "",
    graduationYear: "",
    additionalInformation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcademicDetails({ ...academicDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    educationList.push(academicDetails);
    setIsOpen(false);
    // Clear the form after submission
    setAcademicDetails({
      institution: "",
      Academics: "",
      fieldOfStudy: "",
      graduationYear: "",
      additionalInformation: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing="4" align="stretch">
        <FormControl>
          <FormLabel>Institution</FormLabel>
          <Input
            type="text"
            name="institution"
            value={academicDetails.institution}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Academics</FormLabel>
          <Select
            onChange={handleChange}
            name="academics"
            defaultValue={academicDetails.academics}
          >
            <option selected hidden value={""}>
              Select your Academics
            </option>
            <option value="School">School</option>
            <option value="University">University</option>
            <option value="College">College</option>
            <option value="Profession Certification">
              Profession Certification
            </option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Field of Study</FormLabel>
          <Input
            type="text"
            name="fieldOfStudy"
            value={academicDetails.fieldOfStudy}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Graduation Year</FormLabel>
          <Input
            type="text"
            name="graduationYear"
            value={academicDetails.graduationYear}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Additional Information</FormLabel>
          <Textarea
            name="additionalInformation"
            value={academicDetails.additionalInformation}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          type="submit"
          border={"1px solid #4F44E0"}
          bg={"transparent"}
          color={"#4F44E0"}
          width={"25%"}
          isDisabled={
            academicDetails.institution === "" ||
            academicDetails.academics === "" ||
            academicDetails.fieldOfStudy === "" ||
            academicDetails.graduationYear === "" ||
            academicDetails.additionalInformation === ""
          }
        >
          Add
        </Button>
      </VStack>
    </form>
  );
};

export const Experince = ({ exprince, setProfileFormValue }) => {
  const [exprinceList, setExprinceList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const modalSizes = useBreakpointValue({
    base: "xl",
    sm: "xs",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  const removeExprince = (company) => {
    const list = exprince.filter((item) => item.company !== company);
    if (list.length > 0) {
      setProfileFormValue((oldState) => ({
        ...oldState,
        exprince: list,
      }));
    } else {
      setProfileFormValue((oldState) => ({
        ...oldState,
        exprince: [],
      }));
    }
    setExprinceList(list);
  };
  useEffect(() => {
    setExprinceList(exprince);
  }, [exprince]);
  return (
    <>
      <Text fontSize={"18px"} fontWeight={"600"} mt={3}>
        Experince:
      </Text>
      <Button
        _hover={{ bg: "transparent" }}
        border={"1px solid #4F44E0"}
        bg={"transparent"}
        color={"#4F44E0"}
        onClick={() => setIsOpen(!isOpen)}
      >
        Add Experince
      </Button>
      {exprinceList?.length ? (
        <List
          mt={5}
          display={"flex"}
          flexWrap={"wrap"}
          rowGap={2}
          columnGap={3}
        >
          {exprinceList.map((detail) => (
            <Box
              border={"1px solid#4F44E0"}
              maxW="400px"
              p={3}
              pt={0}
              key={detail?.startDate}
            >
              <ListItem>
                <CloseIcon
                  color="#4F44E0"
                  fontSize={"14px"}
                  onClick={() => removeExprince(detail.company)}
                />
                <VStack align="start">
                  <span>Designation: {detail.designation}</span>
                  <span>Company: {detail.company}</span>
                  <span>Start Date: {detail.startDate}</span>
                  <span>End Date: {detail.endDate}</span>
                  <span>Role: {detail.role.slice(0, 40) + "..."}</span>
                </VStack>
              </ListItem>
            </Box>
          ))}
        </List>
      ) : null}
      {isOpen ? (
        <ModalComponent
          defaultModalOpen={false}
          showOverLay={true}
          title={"Experince Details"}
          modalbodyBoderTop={`1px solid #4F44E0`}
          onClose={() => setIsOpen(false)}
          isOpen={true}
          size={modalSizes}
          id="Create"
        >
          <ExperinceDetailsForm
            experinceList={exprince}
            setIsOpen={setIsOpen}
          />
        </ModalComponent>
      ) : null}
    </>
  );
};

const ExperinceDetailsForm = ({ experinceList, setIsOpen }) => {
  const [exprinceDetails, setExprinceDetails] = useState({
    designation: "",
    company: "",
    startDate: "",
    endDate: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExprinceDetails({ ...exprinceDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    experinceList.push(exprinceDetails);
    setIsOpen(false);
    // Clear the form after submission
    setExprinceDetails({
      designation: "",
      company: "",
      startDate: "",
      endDate: "",
      role: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing="4" align="stretch">
        <FormControl>
          <FormLabel>Designation</FormLabel>
          <Input
            type="text"
            name="designation"
            value={exprinceDetails.designation}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Company</FormLabel>
          <Input
            type="text"
            name="company"
            value={exprinceDetails.company}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            name="startDate"
            value={exprinceDetails.startDate}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>End date</FormLabel>
          <Input
            type="date"
            name="endDate"
            value={exprinceDetails.endDate}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Role(Profile)</FormLabel>
          <Textarea
            name="role"
            value={exprinceDetails.role}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          type="submit"
          border={"1px solid #4F44E0"}
          bg={"transparent"}
          color={"#4F44E0"}
          width={"25%"}
          onClick={handleSubmit}
          isDisabled={
            exprinceDetails.designation === "" ||
            exprinceDetails.company === "" ||
            exprinceDetails.startDate === "" ||
            exprinceDetails.endDate === "" ||
            exprinceDetails.role === ""
          }
        >
          Add
        </Button>
      </VStack>
    </form>
  );
};

export const Project = ({ project, setProfileFormValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const modalSizes = useBreakpointValue({
    base: "xl",
    sm: "xs",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  const removeProject = (name) => {
    const list = project.filter((item) => item.name !== name);
    if (list.length > 0) {
      setProfileFormValue((oldState) => ({
        ...oldState,
        project: list,
      }));
    } else {
      setProfileFormValue((oldState) => ({
        ...oldState,
        project: [],
      }));
    }
    setProjectList(list);
  };
  useEffect(() => {
    setProjectList(project);
  }, [project]);
  return (
    <>
      <Text fontSize={"18px"} fontWeight={"600"} mt={3}>
        Project:
      </Text>
      <Button
        _hover={{ bg: "transparent" }}
        border={"1px solid #4F44E0"}
        bg={"transparent"}
        color={"#4F44E0"}
        onClick={() => setIsOpen(!isOpen)}
      >
        Add Project
      </Button>
      {projectList?.length ? (
        <List
          mt={5}
          display={"flex"}
          flexWrap={"wrap"}
          rowGap={2}
          columnGap={3}
        >
          {projectList.map((detail, i) => (
            <Box border={"1px solid #4F44E0"} maxW="400px" p={3} pt={0} key={i}>
              <ListItem>
                <CloseIcon
                  color="#4F44E0"
                  fontSize={"14px"}
                  onClick={() => removeProject(detail.name)}
                />
                <VStack align="start">
                  <span>Name: {detail.name}</span>
                  <span>Duration: {detail.duration}</span>
                  <span>Url: {detail.url.slice(0, 40) + "..."}</span>
                  <span>
                    Description: {detail.description.slice(0, 40) + "..."}
                  </span>
                </VStack>
              </ListItem>
            </Box>
          ))}
        </List>
      ) : null}
      {isOpen ? (
        <ModalComponent
          defaultModalOpen={false}
          showOverLay={true}
          title={"Experince Details"}
          modalbodyBoderTop={`1px solid #4F44E0`}
          onClose={() => setIsOpen(false)}
          isOpen={true}
          size={modalSizes}
          id="Create"
        >
          <ProjectDetailsForm projectList={project} setIsOpen={setIsOpen} />
        </ModalComponent>
      ) : null}
    </>
  );
};

const ProjectDetailsForm = ({ projectList, setIsOpen }) => {
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    duration: "",
    url: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails({ ...projectDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    projectList.push(projectDetails);
    setIsOpen(false);
    // Clear the form after submission
    setProjectDetails({
      designation: "",
      company: "",
      startDate: "",
      endDate: "",
      role: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing="4" align="stretch">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={projectDetails.name}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Duration</FormLabel>
          <Input
            type="text"
            name="duration"
            value={projectDetails.duration}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>URL</FormLabel>
          <Input
            type="text"
            name="url"
            value={projectDetails.url}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={projectDetails.description}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          type="submit"
          border={"1px solid #4F44E0"}
          bg={"transparent"}
          color={"#4F44E0"}
          width={"25%"}
          onClick={handleSubmit}
          isDisabled={
            projectDetails.description === "" ||
            projectDetails.name === "" ||
            projectDetails.name === "" ||
            projectDetails.url === ""
          }
        >
          Add
        </Button>
      </VStack>
    </form>
  );
};

export const SkillAddComponent = ({ skillsList, setProfileFormValue }) => {
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [rating, setRating] = useState(0);

  const handleSkillChange = (e) => {
    setCurrentSkill(e.target.value);
  };

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const addSkill = () => {
    if (currentSkill && rating > 0) {
      setSkills([
        ...skills,
        {
          skill: currentSkill,
          rating,
        },
      ]);
      setCurrentSkill("");
      setRating(0);
      skillsList.push({
        skill: currentSkill,
        rating,
      });
    }
  };

  const removeSkills = (skill) => {
    const list = skills.filter((item) => item.skill !== skill);
    setSkills(list);
    if (list.length > 0) {
      setProfileFormValue((oldState) => ({
        ...oldState,
        skills: list,
      }));
    } else {
      setProfileFormValue((oldState) => ({
        ...oldState,
        skills: [],
      }));
    }
  };
  useEffect(() => {
    setSkills(skillsList);
  }, [skillsList]);
  return (
    <>
      <Text fontSize={"18px"} fontWeight={"600"} mt={3}>
        Skills:
      </Text>
      <Flex direction="column" maxW="800px" p={4} pb={2} borderRadius="md">
        <FormControl>
          <Flex align="center" columnGap={3}>
            <Stack direction="row" spacing={2}>
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  w={6}
                  h={6}
                  color={index < rating ? "#4F44E0" : "gray.300"}
                  cursor="pointer"
                  onClick={() => handleRatingClick(index)}
                />
              ))}
            </Stack>
            <Input
              flex="1"
              ml={3}
              type="text"
              value={currentSkill}
              onChange={handleSkillChange}
              placeholder="Enter Skill"
            />
            <Button
              onClick={addSkill}
              border={"1px solid #4F44E0"}
              bg={"transparent"}
              color={"#4F44E0"}
            >
              Add Skill
            </Button>
          </Flex>
        </FormControl>

        <ul
          style={{
            marginTop: "20px",
            paddingLeft: "0",
            listStyleType: "none",
            display: "flex",
            flexWrap: "wrap",
            rowGap: "4px",
            columnGap: "4px",
          }}
        >
          {skills.map((item, index) => (
            <Flex
              key={index}
              alignItems={"center"}
              p={2}
              mb={2}
              borderRadius={"4px"}
              bg="#4F44E04D"
              w="200px"
              justifyContent={"space-between"}
            >
              <li>
                <strong style={{ marginRight: "10px" }}>{item.skill}</strong>
                {Array.from(
                  { length: item.rating },
                  (_, index) => index + 1
                ).map((item, i) => (
                  <StarIcon
                    key={i}
                    w={4}
                    h={4}
                    color={"#4F44E0"}
                    cursor="pointer"
                    onClick={() => handleRatingClick(index)}
                  />
                ))}
              </li>
              <CloseIcon
                color={"#4F44E0"}
                justifyContent={"end"}
                fontSize={"12px"}
                onClick={() => removeSkills(item.skill)}
              />
            </Flex>
          ))}
        </ul>
      </Flex>
    </>
  );
};
