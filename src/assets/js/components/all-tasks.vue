<template>
    <div id="all-tasks">
        <h1>All Tasks</h1>

        <p>
          <router-link :to="{ name: 'create_task' }" class="btn btn-primary">
            Create Task
          </router-link>
        </p>

        <div class="form-group">
            <input
              type="text"
              name="search"
              v-model="taskSearch"
              placeholder="Search tasks"
              class="form-control"
              v-on:keyup="searchTasks">
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
                    <td>{{ task.price }}</td>
                    <td>
                        <router-link
                          :to="{name: 'edit_task', params: { id: task.id }}"
                          class="btn btn-primary">
                          Edit
                        </router-link>
                        <router-link
                          :to="{name: 'delete_task', params: { id: task.id }}"
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
      tasks: [],
      originalTasks: [],
      taskSearch: '',
    };
  },

  created() {
    this.fetchTaskData();
  },

  methods: {
    fetchTaskData() {
      this.$http.get('http://localhost:3000/api/tasks').then((response) => {
        this.tasks = response.body;
        this.originalTasks = this.tasks;
      }, () => {

      });
    },

    searchTasks() {
      if (this.taskSearch === '') {
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
  },
};
</script>
