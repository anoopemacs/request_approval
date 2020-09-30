//TODO: Keep it blind accessible
//TODO: use propTypes to solidify json format

import React from "react";
//import logo from "./logo.svg";
import "./App.css";

import json_data from "./request_data.json";

function Logo() {
  return (
    <div className="border0" alt="airbase logo">
      airbase
    </div>
  );
}

function Security() {
  return <div className="border0">Security0</div>;
}

function BoxHeading() {
  return <div className="border0">BoxHeading0</div>;
}

function LeftBox() {
  return <div className="border0">LeftBox</div>;
}

function RightBox({ approvers }) {
  console.log(approvers);
  return <div className="border0">RightBox</div>;
}

function ApproveDeny() {
  return <div>Approve0, Deny0</div>;
}

function MainBox({ json_data }) {
  console.log(json_data);
  return (
    <div className="border0">
      <BoxHeading />
      <LeftBox />
      <RightBox approvers={json_data.approvers} />
      <ApproveDeny />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
	  </header>*/}
      <Logo />
      <Security />
      <MainBox json_data={json_data} />
    </div>
  );
}

export default App;
