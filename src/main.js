import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import App from './App.vue'

import AllProducts from './assets/js/components/all-products.vue';
const CreateProduct = require('./assets/js/components/create-product.vue');
const EditProduct = require('./assets/js/components/edit-product.vue');
const DeleteProduct = require('./assets/js/components/delete-product.vue');

const routes = [
    {
        name: 'all_products',
        path: '/',
        component: AllProducts
    },
    {
        name: 'create_product',
        path: '/products/create',
        component: CreateProduct
    },
    {
        name: 'edit_product',
        path: '/products/edit/:id',
        component: EditProduct
    },
    {
        name: 'delete_product',
        path: '/products/delete/:id',
        component: DeleteProduct
    }
];
var router = new VueRouter({ routes: routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');