<template>
<div>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
    <li class="breadcrumb-item"><router-link to="/">Requests</router-link></li>
    <li class="breadcrumb-item active" aria-current="page">Cancelled Requests</li>
    </ol>
  </nav>

	<h3>Cancelled Requests</h3>
	<table class="table table-striped">
    <thead>
      <tr>
      	<th>Job Number</th>
      	<th>Project Name</th>
        <th>Status</th>
        <th>Due Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="request in requests">
      	<td>{{request.job_number}}</td>
        <td><router-link :to="{name:'detail', params:{ id:request.job_number } }">{{request.project_name}}</router-link></td>
      	<td>{{request.status}}</td>
      	<td>{{request.due_date}}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
import BackEndWrapper from '../services/BackEndWrapper';
export default {
  name: 'CancelledRequests',
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
	  	this.bw.cancelledRequests().then(function(res)
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