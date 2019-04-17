<template>
<div>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
    <li class="breadcrumb-item"><router-link to="/">Requests</router-link></li>
    <li class="breadcrumb-item active" aria-current="page">Approved Requests</li>
    </ol>
  </nav>

	<h1>Approved Requests</h1>
	<table class="table table-striped">
    <thead>
      <tr>
      	<th>Type</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="reqq in requests">
      	<td>{{reqq.device_type}}</td>
        <td><router-link :to="{name:'detail', params:{ id:reqq.id } }">{{reqq.details}}</router-link></td>
        
      </tr>
      
    </tbody>
  </table>
</div>
</template>
<script>
import BackEndWrapper from '../services/BackEndWrapper';
export default {
  name: 'ApprovedRequests',
  data(){
  	return ({
  		bw:new BackEndWrapper(),
  		requests:[]
  	});
  },
  mounted()
  {
      this.loadRequests();
  },
  methods:
  {
  	loadRequests()
  	{
	  	this.bw.approvedRequests().then(function(res)
	  	{
	  		this.requests = res;
	  	}.bind(this), 
	  	function(err)
        {
          //this.showError();

        }.bind(this));	
  	}
  	
  }
}
</script>