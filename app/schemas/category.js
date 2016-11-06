var thinky  = require("thinky")({db : "establishments"});
var type    = thinky.type;
var r       = thinky.r;

var Category = thinky.createModel("Category", {
    id : type.string(),
    category : type.string().required()
});

exports.Category = Category;
