<template>
    <div id="create-product">
        <h1>Create Product</h1>

        <p><router-link :to="{ name: 'all_products' }">Return to products</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="addProduct">
            <div class="form-group">
                <label name="product_id">ID</label>
                <input type="text" class="form-control" disabled v-model="product.id" id="product_id">
            </div>

            <div class="form-group">
                <label name="product_name">Name</label>
                <input type="text" class="form-control" v-model="product.name" id="product_name" required>
            </div>

            <div class="form-group">
                <label name="product_price">Price</label>
                <input type="text" class="form-control" v-model="product.price" id="product_price" required>
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
    import Notification from './notifications.vue';

    export default{
        data(){
            return{
                product:{},
                notifications:[]
            }
        },

        methods: {
            addProduct: function()
            {
                // Validation
                var price = parseFloat(this.product.price);
                if(isNaN(price))
                {
                    this.notifications.push({
                        type: 'danger',
                        message: 'Price must be a number'
                    });
                    return false;
                } else {
                    this.product.price = this.product.price;
                }

                this.$http.post('http://localhost:3000/api/product/create', this.product, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.notifications.push({
                        type: 'success',
                        message: 'Product created successfully'
                    });
                }, (response) => {
                    this.notifications.push({
                        type: 'error',
                        message: 'Product not created'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>
