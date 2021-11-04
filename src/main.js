import Vue from 'vue';

import VueRouter from 'vue-router';

import VueResource from 'vue-resource';

import App from './App.vue';

import AllTasks from './assets/js/components/all-tasks.vue';
import CreateTask from './assets/js/components/create-task.vue';
import EditTask from './assets/js/components/edit-task.vue';
import DeleteTask from './assets/js/components/delete-task.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  {
    name: 'all_tasks',
    path: '/',
    component: AllTasks,
  },
  {
    name: 'create_task',
    path: '/tasks/create',
    component: CreateTask,
  },
  {
    name: 'edit_task',
    path: '/tasks/edit/:id',
    component: EditTask,
  },
  {
    name: 'delete_task',
    path: '/tasks/delete/:id',
    component: DeleteTask,
  },
];
const router = new VueRouter({ routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
