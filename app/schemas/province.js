var thinky  = require("thinky")({db : "establishments"});
var type    = thinky.type;
var r       = thinky.r;

var Province = thinky.createModel("Province", {
    id : type.string(),
    code_region : type.string().required(),
    code_province : type.string().required(),
    province : type.string().required(),
    code_location : type.string().required()
});

exports.Province = Province;

var Region = require(__dirname+"/region.js").Region;
var District = require(__dirname+"/district.js").District;

Province.belongsTo(Region, "region", "code_region", "code_region");
Province.hasMany(District, "districts", "code_province", "code_province");
