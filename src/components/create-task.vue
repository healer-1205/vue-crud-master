<template>
  <div id="create-task">
    <h1>Create Task</h1>

    <p>
      <router-link :to="{ name: 'all_tasks' }" class="btn btn-warning">
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
        <button class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Notification from "./notifications.vue";
import * as constant from "../constant.js";

export default {
  data() {
    return {
      task: {
        name: "",
        status: ""
      },
      notifications: [],
    };
  },

  methods: {
    addTask() {
      // Validation
      if (this.task.status === "") {
        this.notifications.push({
          type: "danger",
          message: "You must select task status",
        });
        return false;
      }
      axios
        .post("http://" + constant.HOST + ":3000/api/task/create", this.task, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(
          () => {
            this.notifications.push({
              type: "success",
              message: "Task created successfully",
            });
          },
          () => {
            this.notifications.push({
              type: "error",
              message: "Task not created",
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
