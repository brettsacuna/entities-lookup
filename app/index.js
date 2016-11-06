var config          = require('./../config.json');
var express         = require('express');
var serveStatic     = require('serve-static');
var bodyParser      = require('body-parser');
var cors            = require('cors');
//var multer          = require('multer');

var region          = require("./models/region.js");
var province          = require("./models/province.js");
var district          = require("./models/district.js");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
//app.use(multer());
app.route('/region/list').get(region.list);
app.route('/region/add').post(region.add);
app.route('/region/edit').put(region.edit);
app.route('/region/delete').delete(region.delete);

app.route('/province/list').get(province.list);
app.route('/province/add').post(province.add);
app.route('/province/edit').put(province.edit);
app.route('/province/delete').delete(province.delete);

app.route('/district/list').get(district.list);
app.route('/district/add').post(district.add);
app.route('/district/edit').put(district.edit);
app.route('/district/delete').delete(district.delete);

app.listen(config.express.port);