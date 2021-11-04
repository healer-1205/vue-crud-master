<template>
  <div id="update-task">
    <h1>Update Task</h1>

    <p>
      <router-link :to="{ name: 'all_tasks' }" class="btn btn-warning"
        >Return to tasks
      </router-link>
    </p>

    <notification v-bind:notifications="notifications"></notification>

    <form v-on:submit.prevent="editTask">
      <div class="form-group">
        <label name="task_id">ID</label>
        <input
          type="text"
          class="form-control"
          style="width: 100%"
          disabled
          v-model="task.id"
          id="task_id"
        />
      </div>

      <div class="form-group">
        <label name="task_name">Name</label>
        <input
          type="text"
          class="form-control"
          style="width: 100%"
          v-model="task.name"
          id="task_name"
          required
        />
      </div>

      <div class="form-group">
        <label name="task_status">Status</label>
        <select
          name="status"
          id=""
          class="form-control"
          style="width: 100%"
          v-model="task.status"
        >
          <option disabled value="">Select Task Status</option>
          <option value="pending">Pending</option>
          <option value="finished">Finished</option>
        </select>
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import Notification from "./notifications.vue";
import * as constant from "../constant.js";

export default {
  data() {
    return {
      task: {},
      notifications: [],
    };
  },

  created() {
    this.getTask();
  },

  methods: {
    getTask() {
      this.$http
        .get(`http://` + constant.HOST + `:3000/api/task/${this.$route.params.id}`)
        .then(
          (response) => {
            this.task = response.body;
          }
        );
    },

    editTask() {
      this.$http
        .patch(
          `http://` + constant.HOST + `:3000/api/task/edit/${this.$route.params.id}`,
          this.task,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(
          (response) => {
            this.notifications.push({
              type: "success",
              message: "Task updated successfully",
            });
          },
          (response) => {
            this.notifications.push({
              type: "error",
              message: "Task not updated",
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
