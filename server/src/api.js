function doGet() {
	return HtmlService
		.createTemplateFromFile('index')
		.evaluate();
}

function getNameOfSpreadsheet(spreadsheetId) {
	var ssName = SpreadsheetApp.openById(spreadsheetId).getName()
	// remove (Responses)
	ssName = ssName.split("(")
	ssName = ssName[0]
	console.log("ssName: " + ssName)
	return ssName
}

function getActiveUser() {
	return Session.getActiveUser().getEmail();
}

function getRequestApp() {
	var spreadsheetId = params.SPREADSHEET_ID
	var nameOfSpreadsheet = getNameOfSpreadsheet(spreadsheetId)
	var activeUser = getActiveUser()
	console.log("activeUser: " + activeUser)
	var header_values = getHeaderNames(spreadsheetId)
	console.log("header_values: " + header_values)
	return new AppLib.RequestsApp('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/edit', header_values, nameOfSpreadsheet, activeUser);
}

function loadRequests() {
	return getRequestApp().getNewRequests();
}
function getSpreadsheetName() {
	return getRequestApp().getSpreadsheetName();
}

function requestDetails(id) {
	return getRequestApp().requestDetails(id);
}

function approveRequest(id) {
	return getRequestApp().approveRequest(id);
}

function cancelRequest(id) {
	return getRequestApp().cancelRequest(id);
}

function closeRequest(id) {
	return getRequestApp().closeRequest(id);
}

function rejectRequest(id) {
	return getRequestApp().rejectRequest(id);
}

function newRequest(req) {
	return getRequestApp().newRequest(req);
}

function approvedRequests() {
	return getRequestApp().approvedRequests();
}
function closedRequests() {
	return getRequestApp().closedRequests();
}

function cancelledRequests() {
	return getRequestApp().cancelledRequests();
}



function getHeaderNames(spreadsheetId) {
	var ss = SpreadsheetApp.openById(spreadsheetId);
	var formResponsesSheet = ss.setActiveSheet(ss.getSheetByName("Form Responses 1"));
	var formResponsesRange = formResponsesSheet.getDataRange();
	var formResponsesValues = formResponsesRange.getValues();
	var headerValues = formResponsesValues[0]
	var newHeaderValues = headerValues.map(function (headerValue) {
		return toSnakeCase(headerValue)
	})
	return newHeaderValues

}

function toSnakeCase(str) {
	return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (x) {
		return x.toLowerCase();
	}).join('_');
};


function updateTrelloCardParamater(trelloCardId, cardParameter) {
	var cardId = trelloCardId
	var cardData = {};
	cardData[cardParameter] = true;

	var updateTrelloCardAPIUrl = 'https://api.trello.com/1/cards/' + cardId + '/?key=' + params.TRELLO_KEY + '&token=' + params.TRELLO_TOKEN

	var options = {
		"method": "put",
		"payload": cardData
	};

	UrlFetchApp.fetch(updateTrelloCardAPIUrl, options);
}
