import Vue from 'vue';
import Router from 'vue-router';
import NewRequest from './NewRequest.vue';
import RequestDetails from './RequestDetails.vue';
import Requests from './Requests.vue';
import ApprovedRequests from './ApprovedRequests.vue';


Vue.use(Router);

export default new Router({
  routes: [
    { name:'home', path: '/', component: Requests },
    { path: '/new', component: NewRequest },
    { name:'detail', path: '/detail/:id',  component: RequestDetails, props:true },
    { name:'approved', path: '/approved', component: ApprovedRequests },
  ],
  linkExactActiveClass: "active"
});