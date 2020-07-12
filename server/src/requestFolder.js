/**
 *
 * setUpRequestFolder() & createBrief() functions
 *
 */






/**
 *
 * FUNCTION: 
 * Creates a custom folder in Google Drive with request's name
 * and adds the shared folder from the survey into this new folder (it's not a 
 * duplicated folder, just existing in two places: the requestor's Google Drive and ours)
 * 
 *
 */
function setUpRequestFolder(subjectOfRequest){
    console.log("\n ********************* setUpRequestFolder()");

  
    // grab Folder where we'll place all web request folders
      var requestsFolder = DriveApp.getFolderById(mainDriveFolder);
      console.log("\n requestFolder: " + requestsFolder);
      
    // create new folder within main Folder and name it subjectOfRequest
      var newRequestFolderName = subjectOfRequest;
      var newRequestFolder = requestsFolder.createFolder(newRequestFolderName);
      var newRequestFolderUrl = newRequestFolder.getUrl();
      var newRequestFolderId = newRequestFolder.getId();
      console.log("\n newRequestFolder: " + newRequestFolder);
      console.log("\n newRequestFolderUrl: " + newRequestFolderUrl);
      console.log("\n newRequestFolderId: " + newRequestFolderId);

    // ensure function works on worksheet "Form Responses 1"
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var FormResponseSheet = ss.setActiveSheet(ss.getSheetByName("Form Responses 1"));
      var lastRow = FormResponseSheet.getLastRow();
      
    // set new request folder url
      var newRequestFolderColumn = ss_column_details.shared_folder[0]
      FormResponseSheet.setActiveSelection(newRequestFolderColumn+lastRow).setValue(newRequestFolderUrl);
      
    // return necessary variables
      return [newRequestFolderId, newRequestFolderUrl];
}








