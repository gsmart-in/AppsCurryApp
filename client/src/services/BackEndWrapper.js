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

	loadRequests()
	{
		return this.real.loadRequests();
	}
	requestDetails(id)
	{
		return this.real.requestDetails(id);
	}
	approveRequest(id)
	{
		return this.real.approveRequest(id);
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
};

export default BackEndWrapper;

