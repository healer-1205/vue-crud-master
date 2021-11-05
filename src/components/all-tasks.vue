<template>
  <div id="all-tasks">
    <h1>All Tasks</h1>

    <p>
      <router-link :to="{ name: 'create_task' }" class="btn btn-primary">
        Create Task
      </router-link>
    </p>
    <div :style="searchField">
      <div class="form-group">
        <input
          type="text"
          name="search"
          v-model="taskSearch"
          placeholder="Search tasks"
          class="form-control"
          v-on:keyup="searchTasks"
        />
      </div>
      <div class="form-group" style="margin-left: 15px">
        <select
          name="status"
          id=""
          class="form-control"
          v-model="statusSearch"
          v-on:change="searchStatus"
        >
          <option disabled value="">Select Task Status</option>
          <option value="">All</option>
          <option value="pending">pending</option>
          <option value="finished">finished</option>
        </select>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Status</td>
          <td>Actions</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.name }}</td>
          <td>{{ task.status }}</td>
          <td>
            <router-link
              :to="{ name: 'edit_task', params: { id: task.id } }"
              class="btn btn-primary"
            >
              Edit
            </router-link>
            <router-link
              :to="{ name: 'delete_task', params: { id: task.id } }"
              class="btn btn-danger"
            >
              Delete
            </router-link>
            <button
              class="btn btn-info"
              @click="changeStatus(task.id)"
              v-if="task.status === 'pending'"
            >
              Done
            </button>
            <button
              class="btn btn-secondary"
              @click="changeStatus(task.id)"
              v-else
              disabled
            >
              Done
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as constant from "../constant.js";

export default {
  data() {
    return {
      tasks: [],
      originalTasks: [],
      taskSearch: this.$store.state.searchValue,
      statusSearch: this.$store.state.selectedStatus,
      searchField: {
        display: "flex",
        flexDirection: "row",
      },
    };
  },

  created() {
    this.fetchTaskData();
  },

  methods: {
    fetchTaskData() {
      this.$http.get("http://" + constant.HOST + ":3000/api/tasks").then(
        (response) => {
          this.tasks = response.body;
          this.originalTasks = response.body;
          this.searchStatus();
          this.searchTasks();
        },
        () => {}
      );
    },

    changeStatus(id) {
      this.$http
        .patch(
          `http://` + constant.HOST + `:3000/api/task/editStatus/` + id,
          this.task,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const Id = response.body.id;
          this.originalTasks.find((task, index) => {
            if (task.id === Id) {
              task.status = response.body.status;
              this.tasks = this.originalTasks;
            }
          });
          alert("Status Successfully Updated!!!");
        });
    },

    searchStatus() {
      this.$store.commit('updateStatus', this.statusSearch);
      if (this.statusSearch === "") {
        this.tasks = this.originalTasks;
        return;
      }
      const searchedStatus = [];
      for (let i = 0; i < this.originalTasks.length; i += 1) {
        const taskStatus = this.originalTasks[i].status.toLowerCase();
        if (taskStatus === this.statusSearch) {
          searchedStatus.push(this.originalTasks[i]);
        }
      }
      this.tasks = searchedStatus;
    },

    searchTasks() {
      this.$store.commit('updateSearchValue', this.taskSearch);
      if (this.taskSearch === "") {
        this.tasks = this.originalTasks;
        return;
      }
      const searchedTasks = [];
      for (let i = 0; i < this.originalTasks.length; i += 1) {
        const taskName = this.originalTasks[i].name.toLowerCase();
        if (taskName.indexOf(this.taskSearch.toLowerCase()) >= 0) {
          searchedTasks.push(this.originalTasks[i]);
        }
      }

      this.tasks = searchedTasks;
    },

    updateSearchValue() {
      this.$store.commit();
    },
  },
};
</script>
