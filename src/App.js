import React from "react";
import "./App.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/HomeComponent/Home";
import ViewResume from "./components/ViewComponent/ViewResume";
import { Form } from "./components/FormComponent/Form";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
      <Flex flexDirection={'column'} align={'center'}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-resume" element={<Form />} />
        <Route path="/edit-resume/:id" element={<Form />} />
        <Route path="/view-resume/:id" element={<ViewResume/>} />
      </Routes></Flex>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
