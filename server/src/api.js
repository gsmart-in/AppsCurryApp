
function doGet() 
{
  return HtmlService
      .createTemplateFromFile('index')
      .evaluate();
}

function getRequestApp()
{
	return new AppLib.RequestsApp('https://docs.google.com/spreadsheets/d/15KRD5eLNMkOEfsoP-5FQybEnUoqtKGMLbR3ilId9V-I/edit');
}

function loadRequests()
{
	return getRequestApp().getNewRequests();
} 

function requestDetails(id)
{
	return getRequestApp().requestDetails(id);
}

function approveRequest(id)
{
	return getRequestApp().approveRequest(id);
}

function rejectRequest(id)
{
	return getRequestApp().rejectRequest(id);
}

function newRequest(req)
{
	return getRequestApp().newRequest(req);
}

function approvedRequests()
{
	return getRequestApp().approvedRequests();
}