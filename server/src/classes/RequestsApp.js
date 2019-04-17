'use strict';
import SpreadsheetDB from './SpreadsheetDB.js';

class RequestsApp
{
	constructor( spreadsheet_url )
	{
		//this.spreadsheet_url = 
		//'https://docs.google.com/spreadsheets/d/1k-zN8IfrkC34jEXam9KoNXzpYzCp0ro_h9hPFZZ7Fe4/edit';

		this.db = new SpreadsheetDB({
			source_url: spreadsheet_url, 
			column_names: ['id','device_type', 'details', 'status']
		});
	}

	getNewRequests()
	{
		//this.db.query.where('status','new').results().json()
		return this.db.query.where('status','new').getResultsJson();
	}
	requestDetails(id)
	{
		//this.db.findRow('id',id).json()
		return this.db.getRowDataById(id);
	}
	approveRequest(id)
	{
		//this.db.findRow('id',id).update('status','approved');
		let res = this.db.update(id, 'status', 'approved');
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