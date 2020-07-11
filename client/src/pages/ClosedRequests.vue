<template>
<div>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
    <li class="breadcrumb-item"><router-link to="/">Requests</router-link></li>
    <li class="breadcrumb-item active" aria-current="page">Closed Requests</li>
    </ol>
  </nav>

	<h3>Closed Requests</h3>
	<table class="table table-striped">
    <thead>
      <tr>
      	<th>Project Name</th>
        <th>Status</th>
        <th>Due Date</th>
        <th>Assignee(s)</th>
        <!-- <th>Date Submitted</th> -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="request in requests">
        <!-- <td><a :href="'https:'+request.brief_url">{{request.unique_project_name}}</a></td> -->
        <td><router-link :to="{name:'detail', params:{ id:request.job_number } }">{{request.unique_project_name}}</router-link></td>

      	<td>{{request.status}}</td>
      	<td>{{request.when_does_your_request_need_to_be_completed}}</td>
        <td><a :href=" 'mailto:' +request.resource">{{request.resource}}</a></td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
import BackEndWrapper from '../services/BackEndWrapper';
export default {
  name: 'ClosedRequests',
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
	  	this.bw.closedRequests().then(function(res)
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