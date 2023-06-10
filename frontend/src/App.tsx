import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { HeaderSimple } from "./HeaderSimple";
import { Widget } from "./Widget";
import { Container, Center } from "@mantine/core";
function App() {
  return (
    <>
      <HeaderSimple />
      <Container>
        <Center>
          <Widget />
        </Center>
      </Container>
    </>
  );
}

export default App;
