'use strict';
import MockBackEnd from './MockBackEnd.js';
import GASBackEnd from './GASBackEnd.js';

class BackEndWrapper
{
	constructor()
	{
		if (typeof google !== 'undefined')
		{
			this.real = new GASBackEnd();
		}
		else
		{
			this.real = new MockBackEnd();
		}
	}

	loadRequests() {
		return this.real.loadRequests();
	}
	spreadsheetDetails() {
		return this.real.spreadsheetDetails();
	}
	requestDetails(id)
	{
		return this.real.requestDetails(id);
	}
	approveRequest(id)
	{
		return this.real.approveRequest(id);
	}
	closeRequest(id) {
		return this.real.closeRequest(id);
	}
	cancelRequest(id) {
		return this.real.cancelRequest(id);
	}
	rejectRequest(id)
	{
		return this.real.rejectRequest(id);
	}
	newRequest(req)
	{
		return this.real.newRequest(req);
	}
	approvedRequests()
	{
		return this.real.approvedRequests();
	}
	closedRequests() {
		return this.real.closedRequests();
	}
	cancelledRequests() {
		return this.real.cancelledRequests();
	}
};

export default BackEndWrapper;

