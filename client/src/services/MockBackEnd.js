'use strict';

var mock_requests=[
{ id:'x1', device_type:'mobile', details:'IPhone X required for 10 sales people by end of this week',status:'new' },
{ id:'x2', device_type:'laptop', details:'Macbook Pro required for the new 5 deveopers',status:'new' },
{ id:'x3', device_type:'server', details:'Cache server required for the new Web App setup',status:'new' }
];

class MockBackEnd
{
	constructor()
	{
		this.id_mapping={};

		for (var req of mock_requests) 
		{
			this.id_mapping[req.id] = req;
		}
	}
	loadRequests()
	{
		let results = mock_requests.filter(req=>req.status == 'new');
		return this.later(results);
	}
	requestDetails(id)
	{
		let ret_req = this.id_mapping[id];
		return this.later(ret_req );
	}
	approveRequest(id)
	{
		this.id_mapping[id].status = 'approved';
		return this.later({result:'success'} );
	}
	rejectRequest(id)
	{
		this.id_mapping[id].status = 'rejected';
		return this.later({result:'success'} );
	}
	newRequest(req)
	{
		req.id = 'id_' + Date.now();
		req.status = 'new';
		mock_requests.push(req);
		this.id_mapping[req.id] = req;

		return this.later({result:'success'} );
	}
	approvedRequests()
	{
		let results = mock_requests.filter(req=>req.status == 'approved');
		return this.later(results);
	}
	later(value) 
	{
		return new Promise(function(resolve) 
		{
			setTimeout(function() 
			{
			    resolve(value);
			}, 500);
		});
	}
};

export default MockBackEnd;