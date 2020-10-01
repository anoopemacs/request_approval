//TODO: Keep it blind accessible
//TODO: use propTypes to solidify json format
//TODO: Approve button should warn if asked amount exceeds budget in json

import React from "react";
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

function MainBoxHeading() {
  return <div className="border0">MainBoxHeading0</div>;
}

function RequesterBox() {
  return <div className="border0">RequesterBox</div>;
}

function ApproverBox({ approvers }) {
  console.log(approvers);
  return <div className="border0">ApproverBox</div>;
}

function ApproveDeny() {
  return <div>Approve0, Deny0</div>;
}

function MainBox({ json_data }) {
  console.log(json_data);
  return (
    <div className="border0">
      <MainBoxHeading />
      <RequesterBox />
      <ApproverBox approvers={json_data.approvers} />
      <ApproveDeny />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Logo />
      <Security />
      <MainBox json_data={json_data} />
    </div>
  );
}

export default App;
