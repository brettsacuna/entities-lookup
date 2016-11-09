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
    code_category : type.string().required(),
    code_region : type.string().required(),
    code_province : type.string().required(),
    code_district : type.string().required()
});

exports.Establishment = Establishment;

var Region = require(__dirname+"/region.js").Region;
var Province = require(__dirname+"/province.js").Province;
var District = require(__dirname+"/district.js").District;
var Category = require(__dirname+"/category.js").Category;

Establishment.belongsTo(Category, "category", "code_category", "id");
Establishment.belongsTo(Region, "region", "code_region", "code_region");
Establishment.belongsTo(Province, "province", "code_province", "code_province");
Establishment.belongsTo(District, "district", "code_district", "code_district");
