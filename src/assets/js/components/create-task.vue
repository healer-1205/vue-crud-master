<template>
  <div id="create-task">
    <h1>Create Task</h1>

    <p>
      <router-link
        :to="{ name: 'all_tasks' }"
        class="btn btn-warning">
        Return to tasks
      </router-link>
    </p>

    <notification v-bind:notifications="apples"></notification>

    <form v-on:submit.prevent="addTask">
      <div class="form-group">
        <label name="task_id">ID</label>
        <input
          type="text"
          class="form-control"
          disabled
          v-model="product.id"
          id="task_id"
        />
      </div>

      <div class="form-group">
        <label name="task_name">Name</label>
        <input
          type="text"
          class="form-control"
          v-model="product.name"
          id="task_name"
          required
        />
      </div>

      <div class="form-group">
        <label name="task_price">Price</label>
        <input
          type="text"
          class="form-control"
          v-model="product.price"
          id="task_price"
          required
        />
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Notification from './notifications.vue';

export default {
  data() {
    return {
      product: {},
      notifications: [],
    };
  },

  methods: {
    addTask() {
      // Validation
      const price = parseFloat(this.product.price);
      if (isNaN(price)) {
        this.notifications.push({
          type: 'danger',
          message: 'Price must be a number',
        });
        return false;
      }
      this.product.price = this.product.price;

      axios
        .post('http://localhost:3000/api/task/create', this.product, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(
          () => {
            this.notifications.push({
              type: 'success',
              message: 'Task created successfully',
            });
          },
          () => {
            this.notifications.push({
              type: 'error',
              message: 'Task not created',
            });
          },
        );
    },
  },

  components: {
    notification: Notification,
  },
};
</script>
