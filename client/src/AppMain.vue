<template>
	<div class="wrapper" id="req_app" >
		<!-- Sidebar  -->
		<nav id="sidebar">
		    <div class="sidebar-header">
		        <h3>{{spreadsheet_details.ssName}}</h3>
		    </div>
				<p class="signed-in">Signed in as:</br>
					<span class="active-user">{{spreadsheet_details.activeUser}}</span>
				</p>
		    <ul class="list-unstyled components">
		        <li><router-link to="/"> Open Requests</router-link></li>
		        <li><router-link to="/closed"> Closed Requests</router-link></li>
		        <li><router-link to="/cancelled"> Cancelled Requests</router-link></li>
		        <li><a v-bind:href='spreadsheet_details.formUrl' target="_blank"> New Request</a></li>
		    </ul>
		</nav>
		<!-- Page Content  -->
		<div id="content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
import router from './pages/routes';
import BackEndWrapper from './services/BackEndWrapper';
export default {
  name: 'AppMain',
	router,
	data(){
  	return ({
  		bw:new BackEndWrapper(),
  		spreadsheet_details:{}
  	});
  },
  mounted(){
    this.spreadsheetDetails();
  },
  methods: {
  	spreadsheetDetails()
  	{
	  	this.bw.spreadsheetDetails().then(function(res)
	  	{
	  		this.spreadsheet_details = res;
	  	}.bind(this), 
	  	function(err)
        {
          //this.showError();

        }.bind(this));	
  	}
  	
  }
}
</script>