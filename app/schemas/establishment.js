var config  = require('./../../config.json');
var thinky  = require("thinky")({db : config.rethinkdb.db});
var type    = thinky.type;
var r       = thinky.r;

var Establishment = thinky.createModel("Establishment", {
    id : type.string(),
    establishment : type.string().required(),
    address : type.string().required(),
    latitude : type.string().required(),
    longitude : type.string().required(),
    cellphone : type.string().required(),
    phone : type.string().required(),
    code_category : type.string().required()
});

exports.Establishment = Establishment;

var Category = require(__dirname+"/category.js").Category;

Establishment.belongsTo(Category, "category", "code_category", "id");
