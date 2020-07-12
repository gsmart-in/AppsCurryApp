<template>
<div>
	<h3>Open Requests</h3>
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
  name: 'Requests',
  data(){
  	return ({
  		bw:new BackEndWrapper(),
  		requests:[]
  	});
  },
  mounted(){
    this.loadRequests();
  },
  methods: {
  	loadRequests()
  	{
	  	this.bw.loadRequests().then(function(res)
	  	{
        console.log('requests ', res);
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