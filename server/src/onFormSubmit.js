/**
 * FUNCTION: 
 *
 * Upon form submission: (1) a unique ID is created, (2) a folder is created with the requests custom name,
 * (3) a brief with the requests details is created and placed inside the new folder, (4) the shared folder drive is
 * added to the new folder (not duplicated), (5) emails are generated to the legal team and to the requestor with custom wording each, 
 * (6) and finally a Trello card is created the request's name and it's new google drive folder 
 * 
 */



// Production params
var ss_column_details = getSSColumnDetails() //in utils file
var TRELLO_KEY = PropertiesService.getScriptProperties().getProperty('TRELLO_KEY');
var TRELLO_TOKEN = PropertiesService.getScriptProperties().getProperty('TRELLO_TOKEN');
var idList = PropertiesService.getScriptProperties().getProperty('idList');
var mainDriveFolder = PropertiesService.getScriptProperties().getProperty('mainDriveFolder');

function onFormSubmit(e) {
  Logger.log("\n ********************* onFormSubmit()");

  // Create unique ID and set it in first column
  var idValue = generateUniqueID();

  //  Get details from form response
  var timeStamp = e.namedValues['Timestamp'][0];
  var projectName = e.namedValues['Project Name'][0];

  if (projectName === "") {
    // duplicate
  } else {
    var subjectOfRequest = "#" + idValue + ": " + projectName

    var dueDate = e.namedValues['Due Date'][0];
    var stakeholder = e.namedValues['Email Address'][0];
    var entryResponses = e.namedValues;

    //  Create custom request name with "subject of request" + idValue
    var uniqueRequestName = "#" + idValue + ": " + projectName

    //  Create a main folder for request and subfolders for each attachment type
    var returnFromSetUpRequestFolder = setUpRequestFolder(uniqueRequestName);
    var newRequestFolderId = returnFromSetUpRequestFolder[0];
    var newRequestFolderUrl = returnFromSetUpRequestFolder[1];


    //  Create brief
    var returnFromCreateBrief = createBrief(uniqueRequestName, newRequestFolderId, entryResponses);
    var briefUrl = returnFromCreateBrief[0]
    console.log("briefUrl: " + briefUrl)
    var briefData = returnFromCreateBrief[1]
    console.log("briefData: " + briefData)

    //  Generate trello card
    var trelloCardUrl = generateTrelloCard(uniqueRequestName, dueDate, newRequestFolderId, stakeholder, briefData);

    // Set status as "In Progress"
    var statusColumn = ss_column_details.status[0]
    var inProgressStatus = "In Progress";
    writeToFormSpreadsheet(statusColumn, inProgressStatus)

    // Set dates to plain text to ensure app works
    var dueDateColumn = ss_column_details.due_date[0]
    var timeStampColumn = ss_column_details.timestamp[0]
    toPlainText(dueDateColumn)
    toPlainText(timeStampColumn)
    //    
    //  Generate emails
    onEntryEmails(uniqueRequestName, newRequestFolderUrl, briefUrl, stakeholder,
      trelloCardUrl, dueDate)
  }

}


function toPlainText(column) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var FormResponseSheet = ss.setActiveSheet(ss.getSheetByName("Form Responses 1"));
  var lastRow = FormResponseSheet.getLastRow();
  FormResponseSheet.getRange(column + lastRow).setNumberFormat('@');
}



/**
 * FUNCTION: Sets up a unique ID name
 *
 */
function generateUniqueID() {
  console.log("\n ********************* generateUniqueID()");

  // generate unique ID for request - to be used for several things

  // ensure function works on worksheet "Form Responses 1" sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var FormResponseSheet = ss.setActiveSheet(ss.getSheetByName("Form Responses 1"));

  // get the count of how many items have been submitted
  var lastRow = FormResponseSheet.getLastRow();
  console.log("lastRow: " + lastRow);

  // set ID for new entry
  var previousRow = lastRow - 1;
  var jobNumberColumn = ss_column_details.job_number[0]
  var previousRowValue = FormResponseSheet.getRange(jobNumberColumn + previousRow).getValue();

  // if previous row blank, check row before
  if (previousRowValue >= 1) {
    var newRowValue = previousRowValue + 1;
  } else {
    var previousPreviousRow = lastRow - 2;
    var previousPreviousRowValue = FormResponseSheet.getRange(jobNumberColumn + previousPreviousRow).getValue();
    var newRowValue = previousPreviousRowValue + 1;
  }

  FormResponseSheet.setActiveSelection(jobNumberColumn + lastRow).setValue(newRowValue).setHorizontalAlignment("center");

  return newRowValue;
}




function writeToFormSpreadsheet(column, value) {
  // ensure function works on worksheet "Form Responses 1"
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var FormResponseSheet = ss.setActiveSheet(ss.getSheetByName("Form Responses 1"));
  var lastRow = FormResponseSheet.getLastRow();
  Logger.log("\n _________________________ lastRow: " + lastRow);

  // set attachments folder url
  FormResponseSheet.setActiveSelection(column + lastRow).setValue(value);
}


function writeToFormSpreadsheetRow(column, row, value) {
  // ensure function works on worksheet "Form Responses 1"
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var FormResponseSheet = ss.setActiveSheet(ss.getSheetByName("Form Responses 1"));

  // set attachments folder url
  FormResponseSheet.setActiveSelection(column + row).setValue(value);
}


function getFormSpreadsheetData(column) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var FormResponseSheet = ss.setActiveSheet(ss.getSheetByName("Form Responses 1"));
  var lastRow = FormResponseSheet.getLastRow();

  var spreadSheetData = FormResponseSheet.getRange(column + lastRow).getValues();
  Logger.log("\n " + column + lastRow + " Data : " + spreadSheetData);

  return spreadSheetData;
}


function getFormSpreadsheetDataRow(column, row) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var FormResponseSheet = ss.setActiveSheet(ss.getSheetByName("Form Responses 1"));

  var spreadSheetData = FormResponseSheet.getRange(column + row).getValues();
  Logger.log("\n " + column + row + " Data : " + spreadSheetData);

  return spreadSheetData;
}