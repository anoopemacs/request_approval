# Built with:-
Create React App
npm v12 latest lts as of Oct 4th, 2020

# Remaining tasks:-

TODO: Keep it blind accessible

TODO: use propTypes to solidify json format, requires npm i prop-types

TODO: Approve button should warn if asked amount exceeds budget in json

TODO: diagram 1: component names drawn on top of the design diagram

TODO: diagram 2: which component owns which piece of json data

TODO: include a library that shows logo of attached files, eg: .xls logo in design doc

TODO: if approvers_accepted + approvers_pending != approvers, then raise an unhandled approver_status exception.

TODO: mention npm, React version in readme

TODO: a picture showning the assumptions made by me

TODO: test for the case of 0 pending approvers or 0 approved approvers

TODO: change all unnecessary 'let' to 'const'

TODO: change formatting of ({approvers_accepted}) to ({ approvers_accepted }) & other such formatting best practises

TODO: month v/s months v/s year v/s years

TODO: Approve should warn if request exceeds monthly spend limit

TODO: Security 'lock logo' add from external library, fontawesome?

TODO: convert requester box to <table>

TODO: test on Internet explorer, Edge, other operating systems on Browserstack

TODO: attach and use appropriate fonts

TODO: explain hack used to fill css grid borders

TODO: show css calculations more explicitly: top: calc(50% - 17px/2 + 0.5px);

TODO: I think in design, drop shadow is only there to the bottom.

TODO: add to assumptions:      "last_updated_date" is the time that Approved signal was sent

TODO: underscore vs camelcase follow convention & add it to readme

TODO: single quote, double quote formatting

TOOD: should I replace date formatter with moment.js?

TOread: /* display: inline-block what specifically does this do?  how does it enable empty circle to not disappear*/

Assumption made: approvers are presented in the same order as they appear in the array from json data

font-family: SFProDisplay;

delate default logo bundles by Create react app into public folder

retina ready

TODO: why does it scroll for 744px height, is total width >744px due to bug in gridding by me?

test with longer 'description' etc in .json
