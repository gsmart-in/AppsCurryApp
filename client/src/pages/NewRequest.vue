<template>
<div>
		<nav aria-label="breadcrumb">
		<ol class="breadcrumb">
		<li class="breadcrumb-item"><router-link to="/">Requests</router-link></li>
		<li class="breadcrumb-item active" aria-current="page">New Request</li>
		</ol>
		</nav>

		<h1>New Request</h1>
		<p>
			Enter the details of the device you want below.
		</p>
		<div class="form-group">
		<label for="type">Request type:</label>
		<select class="form-control" id="type" v-model="req.device_type">
		<option value="">Select ...</option>
		<option value="laptop">Laptop</option>
		<option value="phone">Mobile Phone</option>
		<option value="test_aparatus">Testing aparatus</option>
		<option value="server">Server </option>
		</select>
	   </div>
		<div class="form-group">
		<label for="exampleFormControlTextarea1">Describe details here</label>
		<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="req.details"></textarea>
		</div>
		<button type="button" class="btn btn-primary" @click="postRequest()">Create</button>
</div>
</template>
<script>
import BackEndWrapper from '../services/BackEndWrapper';

export default {
  name: 'NewRequest',
  data()
  {
  	return({
  		req:{
  			device_type:'',
  			details:''
  		},
  		bw:new BackEndWrapper()
  	});
  },
  methods:
  {
  	postRequest()
  	{
  		this.bw.newRequest(this.req).then(function(res)
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