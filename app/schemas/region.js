var thinky  = require("thinky")({db : "establishments"});
var type    = thinky.type;
var r       = thinky.r;

var Region = thinky.createModel("Region", {
    id : type.string(),
    code_region : type.string().required(),
    region : type.string().required(),
    code_location : type.string().required()
});

exports.Region = Region;

var Province = require(__dirname+"/province.js").Province;
var District = require(__dirname+"/district.js").District;

Region.hasMany(Province, "provinces", "code_region", "code_region");
Region.hasMany(District, "districts", "code_region", "code_region");
