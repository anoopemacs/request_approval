//TODO: Keep it blind accessible
//TODO: use propTypes to solidify json format, requires npm i prop-types
//TODO: Approve button should warn if asked amount exceeds budget in json
//TODO: diagram 1: component names drawn on top of the design diagram
//TODO: diagram 2: which component owns which piece of json data
//TODO: include a library that shows logo of attached files, eg: .xls logo in design doc
//TODO: if approvers_accepted + approvers_pending != approvers, then raise an unhandled approver_status exception.
//TODO: mention npm, React version in readme
//TODO: a picture showning the assumptions made by me
//TODO: test for the case of 0 pending approvers or 0 approved approvers
//TODO: change all unnecessary 'let' to 'const'
//TODO: change formatting of ({approvers_accepted}) to ({ approvers_accepted }) & other such formatting best practises
//TODO: month v/s months v/s year v/s years
//TODO: Approve should warn if request exceeds monthly spend limit
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

function MainBoxHeading({ service, id }) {
  return (
    <div className="border0">
      <b>MainBoxHeading</b>
      <br/>
      {service.logo}{" Request for "}{service.name}{" (#"+ id + ")"}
    </div>
  );
}

function RequesterBox({ requested_by, renewal_frequency_in_months, description, expense_account, cost, files }) {
  return (
    <div className="border0">
      <b>RequesterBox</b><br/>
      Requested by: {JSON.stringify(requested_by)}
      <hr/>
      Cost: {cost}
      <hr/>
      Renewal Frequency: {renewal_frequency_in_months} months
      Annual Cost: ${cost * 12}
      <hr/>
      Expense Account: {expense_account}
      <hr/>
      File: {JSON.stringify(files)}
      <hr/>
      Description: {description}
      <hr/>
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
  return (
    <div>
      <button>Approve</button>
      <button>Deny</button>
    </div>
  );
}

function MainBox({ json_data }) {
  console.log("json_data", json_data);
  const {approvers, ...remaining_json_data} = json_data;
  //requester_data:-
  const {requested_by, renewal_frequency_in_months, description, expense_account, cost, files, ...remaining2_json_data} = remaining_json_data;
  //MainBoxHeading data:-
  const {service, id, ...remaining3_json_data} = remaining2_json_data;
  
  return (
    <div className="border0">
      <MainBoxHeading service={service} id={id} />
      <RequesterBox requested_by = {requested_by} renewal_frequency_in_months = {renewal_frequency_in_months} description = {description} expense_account = {expense_account}  cost = {cost}  files = {files} />
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
