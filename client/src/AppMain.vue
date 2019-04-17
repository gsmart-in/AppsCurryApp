<template>
	<div class="wrapper" id="req_app" >
		<!-- Sidebar  -->
		<nav id="sidebar">
		    <div class="sidebar-header">
		        <h3>Request Management App</h3>
		    </div>
		    <ul class="list-unstyled components">
		        <li><router-link to="/"> Requests</router-link></li>
		        <li><router-link to="/approved"> Approved Requests</router-link></li>
		        <li><router-link to="/new"> New Request</router-link></li>
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
export default {
  name: 'AppMain',
  router
}
</script>