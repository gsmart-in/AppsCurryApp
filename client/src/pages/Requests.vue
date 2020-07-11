<template>
<div>
	<h3>Open Requests</h3>
		<table class="table table-striped">
    <thead>
      <tr>
      	<th>Project Name</th>
        <th>Status</th>
        <th>Due Date</th>
        <th>Assignee(s)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="request in requests">
        <!-- <td><a :href="'https:'+request.brief_url">{{request.unique_project_name}}</a></td> -->
        <!-- href="https://docs.google.com/forms/d/e/1FAIpQLScZOxRJCeGo-j-op14XWX0bGfqutknUjpUuZkGra-AxUI6l7g/viewform" target="_blank" -->
        <td><router-link :to="{name:'detail', params:{ id:request.job_number } }">{{request.unique_project_name}}</router-link></td>

      	<td>{{request.status}}</td>
      	<td>{{request.when_does_your_request_need_to_be_completed}}</td>
        <td><a :href=" 'mailto:' +request.resource" :target="_blank">{{request.resource}}</a></td>
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