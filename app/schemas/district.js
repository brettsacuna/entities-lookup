var config  = require('./../../config.json');
var thinky  = require("thinky")({db : config.rethinkdb.db});
var type    = thinky.type;
var r       = thinky.r;

var District = thinky.createModel("District", {
    id : type.string(),
    code_region : type.string().required(),
    code_province : type.string().required(),
    code_district : type.string().required(),
    district : type.string().required(),
    code_location : type.string().required()
});

exports.District = District;

var Region = require(__dirname+"/region.js").Region;
var Province = require(__dirname+"/province.js").Province;
var Establishment = require(__dirname+"/establishment.js").Establishment;

District.belongsTo(Region, "region", "code_region", "code_region");
District.belongsTo(Province, "province", "code_province", "code_province");
District.hasMany(Establishment, "establishments", "code_district", "code_district");
