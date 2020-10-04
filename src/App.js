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
//TODO: Security 'lock logo' add from external library, fontawesome?
//TODO: convert requester box to <table>
//TODO: test on Internet explorer, Edge, other operating systems on Browserstack
//TODO: attach and use appropriate fonts
//TODO: explain hack used to fill css grid borders
//TODO: show css calculations more explicitly: top: calc(50% - 17px/2 + 0.5px);
//TODO: I think in design, drop shadow is only there to the bottom.
//TODO: add to assumptions:      "last_updated_date" is the time that Approved signal was sent
//TODO: underscore vs camelcase follow convention & add it to readme
//TODO: single quote, double quote formatting
//TOOD: should I replace date formatter with moment.js?
//TOread: /* display: inline-block what specifically does this do?  how does it enable empty circle to not disappear*/
//Assumption made: approvers are presented in the same order as they appear in the array from json data
//font-family: SFProDisplay;
//delate default logo bundles by Create react app into public folder
//retina ready
//TODO: why does it scroll for 744px height, is total width >744px due to bug in gridding by me?
import React from "react";
import "./App.css";
import json_data from "./request_data.json";
import tickmark from './images/tickmark.svg';
import airbaseLogo from './images/airbase-logo.svg';
import securityLogo from './images/security-logo.svg';

function AirbaseLogo() {
  return (
    <div className="AirbaseLogo border0">
      <img src={airbaseLogo} className="AirbaseLogo-svg" alt="airbase logo" />
    </div>
  );
}

function Security() {
  return (
    <div className="Security border0">
      <img className="Security-image"
	   src={securityLogo}
	   alt={"secure lock logo"} />
      <span className="Security-message-heading">Security Message: </span>
      <span className="Security-message-value">Could not identify security message from given json.</span>
    </div>
  );
}

function MainBoxHeading({ service, id }) {
  return (
    <div className="MainBoxHeading border0">
      <img className="MainBoxHeading-image"
	   src={service.logo}
	   alt={service.name + " logo"}
      />
      <span className="MainBoxHeading-text">{`Request for ${service.name} (#${id})`}</span>
    </div>
  );
}

function RequesterBoxItem({ item_class_name, field_name, children, halfwidth = false }) {
  const base_class_name = halfwidth? "RequesterBoxItemHalfwidth" : "RequesterBoxItem"
  return (
    <div className={`${base_class_name} ${item_class_name}`}>
      <div className={`${base_class_name}-field_name`}>{field_name}</div>
      <div className={`${base_class_name}-field_value`}>{children}</div>
    </div>
  );
}

function RequesterBox({ requested_by, renewal_frequency_in_months, description, expense_account, cost, files, service }) {
  return (
    <div className="RequesterBox border0">
      <RequesterBoxItem item_class_name="RequesterBox-name" field_name="Requested by">
	<img className="RequesterBox-profilepicture-image" src={requested_by.profile_picture} alt={requested_by.first_name + " profile picture"} />
	<span className="RequesterBox-fullname">{`${requested_by.first_name} ${requested_by.last_name}`}</span>
      </RequesterBoxItem>
      <RequesterBoxItem item_class_name="RequesterBox-cost" field_name="Cost">
	${cost}
      </RequesterBoxItem>
    <RequesterBoxItem item_class_name="RequesterBox-freq" field_name="Renewal Frequency" halfwidth={true}>
      {renewal_frequency_in_months} {renewal_frequency_in_months > 1 ? "months" : "month"}
    </RequesterBoxItem>
    <RequesterBoxItem item_class_name="RequesterBox-annual" field_name="Annual Cost" halfwidth={true}>
      ${cost * 12}
    </RequesterBoxItem>
    <RequesterBoxItem item_class_name="RequesterBox-account" field_name="Expense Account">
      {expense_account}
    </RequesterBoxItem>
    <RequesterBoxItem item_class_name="RequesterBox-file" field_name="File">
      {files.map(file_url => {
	const file_name = file_url.substring(file_url.lastIndexOf('/') + 1);
	const file_type = file_url.substring(file_url.lastIndexOf('.') + 1);
	return (<div key={file_url}><span className={"fiv-viv fiv-icon-" + file_type}></span> {file_name}{" "}<br/></div>);
      })}
    </RequesterBoxItem>
    <RequesterBoxItem item_class_name="RequesterBox-description" field_name="Description">
      {description}
    </RequesterBoxItem>
    </div>
  );
}

function RequesterBoxWithWarningAndButtons({ requested_by, renewal_frequency_in_months, description, expense_account, cost, files, service }) {
  return (
    <div className="RequesterBoxWithButtons">
      <RequesterBox requested_by = {requested_by} renewal_frequency_in_months = {renewal_frequency_in_months} description = {description} expense_account = {expense_account}  cost = {cost}  files = {files} service={service} />      
      {(service.usage_count > 0)?
       <div className="multiusewarning">
	 <span className="multiusewarning-message">Your company is already paying for {service.name} on a recurring basis.</span><br/>
	 <span className="multiusewarning-count">({service.usage_count} {service.usage_count === 1? "instance": "instances"} owned by ?)</span>
       </div>
      :
       ""}
      <ApproveDeny />
    </div>
  );
}

