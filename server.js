const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const TASKS_FILE = path.join(__dirname, 'src/assets/task-data.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Additional middleware which will set headers that we need on each request.
app.use((req, res, next) => {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/tasks', (req, res) => {
  fs.readFile(TASKS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/task/:id', (req, res) => {
  fs.readFile(TASKS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const json = JSON.parse(data);

    for (let i = 0; i <= json.length; i++) {
      if (json[i].id == req.params.id) {
        res.json(json[i]);
        break;
      }
    }
  });
});

app.post('/api/task/create', (req, res) => {
  fs.readFile(TASKS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const tasks = JSON.parse(data);
    const newProduct = {
      id: tasks.length + 1,
      name: req.body.name,
      status: req.body.status,
    };
    tasks.push(newProduct);
    fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 4), (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(tasks);
    });
  });
});

app.patch('/api/task/edit/:id', (req, res) => {
  fs.readFile(TASKS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const products = JSON.parse(data);

    for (let i = 0; i <= products.length; i++) {
      if (products[i].id == req.params.id) {
        const product = products[i];
        product.name = req.body.name;
        product.status = req.body.status;

        products.splice(i, 1);
        products.push(product);

        fs.writeFile(TASKS_FILE, JSON.stringify(products, null, 4), (err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          res.json(products);
        });
        break;
      }
    }
  });
});

app.patch('/api/task/editStatus/:id', (req, res) => {
  fs.readFile(TASKS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const tasks = JSON.parse(data);

    for (let i = 0; i <= tasks.length; i++) {
      if (tasks[i].id == req.params.id) {
        const task = tasks[i];
        task.status = "finished";

        tasks.splice(i, 1);
        tasks.push(task);

        fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 4), (err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          res.json(task);
        });
        break;
      }
    }
  });
});

app.delete('/api/product/delete/:id', (req, res) => {
  fs.readFile(TASKS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const products = JSON.parse(data);

    for (let i = 0; i <= products.length; i++) {
      if (products[i].id == req.params.id) {
        products.splice(i, 1);

        fs.writeFile(TASKS_FILE, JSON.stringify(products, null, 4), (err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          res.json(products);
        });
        break;
      }
    }
  });
});

app.listen(app.get('port'),'0.0.0.0', () => {
  console.log(`Server started: http://192.168.6.160:${app.get('port')}/`);
});
