'use strict';

class GASBackEnd
{
	constructor()
	{

	}
	loadRequests() {
		return new Promise(function (resolve, reject) {
			google.script.run.withSuccessHandler(function (res) {
				resolve(res);
			})
				.withFailureHandler(function () {
					reject();
				}).loadRequests();
		});
	}
	spreadsheetDetails() {
		return new Promise(function (resolve, reject) {
			google.script.run.withSuccessHandler(function (res) {
				resolve(res);
			})
				.withFailureHandler(function () {
					reject();
				}).spreadsheetDetails();
		});
	}
	requestDetails(id)
	{
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{
				resolve(res);
			})
			.withFailureHandler(function()
			{
				reject();
			}).requestDetails(id);
		});
	}
	approveRequest(id)
	{
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{
				resolve(res);
			})
			.withFailureHandler(function()
			{
				reject();
			}).approveRequest(id);
		});
	}
	closeRequest(id) {
		return new Promise(function (resolve, reject) {
			google.script.run.withSuccessHandler(function (res) {
				resolve(res);
			})
				.withFailureHandler(function () {
					reject();
				}).closeRequest(id);
		});
	}
	cancelRequest(id) {
		return new Promise(function (resolve, reject) {
			google.script.run.withSuccessHandler(function (res) {
				resolve(res);
			})
				.withFailureHandler(function () {
					reject();
				}).cancelRequest(id);
		});
	}
	rejectRequest(id)
	{
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{
				resolve(res);
			})
			.withFailureHandler(function()
			{
				reject();
			}).rejectRequest(id);
		});
	}
	newRequest(req)
	{
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{
				resolve(res);
			})
			.withFailureHandler(function()
			{
				reject();
			}).newRequest(req);
		});
	}
	approvedRequests()
	{
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{
				resolve(res);
			})
			.withFailureHandler(function()
			{
				reject();
			}).approvedRequests();
		});
	}
	closedRequests() {
		return new Promise(function (resolve, reject) {
			google.script.run.withSuccessHandler(function (res) {
				resolve(res);
			})
				.withFailureHandler(function () {
					reject();
				}).closedRequests();
		});
	}
	cancelledRequests() {
		return new Promise(function (resolve, reject) {
			google.script.run.withSuccessHandler(function (res) {
				resolve(res);
			})
				.withFailureHandler(function () {
					reject();
				}).cancelledRequests();
		});
	}

}

export default GASBackEnd;