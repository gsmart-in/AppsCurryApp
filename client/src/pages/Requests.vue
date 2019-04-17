<template>
<div>
	<h1>Requests</h1>
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
  name: 'Requests',
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