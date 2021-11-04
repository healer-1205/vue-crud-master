const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PRODUCTS_FILE = path.join(__dirname, 'src/assets/js/components/product-data.json');

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

app.get('/api/products', (req, res) => {
  fs.readFile(PRODUCTS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/product/:id', (req, res) => {
  fs.readFile(PRODUCTS_FILE, (err, data) => {
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

app.post('/api/product/create', (req, res) => {
  fs.readFile(PRODUCTS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const products = JSON.parse(data);

    const newProduct = {
      id: Date.now(),
      name: req.body.name,
      price: req.body.price,
    };
    products.push(newProduct);
    fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(products);
    });
  });
});

app.patch('/api/product/edit/:id', (req, res) => {
  fs.readFile(PRODUCTS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const products = JSON.parse(data);

    for (let i = 0; i <= products.length; i++) {
      if (products[i].id == req.params.id) {
        const product = products[i];
        product.name = req.body.name;
        product.price = req.body.price;

        products.splice(i, 1);
        products.push(product);

        fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), (err) => {
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

app.delete('/api/product/delete/:id', (req, res) => {
  fs.readFile(PRODUCTS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const products = JSON.parse(data);

    for (let i = 0; i <= products.length; i++) {
      if (products[i].id == req.params.id) {
        products.splice(i, 1);

        fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), (err) => {
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

app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});
