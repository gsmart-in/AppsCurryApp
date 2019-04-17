'use strict';

class GASBackEnd
{
	constructor()
	{

	}
	loadRequests()
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
			}).loadRequests();
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

}

export default GASBackEnd;