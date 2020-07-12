
function getInProgressRequestsAndUpdate() {

  console.log("\n *********************TIME-BASED TRIGGER: getInProgressRequestsAndUpdate()");

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var formResponsesSheet = ss.setActiveSheet(ss.getSheetByName("Form Responses 1"));
  var formResponsesRange = formResponsesSheet.getDataRange();
  var formResponsesValues = formResponsesRange.getValues();
  Logger.log("formResponsesValues: " + formResponsesValues)

  // Loop through requests and update "In Progress" Requests
  for (var i = 1; i < formResponsesValues.length; i++) {
    Logger.log("/n/n ----------------------- formResponsesValues loop: " + formResponsesValues);

    if (formResponsesValues[i][ss_column_details.status[1]] === "In Progress" || formResponsesValues[i][ss_column_details.status[1]] === "Pending Review") {
      var status = formResponsesValues[i][ss_column_details.status[1]];
    
      var idValue = formResponsesValues[i][ss_column_details.job_number[1]];
      var trelloCardId = formResponsesValues[i][ss_column_details.trello_card_id[1]];
      var trelloCardUrl = formResponsesValues[i][ss_column_details.trello_card_url[1]];
      var briefUrl = formResponsesValues[i][ss_column_details.brief_url[1]];
      var dueDate = formResponsesValues[i][ss_column_details.due_date[1]];
      var requestorEmail = formResponsesValues[i][ss_column_details.email_address[1]];
      var requestFolderUrl = formResponsesValues[i][ss_column_details.shared_folder[1]];
      var uniqueRequestName = "#" + idValue + ": " + formResponsesValues[i][ss_column_details.project_name[1]];
      var row = i + 1;
      getTrelloUpdates(trelloCardId, row, requestorEmail, requestFolderUrl, uniqueRequestName, briefUrl, trelloCardUrl, dueDate)

    }

  }

}





function getTrelloUpdates(trelloCardId, row, requestorEmail, requestFolderUrl, uniqueRequestName, briefUrl, trelloCardUrl, dueDate) {

  var updateTrelloCardAPIUrl = 'https://api.trello.com/1/cards/' + trelloCardId + '?&key=' + TRELLO_KEY + '&token=' + TRELLO_TOKEN// + '&customFieldItems=true';

  console.log("**********getTrelloUpdates()***********")
  var options = { "method": "get" };

  var updatedCardData = UrlFetchApp.fetch(updateTrelloCardAPIUrl, options);
  var updatedCardDataJSON = JSON.parse(updatedCardData);
  console.log("updatedCardData: " + updatedCardData)
  console.log("updatedCardDataJSON: " + updatedCardDataJSON)

  // get current dueComplete data
  var updatedCardDueComplete = updatedCardDataJSON.dueComplete;
  console.log("updatedCardDueComplete: " + updatedCardDueComplete);

  // get current closed data
  var updatedCardClosed = updatedCardDataJSON.closed;
  console.log("updatedCardClosed: " + updatedCardClosed);



  var trelloDataColumn = ss_column_details.trello_card_data[0]

  var currentCardData = getFormSpreadsheetDataRow(trelloDataColumn, row);
  console.log("currentCardData: " + currentCardData);
  Logger.log("JSON.parse(currentCardData): " + JSON.parse(currentCardData));

  var currentCardDataJSON = JSON.parse(currentCardData);

  // get current dueComplete data
  var currentCardDueComplete = currentCardDataJSON.dueComplete;
  console.log("currentCardDueComplete: " + currentCardDueComplete);

  // get current dueComplete data
  var currentCardClosed = currentCardDataJSON.closed;
  console.log("currentCardClosed: " + currentCardClosed);

  // test for updates   

  testIfCardCompletedOrClosed(updatedCardDueComplete, currentCardDueComplete, updatedCardClosed, currentCardClosed, row, requestorEmail, requestFolderUrl, uniqueRequestName, briefUrl, trelloCardUrl)



  // update trelloCard data column
  var trelloCardDataColumn = ss_column_details.trello_card_data[0]
  writeToFormSpreadsheetRow(trelloCardDataColumn, row, updatedCardData)


}


function testIfCardCompletedOrClosed(updatedCardDueComplete, currentCardDueComplete, updatedCardClosed, currentCardClosed, row, requestorEmail, requestFolderUrl, uniqueRequestName, briefUrl, trelloCardUrl) {
  console.log("requestFolderUrl: " + requestFolderUrl)
  console.log("-----testIfCardCompletedOrClosed function")

  console.log("-----updatedCardDueComplete: " + updatedCardDueComplete)
  console.log("-----currentCardDueComplete: " + currentCardDueComplete)
  console.log("-----updatedCardClosed: " + updatedCardClosed)
  console.log("-----currentCardClosed: " + currentCardClosed)


  // check if dueComplete remains false
  if (updatedCardClosed === true) {
    console.log("-----updatedCardClosed: " + updatedCardClosed)
    var statusColumn = ss_column_details.status[0]
    var doneStatus = "Archived";
    writeToFormSpreadsheetRow(statusColumn, row, doneStatus);

  } else if (updatedCardClosed === currentCardClosed) {
    console.log("-----updatedCardClosed: " + updatedCardClosed)
    console.log("-----no action")
    // do nothing if remains same
  }


  if (updatedCardDueComplete === currentCardDueComplete) {
    console.log("-----updatedCardDueComplete: " + updatedCardDueComplete)
    console.log("-----no action")
    // do nothing if remains same


  } else if (updatedCardDueComplete === true) {

    // update status column "F" && trigger email to requestor
    onCompletion(uniqueRequestName, requestFolderUrl, requestorEmail, briefUrl, trelloCardUrl)

    console.log("-----updatedCardDueComplete: " + updatedCardDueComplete)
    var statusColumn = ss_column_details.status[0]
    var doneStatus = "Done";
    writeToFormSpreadsheetRow(statusColumn, row, doneStatus);

  }

}

