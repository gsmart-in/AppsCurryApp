import Vue from 'vue';
import Router from 'vue-router';
import NewRequest from './NewRequest.vue';
import RequestDetails from './RequestDetails.vue';
import Requests from './Requests.vue';
import ClosedRequests from './ClosedRequests.vue';
import CancelledRequests from './CancelledRequests.vue';


Vue.use(Router);

export default new Router({
  routes: [
    { name:'home', path: '/', component: Requests },
    { path: '/new', component: NewRequest },
    { name:'detail', path: '/detail/:id',  component: RequestDetails, props:true },
    { name: 'closed', path: '/closed', component: ClosedRequests },
    { name: 'cancelled', path: '/cancelled', component: CancelledRequests },
  ],
  linkExactActiveClass: "active"
});