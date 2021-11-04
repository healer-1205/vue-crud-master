import Vue from 'vue';

import VueRouter from 'vue-router';

import VueResource from 'vue-resource';

import App from './App.vue';

import AllProducts from './assets/js/components/all-products.vue';
import CreateProduct from './assets/js/components/create-product.vue';
import EditProduct from './assets/js/components/edit-product.vue';
import DeleteProduct from './assets/js/components/delete-product.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  {
    name: 'all_products',
    path: '/',
    component: AllProducts,
  },
  {
    name: 'create_product',
    path: '/products/create',
    component: CreateProduct,
  },
  {
    name: 'edit_product',
    path: '/products/edit/:id',
    component: EditProduct,
  },
  {
    name: 'delete_product',
    path: '/products/delete/:id',
    component: DeleteProduct,
  },
];
const router = new VueRouter({ routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