function ApproversList({ approvers_approved, list_heading, start_index }) {
  /*
     {
     "approver": {
     "email": "shreyas@airbase.io",
     "first_name": "Shreyas",
     "last_name": "Subramaniam",
     "profile_picture":
     "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
     },
     "status": "accepted",
     "last_notified_time": "2018-05-07T10:45:53.150215",
     "created_date": "2018-05-07T10:45:42.380930",
     "last_updated_date": "2018-05-07T10:47:03.166711"
     } 
   */
  //<img src={airbaseLogo} className="AirbaseLogo-svg" alt="airbase logo" />
  const format_date_string = (date_string) => {
    const dd   = date_string.substring(8,10);
    const mmm  = date_string.substring(5,7);
    const yyyy   = date_string.substring(0,4);

    const months = {
      '01' : 'Jan',
      '02' : 'Feb',
      '03' : 'Mar',
      '04' : 'Apr',
      '05' : 'May',
      '06' : 'Jun',
      '07' : 'Jul',
      '08' : 'Aug',
      '09' : 'Sep',
      '10' : 'Oct',
      '11' : 'Nov',
      '12' : 'Dec'
    }
    return `${months[mmm]} ${dd}, ${yyyy}`;
  }

  const approvers_list_jsx = approvers_approved.map((approver, map_index) => {
    const approved_listing_predicate = (list_heading === "Approved")
    const date_jsx = approved_listing_predicate?
		     <div className="ApproversList-date">{`Approved ${format_date_string(approver.last_updated_date)}`}</div> :
		     <div className="ApproversList-date">{`Last notified ${format_date_string(approver.last_notified_time)}`}</div>;

    const unticked_circle = <div className="Approvers-list-circle ApproversList-statuscircle Approvers-list-untickedcircle"><img src={tickmark} className="Approvers-list-tickmark-white" alt="unchecked tickmark" /></div>;
    const ticked_circle = <div className="Approvers-list-circle ApproversList-statuscircle Approvers-list-tickedcircle"><img src={tickmark} className="Approvers-list-tickmark-green" alt="checked tickmark" /></div>;

    const approver_fullname = `${approver.approver.first_name} ${approver.approver.last_name}`
    const approver_fullname_display = (approver_fullname.length <= 14)?
				      approver_fullname : approver_fullname.substring(0, 12) + "..";
    
    const approver_email_display = (approver.approver.email.length <= 28)?
				   approver.approver.email : approver.approver.email.substring(0, 26) + "..";
    
    return (
      <div className="Approvers-list-item" key={approver.approver.email}>
	<div className="Approvers-list-circle Approvers-list-indexcircle">{start_index + map_index}</div>
	<div className="ApproversList-profilepicture">
	  <img className="ApproversList-profilepicture-image" src={approver.approver.profile_picture} alt={approver.approver.first_name + " profile picture"} />
	</div>
	<div className="ApproversList-name-email">
	  <span className="ApproversList-fullname">{`${approver_fullname_display}`}</span> 
	  <span className="ApproversList-email">{` (${approver_email_display})`}</span>
	</div>
	{date_jsx}
	{approved_listing_predicate? ticked_circle : unticked_circle}
      </div>
    );
  });
  
  return (
    <div className="ApproversList">
      <span className="ApproversList-heading">{list_heading}</span>
      {approvers_list_jsx}
    </div>
  );
}

function ApproverBox({ approvers }) {
  console.log("approvers", approvers);
  const approvers_approved = approvers.filter(approver => approver.status === "accepted");
  const approvers_pending = approvers.filter(approver => approver.status === "created");
  const approvers_pending_start_index = approvers_approved.length + 1;
  
  console.log("approvers_approved", approvers_approved);
  return (
    <div className="ApproverBox border0">
      <ApproversList approvers_approved={approvers_approved} list_heading={"Approved"} start_index={1} />
      <hr className="ApproverBox-hr" />
      <ApproversList approvers_approved={approvers_pending} list_heading={"Pending"} start_index={approvers_pending_start_index} />
    </div>
    
  );
}

function ApproveDeny() {
  return (
    <div className="ApproveDeny">
      <button type="button" className="ApproveDeny-approve-button">Approve</button>
      <button type="button" className="ApproveDeny-deny-button">Deny</button>
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
    <div className="MainBox border0">
      <MainBoxHeading service={service} id={id} />
      <RequesterBoxWithWarningAndButtons requested_by = {requested_by} renewal_frequency_in_months = {renewal_frequency_in_months} description = {description} expense_account = {expense_account}  cost = {cost}  files = {files} service={service} />      
      <ApproverBox approvers={approvers} />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <AirbaseLogo />
      <Security />
      <MainBox json_data={json_data} />
    </div>
  );
}

export default App;
