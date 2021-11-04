<template>
  <div id="delete-product">
    <h1>Delete Product {{ product.name }}</h1>

    <p>
      <router-link :to="{ name: 'all_tasks' }" class="btn btn-warning"
        >Return to products</router-link
      >
    </p>

    <notification v-bind:notifications="notifications"></notification>

    <form v-on:submit.prevent="deleteProduct">
      <p><button class="btn btn-danger">Delete Product</button></p>
    </form>
  </div>
</template>

<script>
import Notification from "./notifications.vue";
import * as constant from "../constant.js";

export default {
  data() {
    return {
      product: {},
      notifications: [],
    };
  },

  created() {
    this.getProduct();
  },

  methods: {
    getProduct() {
      this.$http
        .get(`http://` + constant.HOST + `:3000/api/product/${this.$route.params.id}`)
        .then(
          (response) => {
            this.product = response.body;
          },
          (response) => {}
        );
    },

    deleteProduct() {
      this.$http
        .delete(
          `http://` + constant.HOST + `:3000/api/product/delete/${this.$route.params.id}`,
          this.product,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(
          (response) => {
            this.$router.push({ name: "all_tasks" });
          },
          (response) => {
            this.notifications.push({
              type: "danger",
              message: "Product could not deleted",
            });
          }
        );
    },
  },

  components: {
    notification: Notification,
  },
};
</script>
