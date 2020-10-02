//TODO: Keep it blind accessible
//TODO: use propTypes to solidify json format, requires npm i prop-types
//TODO: Approve button should warn if asked amount exceeds budget in json
//TODO: diagram 1: component names drawn on top of the design diagram
//TODO: diagram 2: which component owns which piece of json data
//TODO: include a library that shows logo of attached files, eg: .xls logo in design doc
//TODO: if approvers_accepted + approvers_pending != approvers, then raise an unhandled approver_status exception.
//TODO: mention npm, React version in readme

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
  return (
    <div className="border0">
      RequesterBox<br/>
    </div>
  );
}

function ApproversApproved({approvers_accepted}) {
  return (
    <>
      <br/><b>Approved</b>
      {JSON.stringify(approvers_accepted)}
    </>
  );
}
function ApproversPending({approvers_pending}) {
  return (
    <>
      <br/><b>Pending</b>
      {JSON.stringify(approvers_pending)}
    </>
  );
}

function ApproverBox({ approvers }) {
  console.log("approvers", approvers);
  const approvers_accepted = approvers.filter(approver => approver.status === "accepted");
  const approvers_pending = approvers.filter(approver => approver.status === "created");
  return (
    <div className="border0">
      ApproverBox
      <ApproversApproved approvers_accepted={approvers_accepted}/>
      <ApproversPending approvers_pending={approvers_pending}/>
    </div>
    
  );
}

function ApproveDeny() {
  return <div>Approve0, Deny0</div>;
}

function MainBox({ json_data }) {
  console.log("json_data", json_data);
  let {approvers, ...remaining_json_data} = json_data;
  
  return (
    <div className="border0">
      <MainBoxHeading />
      <RequesterBox />
      <ApproverBox approvers={approvers} />
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
