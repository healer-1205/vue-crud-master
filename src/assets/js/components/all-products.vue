<template>
    <div id="all-products">
        <h1>All Products</h1>

        <p>
          <router-link :to="{ name: 'create_product' }" class="btn btn-primary">
          Create Product
          </router-link>
        </p>

        <div class="form-group">
            <input
              type="text"
              name="search"
              v-model="productSearch"
              placeholder="Search products"
              class="form-control"
              v-on:keyup="searchProducts">
        </div>
        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Price</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>
                        <router-link
                          :to="{name: 'edit_product', params: { id: product.id }}"
                          class="btn btn-primary">
                          Edit
                        </router-link>
                        <router-link
                          :to="{name: 'delete_product', params: { id: product.id }}"
                          class="btn btn-danger">
                          Delete
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
  data() {
    return {
      products: [],
      originalProducts: [],
      productSearch: '',
    };
  },

  created() {
    this.fetchProductData();
  },

  methods: {
    fetchProductData() {
      this.$http.get('http://localhost:3000/api/products').then((response) => {
        this.products = response.body;
        this.originalProducts = this.products;
      }, () => {

      });
    },

    searchProducts() {
      if (this.productSearch === '') {
        this.products = this.originalProducts;
        return;
      }
      const searchedProducts = [];
      for (let i = 0; i < this.originalProducts.length; i += 1) {
        const productName = this.originalProducts[i].name.toLowerCase();
        if (productName.indexOf(this.productSearch.toLowerCase()) >= 0) {
          searchedProducts.push(this.originalProducts[i]);
        }
      }

      this.products = searchedProducts;
    },
  },
};
</script>
