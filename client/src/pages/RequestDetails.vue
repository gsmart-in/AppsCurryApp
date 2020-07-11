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
	{{req.unique_project_name}}
	</div>

	<div class="section">
	<h5>Status</h5>
	{{req.status}}
	</div>

	<div class="section">
	<h5>Assignee(s)</h5>
	{{req.resource}}
	</div>

	<div class="section">
	<h5>Due Date</h5>
	{{req.when_does_your_request_need_to_be_completed}}
	</div>
	

	<div class="section" v-for="(value, propertyName, index) in titledPropertyNames">
			<template v-if="value">
				<h5 >{{propertyName}}</h5>
				{{ value }} 
			</template>

	</div> 



  <!-- <div v-for="(value, propertyName, index) in titledPropertyNames"> -->
  <!-- </div> -->


  <!-- <div v-for="(store, index) in stores">
    <component :is="store.link?'a':'span'" :href="store.link || ''" target="_blank">{{store.title}}
    </component>
  </div> -->





	<div class="section" v-if="req.status == 'In Progress' ">
		<button type="button" class="btn btn-primary" @click="close()">Submit Close Request</button>
		<button type="button" class="btn btn-warning" @click="cancel()">Submit Cancel Request</button>
	</div>

	<!-- <div class="section" v-if="req.status == 'Done' "> -->
		<!-- <button type="button" class="btn btn-primary" @click="close()">Submit Re-Open Request</button> -->
		<!-- <button type="button" class="btn btn-warning" @click="cancel()">Submit Cancel/Archive Request</button> -->
	<!-- </div> -->
<!-- 
	<div class="section" v-if="req.status == 'Cancelled' ">
		<button type="button" class="btn btn-primary" @click="close()">Submit Re-Open Request</button>
	</div> -->



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
			const notAllowed = ["when_does_your_request_need_to_be_completed", 'trello_card_id', 'trello_card_data', 'resource_trello_ids', 'project_name', 'unique_project_name', 'other_requests_i_understand_that_my_request_includes_externally_facing_content_and_i_certify_that_i_have_read_and_understand_the_global_mar_com_guidelines_and_policies_and_that_this_post_is_in_full_compliance_with_those_guidelines_and_policies', 'id'];

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