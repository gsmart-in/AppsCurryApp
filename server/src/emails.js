
/**
 * FUNCTION: 
 *
 * Determine which emails to send
 *
 */
function onEntryEmails(uniqueRequestName, newRequestFolderUrl, briefUrl, stakeholder, trelloCardUrl, dueDate, jobNumber) {
  Logger.log("\n ********************* onEntryEmails()");
  var requestorEmail = stakeholder;
  initialAssignmentEmail(uniqueRequestName, newRequestFolderUrl, requestorEmail, briefUrl, trelloCardUrl, dueDate)

}



function initialAssignmentEmail(uniqueRequestName, newRequestFolderUrl, requestorEmail, briefUrl,
  trelloCardUrl, dueDate) {


  Logger.log("\n ********************* initialAssignmentEmail()");
  Logger.log("\n briefUrl(): " + briefUrl);

  var formUrl = SpreadsheetApp.getActiveSpreadsheet().getFormUrl()
  // generate email to requestor, cc: resource, body: link to Drive folder, 
  var requestorEmailBody = "<p><b><a href=" + formUrl + "> Request Management App Demo </a></b></p>" +
    "<p><b>Your request has been received.</b></p>" +
    "<p><b>Project Brief:</b> <a href=" + briefUrl + ">" + uniqueRequestName + "</a></p>" +
    "<p><b>Due Date:</b> " + dueDate + "</p>" +
    "<p><a href=" + newRequestFolderUrl + ">" + "Project Drive Folder" + "</a></p>" +
    "<p><a href=" + trelloCardUrl + ">" + "Trello Card" + "</a></p><br>" +
    "<p>Please do not reply to this email address.</p>";


  var requestorEmailSubject = "Request Management App Demo - Your Request Has Been Received - " + uniqueRequestName

  GmailApp.sendEmail(requestorEmail, requestorEmailSubject, requestorEmailBody, {
    cc: "nicolai.robles@gmail.com",
    htmlBody: requestorEmailBody,
    //    from: alias
    //             attachments: [attachmentFilesArray]
    //             name: webRequestName
  });



}


// On Update Emails

function onCompletion(uniqueRequestName, requestFolderUrl, requestorEmail, briefUrl,
  trelloCardUrl) {
  Logger.log("\n ********************* onCompletion()");
  var formUrl = SpreadsheetApp.getActiveSpreadsheet().getFormUrl()

  // generate email to requestor, cc: resource, body: link to Drive folder, 
  var emailBody =
    "<p><b><a href=" + formUrl + "> Request Management App Demo </a></b></p>" +
    "<p><b>Project Brief:</b> <a href=" + briefUrl + ">" + uniqueRequestName + "</a></p>" +
    "<p></b> <a href=" + requestFolderUrl + ">Project Drive Folder</a></p>" +
    "<p><b></b><a href=" + trelloCardUrl + ">Trello Card</a></p><br>" +
    "<p>Please do not reply to this email address.</p>";

  var emailSubject = "Request Management App Demo - Your Request Has Been Completed - " + uniqueRequestName;
  GmailApp.sendEmail(requestorEmail, emailSubject, emailBody, {
    //      cc: resourceTrelloEmailsString + ccOnEmail,
    htmlBody: emailBody,
    //      from: alias
    //             attachments: [attachmentFilesArray]
    //             name: webRequestName
  });

}


/**
 * FUNCTION: 
 *
 * Generates name of Requestor based on email provided.
 *
 */
function generateRequestorNameFromEmail(stakeholder) {
  var tempEmail = stakeholder;
  var emailArray = tempEmail.split("@");
  var names = emailArray[0].replace(".", " ");
  var name = toTitleCase(names);
  return name;
}


function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

function normalizeDate(dueDate) {

  var completionDate = new Date(dueDate)
  var month = completionDate.getMonth() + 1
  var date = completionDate.getDate()
  var year = completionDate.getUTCFullYear()
  var hour = completionDate.getHours()
  var minute = completionDate.getMinutes()
  var finalCompletionDate = month + "/" + date + "/" + year
  return finalCompletionDate

}
