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
	<h5>Device Type</h5>
	{{req.device_type}}
	</div>

	<div class="section">
	<h5>Details</h5>
	{{req.details}}
	</div>
	
	<div class="section" v-if="req.status == 'new' ">
		<button type="button" class="btn btn-warning" @click="reject()">Reject</button> 
		<button type="button" class="btn btn-primary" @click="approve()">Approve</button>
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