var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var PRODUCTS_FILE = path.join(__dirname, 'src/assets/js/components/product-data.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/products', function(req, res) {
    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});


app.get('/api/product/:id', function(req, res) {

    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var json = JSON.parse(data);

        for(var i = 0; i <= json.length; i++)
        {
            if(json[i]['id'] == req.params.id)
            {
                res.json(json[i]);
                break;
            }
        }
    });
});

app.post('/api/product/create', function(req, res) {

    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var products = JSON.parse(data);

        var newProduct = {
            id: Date.now(),
            name: req.body.name,
            price: req.body.price,
        };
        products.push(newProduct);
        fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(products);
        });
    });
});

app.patch('/api/product/edit/:id', function(req, res) {
    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var products = JSON.parse(data);

        for(var i = 0; i <= products.length; i++)
        {
            if(products[i]['id'] == req.params.id)
            {
                var product = products[i];
                product.name = req.body.name;
                product.price = req.body.price;

                products.splice(i, 1);
                products.push(product);

                fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function(err) {
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

app.delete('/api/product/delete/:id', function(req, res) {
    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var products = JSON.parse(data);

        for(var i = 0; i <= products.length; i++)
        {
            if(products[i]['id'] == req.params.id)
            {
                products.splice(i, 1);

                fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function(err) {
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


app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});