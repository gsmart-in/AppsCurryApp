'use strict';
import SpreadsheetDB from './SpreadsheetDB.js';

class RequestsApp
{
	constructor( spreadsheet_url, header_values, spreadsheet_details, activeUser )
	{
		//this.spreadsheet_url = 
		//'https://docs.google.com/spreadsheets/d/1k-zN8IfrkC34jEXam9KoNXzpYzCp0ro_h9hPFZZ7Fe4/edit';

		this.db = new SpreadsheetDB({
			source_url: spreadsheet_url, 
			column_names: header_values
		});

		this.activeUser = activeUser
		this.spreadsheet_details = spreadsheet_details

	}

	spreadsheetDetails() {
		return this.spreadsheet_details;
	}

	getNewRequests()
	{
		return this.db.query.whereStatus('status', 'In Progress', "Pending Review").getResultsJson();
	}
	requestDetails(id)
	{
		return this.db.getRowDataById(id);
	}
	approveRequest(id)
	{
		//this.db.findRow('id',id).update('status','approved');
		let res = this.db.update(id, 'status', 'approved');
		return this._getJSONResult(res);
	}
	closeRequest(id) {
		// 0. get details of request
		let requestDetails = this.db.getRowDataById(id)
		let trello_card_id = requestDetails.trello_card_id
		console.log("trello_card_id: " + trello_card_id)
		// let email_address = requestDetails.email_address
		// let brief_url = requestDetails.brief_url
		// let unique_project_name = requestDetails.unique_project_name
		// let shared_folder = requestDetails.shared_folder
		// let resource_trello_ids = requestDetails.resource_trello_ids
		// let trello_card_url = requestDetails.trello_card_url
		// let cc_on_progress = requestDetails.cc_on_progress

		// 1. mark request as done on sheet
		let res = this.db.update(id, 'status', 'Pending Review');

		// 2. markTrelloCardAsDone(trelloCardId, token, key)
		let update = updateTrelloCardParamater(trello_card_id, 'dueComplete')
		console.log("trello update returned: " + update)

		return this._getJSONResult(res);
	}

	cancelRequest(id) {
		// get request details
		let requestDetails = this.db.getRowDataById(id)
		let trello_card_id = requestDetails.trello_card_id
		console.log("trello_card_id: " + trello_card_id)
		// set ss to cancelled
		let res = this.db.update(id, 'status', 'Pending Review');
		// mark trello card as Archived
		let update = updateTrelloCardParamater(trello_card_id, 'closed')

		return this._getJSONResult(res);
	}
	rejectRequest(id)
	{
		let res = this.db.update(id, 'status', 'rejected');
		return this._getJSONResult(res);		
	}
	newRequest(req)
	{
		req.id = 'id_' + Date.now();
		req.status = 'new';
		let res = this.db.insert(req);
		return this._getJSONResult(res);
	}
	approvedRequests()
	{
		return this.db.query.where('status','approved').getResultsJson();
		
	}

	closedRequests() {
		// return this.db.query.where('status', 'Done').getResultsJson();
		return this.db.query.whereStatus('status', 'Done', undefined).getResultsJson();

	}
	cancelledRequests() {
		// return this.db.query.where('status', 'Cancelled').getResultsJson();
		return this.db.query.whereStatus('status', 'Archived', undefined).getResultsJson();

	}
	_getJSONResult(res)
	{
		if(res)
		{
			return({result:'success'});
		}
		else
		{
			return({result:'failed'});	
		}
	}
}

export default RequestsApp;