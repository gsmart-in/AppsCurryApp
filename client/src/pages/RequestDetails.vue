<template>
<div>
	<nav aria-label="breadcrumb">
	<ol class="breadcrumb">
	<li class="breadcrumb-item"><router-link to="/">Requests</router-link></li>
	<li class="breadcrumb-item active" aria-current="page">Request Details</li>
	</ol>
	</nav>
			
	<h1>Request Details</h1>
	<div class="section">
	<h5>ID</h5>
	{{req.job_number}}
	</div>

	<div class="section">
	<h5>Project</h5>
	{{req.project_name}}
	</div>

	<div class="section">
	<h5>Status</h5>
	{{req.status}}
	</div>

	<div class="section">
	<h5>Due Date</h5>
	{{req.due_date}}
	</div>
	

	<div class="section" v-for="(value, propertyName, index) in titledPropertyNames">
			<template v-if="value">
				<h5 >{{propertyName}}</h5>
				{{ value }} 
			</template>

	</div> 



	<div class="section" v-if="req.status == 'In Progress' ">
		<button type="button" class="btn btn-primary" @click="close()">Close Request</button>
		<button type="button" class="btn btn-warning" @click="cancel()">Archive Request</button>
	</div>

</div>
</template>
<script>
import BackEndWrapper from '../services/BackEndWrapper';
export default 
{
  name: 'RequestDetails',
  props:['id'],
  data()
  {
  	return ({
  		bw:new BackEndWrapper(),
  		req:{}
  	});
	},
	computed: {
		titledPropertyNames: function () {
			const notAllowed = ['trello_card_id', 'trello_card_data', 'project_name', 'job_number'];

			Object.keys(this.req)
			.filter(key => notAllowed.includes(key))
			.forEach(key => delete this.req[key]);

			var key, keys = Object.keys(this.req);
			var newobj={}
			var n = keys.length;

			while (n--) {
				key = keys[n];
				
				newobj[key.replace(/_/g, " ").replace(/\w\S*/g, function (t) { 
					return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); 
				})] = this.req[key];
			}
			console.log("newobj: " + newobj)
			return newobj
		}
	},
  mounted()
  {
  	this.loadRequest();
  },
  methods:
  {
  	loadRequest()
  	{
      console.log('loading request with id ',this.id);
      
  		this.bw.requestDetails(this.id).then(function(req)
	  	{
        console.log('requestDetails ', req);
	  		this.req = req;
	  	}.bind(this), 
	  	function(err)
        {
          console.log('Error occured ', err);

        }.bind(this));	
  	},
  	approve()
  	{
  		this.bw.approveRequest(this.id).then(function(res)
	  	{
	  		this.$router.push({ name: 'home'});
	  	}.bind(this), 
	  	function(err)
        {
          //this.showError();

        }.bind(this));
		},
		close()
  	{
  		this.bw.closeRequest(this.id).then(function(res)
	  	{
	  		this.$router.push({ name: 'home'});
	  	}.bind(this), 
	  	function(err)
        {
          //this.showError();

        }.bind(this));
		},
		cancel()
  	{
  		this.bw.cancelRequest(this.id).then(function(res)
	  	{
	  		this.$router.push({ name: 'home'});
	  	}.bind(this), 
	  	function(err)
        {
          //this.showError();

        }.bind(this));
  	},
  	reject()
  	{
  		this.bw.rejectRequest(this.id).then(function(res)
	  	{
	  		this.$router.push({ name: 'home'});
	  	}.bind(this), 
	  	function(err)
        {
          //this.showError();

        }.bind(this));
  	}
  }
}
</script>