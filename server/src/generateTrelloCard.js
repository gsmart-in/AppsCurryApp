/**
 * FUNCTION: Generates a Trello Card
 *
 * This function uses my [Nicolai Robles] Trello key and token. Please do not abuse this. It
 * is very easy to generate a new key and token at https://trello.com/app-key.
 *
 *
 */

//params.idList, trello key and token, trello columns

function generateTrelloCard(uniqueRequestName, dueDate, newRequestFolderId, stakeholder, briefData) {
  Logger.log("\n ********************* generateTrelloCard()");
  Logger.log("briefData: " + briefData)
  Logger.log("briefData.length: " + briefData.length)
  Logger.log("briefData[0]: " + briefData[0])

  var briefDataText = "";
  for (var i = 0; i < briefData.length; i++) {
    var question = briefData[i][0]
    var answer = briefData[i][1]
    var tempBriefDataText = "**" + question + ":**\n " + answer + "\n\n"
    Logger.log("**-------tempBriefDataText: " + tempBriefDataText);

    briefDataText = briefDataText.concat(tempBriefDataText);
  }

  //  get urls for request folder and brief
  var newRequestsFolder = DriveApp.getFolderById(newRequestFolderId);
  var newRequestsFolderUrl = newRequestsFolder.getUrl();

  //  create description text for Trello card
  var trelloEmailBody = briefDataText;


  //  set up data to send to Trello API
  var cardData = {
    "name": uniqueRequestName, //(required) Valid Values: a string with a length from 1 to 16384
    "desc": trelloEmailBody, //(optional)Valid Values: a string with a length from 0 to 16384
    "pos": "top", //(optional) Default: bottom Valid Values: A position. top, bottom, or a positive number.
    "due": dueDate, //(required) Valid Values: A date, or null
    "idList": idList, //(required)Valid Values: id of the list that the card should be added to
    //                   "idMembers": ,//(optional)Valid Values: A comma-separated list of objectIds, 24-character hex strings
    //                   "idLabels": idLabels,//(optional)
  };
  //  OLD  var trelloAPIUrl = 'https://api.trello.com/1/cards?key=eb6d667fc17dacfd18f0b9cce0f6e487&token=b4736abc7942a4b79925ea29d1ee4b1027876d5813a905698933f272ef3d02a9&scope=read,write,account' //optional... -&cards=open&lists=open'-
  var trelloAPIUrl = 'https://api.trello.com/1/cards?key=' + TRELLO_KEY + '&token=' + TRELLO_TOKEN + '&scope=read,write,account' //optional... -&cards=open&lists=open'-
  //    var trelloAPIUrl = 'https://api.trello.com/1/cards?key='+ TRELLO_KEY +'&token='+ TRELLO_TOKEN +'&scope=read,write,account' //optional... -&cards=open&lists=open'-
  var options = {
    "method": "post",
    "payload": cardData
  };

  //  make trello API call
  var responseData = UrlFetchApp.fetch(trelloAPIUrl, options);
  var responseDataJSON = JSON.parse(responseData);
  var trelloCardId = responseDataJSON.id;
  var trelloCardEmail = responseDataJSON.email;
  var resourceTrelloIds = responseDataJSON.idMembers;
  var resourceTrelloIdsString = resourceTrelloIds.join();
  var trelloCardUrl = responseDataJSON.shortUrl;
  var trelloCardUrlJSON = trelloCardUrl + ".json";

  Logger.log("\n responseData: " + responseData);
  Logger.log("\n responseDataJSON: " + responseDataJSON);
  Logger.log("\n\n\n responseDataJSON.id: " + responseDataJSON.id);


  // ensure function works on worksheet "Form Responses 1"
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var FormResponseSheet = ss.setActiveSheet(ss.getSheetByName("Form Responses 1"));
  var lastRow = FormResponseSheet.getLastRow();
  Logger.log("\n _________________________ lastRow: " + lastRow);


  // set attachments folder url
  var trelloCardIdColumn = ss_column_details.trello_card_id[0]
  var trelloCardDataColumn = ss_column_details.trello_card_data[0]
  var trelloCardUrlColumn = ss_column_details.trello_card_url[0]
  writeToFormSpreadsheet(trelloCardIdColumn, trelloCardId)
  writeToFormSpreadsheet(trelloCardDataColumn, responseData)
  writeToFormSpreadsheet(trelloCardUrlColumn, trelloCardUrl)

  updateTrelloCard(trelloCardId, newRequestsFolderUrl)

  return trelloCardUrl;

}






/**
 *
 */
function updateTrelloCard(trelloCardId, newRequestsFolderUrl) {

  Logger.log("\n _________________________ updateTrelloCard()");


  //  var trelloCardId = "5993c4a18c9fb6d1605e84d6";
  //  var newRequestsFolderUrl = "https://drive.google.com/drive/folders/0BxHgqWEYek5WZm1rb3IzSjlnSFk"

  // send attachments one by one in loop
  var cardData = { "url": newRequestsFolderUrl };
  //  OLD var updateTrelloCardAPIUrl = 'https://api.trello.com/1/cards/' + trelloCardId + '/attachments?key=eb6d667fc17dacfd18f0b9cce0f6e487&token=b4736abc7942a4b79925ea29d1ee4b1027876d5813a905698933f272ef3d02a9';
  var updateTrelloCardAPIUrl = 'https://api.trello.com/1/cards/' + trelloCardId + '/attachments?key=' + TRELLO_KEY + '&token=' + TRELLO_TOKEN;
  var options = {
    "method": "post",
    "payload": cardData
  };
  var responseData = UrlFetchApp.fetch(updateTrelloCardAPIUrl, options);

}

