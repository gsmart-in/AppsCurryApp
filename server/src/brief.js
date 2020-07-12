
/**
 * FUNCTION: Creates a brief in Google Doc format
 *
 * The row data from a new entry is grabbed and trasposed to the sheet "Brief", along with the latest header columns.
 * Then the "Brief" sheet is used to copy each piece of data into a new Google Doc. 
 * This new Google Doc is titled after the request and placed into the new request Folder in Google Drive
 *
 */
function createBrief(uniqueRequestName, newRequestFolderId, entryResponses) {
      Logger.log("\n ********************* createBrief()");
     
  // function to transpose row data into "Brief" worksheet
    transposeRowData();

  // create brief Google Doc
    var doc = DocumentApp.create('Brief for ' + uniqueRequestName)
    var docId = DriveApp.getFileById(doc.getId());
    DriveApp.getFolderById(newRequestFolderId).addFile(docId);
//    DriveApp.getRootFolder().removeFile(docId);
    var briefUrl = doc.getUrl();
    console.log("briefUrl: " + briefUrl)
    
    
    var briefUrlColumn = ss_column_details.brief_url[0]
    writeToFormSpreadsheet(briefUrlColumn, briefUrl)

  //  get transposed data and put it into a table
    var table = [];
    var answersDictionary = {};
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var FormResponseSheet = ss.getSheetByName("Brief");
    var briefData = FormResponseSheet.getDataRange().getValues();
    console.log("briefData: " + briefData);
    
    // first row is the Project Name
    table.push(["Project Name", uniqueRequestName])
    
    for (var i = 0; i < briefData.length; i++) {
        var tempTableRow = [briefData[i][0], briefData[i][1]]

        if(briefData[i][1] === ""){
          // don't include empty cells in brief
        } else if (briefData[i][0] === "Trello Card Data" || briefData[i][0] === "Trello Card Id" || 
        briefData[i][0] === "Resource Trello Ids" || briefData[i][0] === "Unique Project Name" || 
        briefData[i][0] === "Project Name" || briefData[i][0] === "Which business is your request for?"){
          // don't include trello card data column in brief
        } else if (briefData[i][0] === "Timestamp"){
          briefData[i][0] = "Date Submitted" // change form field
          console.log("briefData[i][1]: " + briefData[i][1])
          console.log("new Date(): " + new Date())
          console.log("new Date(briefData[i][1]): " + new Date(briefData[i][1]))
          var timestamp = new Date(briefData[i][1])
          var month = timestamp.getMonth() + 1
          var date = timestamp.getDate()
          var year = timestamp.getUTCFullYear()
          var hour = timestamp.getHours()
          var minute = timestamp.getMinutes()
          var finalTimestamp = month + "/" + date + "/" + year
          briefData[i][1] = finalTimestamp
          table.push([briefData[i][0], briefData[i][1]])
        } else if (briefData[i][0] === "Due Date"){
          var completionDate = new Date(briefData[i][1])
          var month = completionDate.getMonth() + 1
          var date = completionDate.getDate()
          var year = completionDate.getUTCFullYear()
          var hour = completionDate.getHours()
          var minute = completionDate.getMinutes()
          var finalCompletionDate = month + "/" + date + "/" + year
          briefData[i][1] = finalCompletionDate
          table.push([briefData[i][0], briefData[i][1]])
        } else if (briefData[i][0] === "Job Number"){
          // briefData[i][1] = finalCompletionDate
          table.push([briefData[i][0], briefData[i][1].toString()])
        } else {
          table.push(tempTableRow)
          console.log("briefData[" +i+"]: " + briefData[i]);      
        }
    }
    
  //   put table into body of Google Doc
    var body = doc.getBody();
    var briefTable = body.appendTable(table);
    
  //   return id of document
    return [briefUrl, table];

}



function normalizeHours(hours) {
  if (hours > 12){
    hours = hours - 12
  }
  return hours
}



/**
 * Transpose row data
 */
function transposeRowData() {
    
  //  get updated values of header columns
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var FormResponseSheet = ss.getSheetByName("Form Responses 1");
    var headerRow = FormResponseSheet.getRange(1 + ":" + 1).getValues(); 
    
  //  get values of last row
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var FormResponseSheet = ss.getSheetByName("Form Responses 1");
    var lastRow = FormResponseSheet.getLastRow();
    var responseRow = FormResponseSheet.getRange(lastRow + ":" + lastRow).getValues(); 
      
  //  transpose headerRow into "Brief" worksheet
    var FormResponseSheet = ss.getSheetByName("Brief");
    var tempTransposedCell = FormResponseSheet.setActiveCell("A1"); 
    tempTransposedCell.setFormula("=transpose(" + "'Form Responses 1'!" + 1 + ":" + 1 + ")");

  //  transpose lastRow data into "Brief" worksheet
    var tempTransposedCell = FormResponseSheet.setActiveCell("B1"); 
    tempTransposedCell.setFormula("=transpose(" + "'Form Responses 1'!" + lastRow + ":" + lastRow + ")");

}
