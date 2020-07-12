// function that grabs all the columns in the ss and creates an obj like so:
/*
var ss_column_details = {
  job_number: [columnLetter, columnNumber],
  due_date: [columnLetter, columnNumber],  
}
*/

function getSSColumnDetails() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var formResponsesSheet = ss.setActiveSheet(ss.getSheetByName("Form Responses 1"));
  var formResponsesRange = formResponsesSheet.getDataRange();
  var formResponsesValues = formResponsesRange.getValues();
  var headerValues = formResponsesValues[0]
  var newHeaderValues = headerValues.map(function (headerValue) {
    return toSnakeCase(headerValue)
  })

  var ss_column_details = {}
  newHeaderValues.map(function (column_name, index) {
    var columnNumber = index + 1
    ss_column_details[column_name] = [col_number_to_letter(columnNumber), columnNumber - 1]
  })
  console.log("ss_column_details: " + JSON.stringify(ss_column_details))
  return ss_column_details

}

function toSnakeCase(str) {
  return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (x) {
    return x.toLowerCase();
  }).join('_');
};

function col_number_to_letter(num) {
  var str = '';
  //num--; //0 is not A; 1 is A
  while (num > 0) {
    var rem = (num - 1) % 26;
    num = Math.floor((num - 1) / 26);
    str = String.fromCharCode(65 + rem) + str;
  }
  console.log("str: " + str)
  return str;
}