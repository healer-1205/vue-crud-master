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

    <notification v-bind:notifications="notifications"></notification>

    <form v-on:submit.prevent="addTask">
      <div class="form-group">
        <label name="task_name">Name</label>
        <input
          type="text"
          class="form-control"
          v-model="task.name"
          id="task_name"
          required
        />
      </div>

      <div class="form-group">
        <label name="task_status">Status</label>
        <input
          type="text"
          class="form-control"
          v-model="task.price"
          id="task_status"
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
      task: {},
      notifications: [],
    };
  },

  methods: {
    addTask() {
      // Validation
      const price = parseFloat(this.task.price);
      if (isNaN(price)) {
        this.notifications.push({
          type: 'danger',
          message: 'Price must be a number',
        });
        return false;
      }
      this.task.price = this.task.price;

      axios
        .post('http://localhost:3000/api/task/create', this.task, {
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
