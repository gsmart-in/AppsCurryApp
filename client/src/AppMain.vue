<template>
	<div class="wrapper" id="req_app" >
		<!-- Sidebar  -->
		<nav id="sidebar">
		    <div class="sidebar-header">
		        <h3>{{spreadsheetName}}</h3>
		    </div>
		    <ul class="list-unstyled components">
		        <li><router-link to="/"> Open Requests</router-link></li>
		        <li><router-link to="/closed"> Closed Requests</router-link></li>
		        <li><router-link to="/cancelled"> Cancelled Requests</router-link></li>
		        <li><a href="https://docs.google.com/forms/d/e/1FAIpQLScZOxRJCeGo-j-op14XWX0bGfqutknUjpUuZkGra-AxUI6l7g/viewform" target="_blank"> New Request</a></li>
		    </ul>
		</nav>
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
  		spreadsheetName:''
  	});
  },
  mounted(){
    this.getSpreadsheetName();
  },
  methods: {
  	getSpreadsheetName()
  	{
	  	this.bw.getSpreadsheetName().then(function(res)
	  	{
        console.log('spreadsheetName ', res);
	  		this.spreadsheetName = res;
	  	}.bind(this), 
	  	function(err)
        {
        }.bind(this));	
  	}
  	
  }
}
</script>