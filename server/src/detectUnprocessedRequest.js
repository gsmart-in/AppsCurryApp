function detectUnprocessedRequests() {

  Logger.log("\n *********************TIME-BASED TRIGGER: detectUnprocessedRequests()");

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var formResponsesSheet = ss.setActiveSheet(ss.getSheetByName("Form Responses 1"));
  var formResponsesRange = formResponsesSheet.getDataRange();
  var formResponsesValues = formResponsesRange.getValues();
  //  Logger.log("formResponsesValues: " + formResponsesValues)

  var resourcesTrelloIds = createResourcesTrelloIdsDictionary();

  // Loop through requests and update "In Progress" Requests
  for (var i = 1; i < formResponsesValues.length; i++) {
    //    Logger.log("/n/n ----------------------- formResponsesValues loop: " + formResponsesValues);

    if (formResponsesValues[i][5] === "") {
      var status = formResponsesValues[i][5];
      Logger.log("/n/n ----------------------- formResponsesValues[" + i + "][5]: " + status);
      var trelloCardId = formResponsesValues[i][ss_column_details.trello_card_id[1]];
      var trelloCardUrl = formResponsesValues[i][ss_column_details.trello_card_url[1]];
      var briefUrl = formResponsesValues[i][ss_column_details.brief_url[1]];
      var requestorEmail = formResponsesValues[i][ss_column_details.email_address[1]];
      var requestFolderUrl = formResponsesValues[i][ss_column_details.shared_folder[1]];
      Logger.log("/n/n ----------------------- ccOnEmail[" + i + "][1]: " + ccOnEmail);
      var uniqueRequestName = formResponsesValues[i][ss_column_details.project_name[1]];
      Logger.log("/n/n ----------------------- uniqueRequestName[" + i + "][2]: " + uniqueRequestName);
      Logger.log("/n/n ----------------------- UNPROCESSED REQUEST: " + uniqueRequestName);
      var row = i + 1;
      unprocessedRequestEmail(requestorEmail, uniqueRequestName)
    }

  }

}


function unprocessedRequestEmail(requestorEmail, uniqueRequestName) {
  Logger.log("\n ********************* unprocessedRequestEmail()");

  var requestsSpreadsheet = SpreadsheetApp.getActiveSpreadsheet().getUrl()
  var alias = getAlias();
  var emailRecipient = "nrassm@gmail.com"

  var emailBody = "<p><b>An unprocessed request has been detected.</span></b></p>" +
    "<p><b>Request Name:</b> " + uniqueRequestName + "</p>" +
    "<p><b>Requestor:</b> " + requestorEmail + "</p>" +
    "<p><a href=" + requestsSpreadsheet + "> Request Management App Demo </a></p>"

  var emailSubject = "Request Management App Demo - An Unprocessed Request Requires Your Attention - " + uniqueRequestName;

  GmailApp.sendEmail(emailRecipient, emailSubject, emailBody, {
    htmlBody: emailBody,
    from: alias
    //             attachments: [attachmentFilesArray]
    //             name: webRequestName
  });

}