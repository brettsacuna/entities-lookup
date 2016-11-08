var config  = require('./../../config.json');
var thinky  = require("thinky")({db : config.rethinkdb.db});
var type    = thinky.type;
var r       = thinky.r;

var Category = thinky.createModel("Category", {
    id : type.string(),
    category : type.string().required()
});

exports.Category = Category;

var Establishment = require(__dirname+"/establishment.js").Establishment;

Category.hasMany(Establishment, "establishments", "id", "code_category");
