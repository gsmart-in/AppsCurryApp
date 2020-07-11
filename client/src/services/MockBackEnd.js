'use strict';

// var mock_requests=[
// { id:'x1', device_type:'mobile', details:'IPhone X required for 10 sales people by end of this week',status:'new' },
// { id:'x2', device_type:'laptop', details:'Macbook Pro required for the new 5 deveopers',status:'new' },
// { id:'x3', device_type:'server', details:'Cache server required for the new Web App setup',status:'new' }
// ];

var mock_requests = [
	{
		id: 1,
		shared_folder: 'test',
		trello_card_id: 'test',
		resource: 'nicolai.robles@nielsen.com',
		resource_trello_ids: '',
		status: 'In Progress',
		trello_card_url: 'test',
		trello_card_data: 'test',
		unique_project_name: 'Do this now!',
		brief_url: 'https://docs.google.com/a/nielsen.com/open?id=1_FLakMe8KfBwSZWKozPjZSwj-kVOOjY9gAXDyGqKeVo',
		timestamp: '12/11/2017 7:46:21',
		email_address: 'bill@nielsen.com',
	},
	{
		id: 2,
		shared_folder: 'test',
		trello_card_id: 'test',
		resource: 'nicolai.robles@nielsen.com',
		resource_trello_ids: '',
		status: 'In Progress',
		trello_card_url: 'test',
		trello_card_data: 'test',
		unique_project_name: 'Do this now! 2',
		brief_url: 'test',
		timestamp: '12/11/2017 7:46:21',
		email_address: 'bill@nielsen.com',

	},
	{
		id: 3,
		shared_folder: 'test',
		trello_card_id: 'test',
		resource: 'nicolai.robles@nielsen.com',
		resource_trello_ids: '',
		status: 'Done',
		trello_card_url: 'test',
		trello_card_data: 'test',
		unique_project_name: 'Do this now! 3',
		brief_url: 'test',
		timestamp: '12/11/2017 7:46:21',
		email_address: 'bill@nielsen.com',

	}]



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
		let results = mock_requests.filter(req=>req.status == 'In Progress');
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