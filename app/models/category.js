var Category = require ("./../schemas/category.js").Category;

var config  = require('./../../config.json');
var thinky  = require("thinky")({db : config.rethinkdb.db});
var r       = thinky.r;

exports.list = function (request, response, next) {
    if (request.query.flag == "1") {
        var page = (request.query.start) ? request.query.start : 1;
        page = page == "1" ? 0 : (Number(page) - 1) * config.pagination.per_page;

        Category.filter(r.row('category').match(request.query.filter)).skip(Number(page)).limit(config.pagination.per_page).run().then(function(categories) {
          response.send(JSON.stringify(categories));
        }).error(function(error) {
          response.send(500, {error: error.message});
        });
    } else {
        Category.run().then(function(categories) {
          response.send(JSON.stringify(categories));
        }).error(function(error) {
          response.send(500, {error: error.message});
        });
    }
};

exports.add = function (request, response, next) {
    var category = new Category(request.body);

    category.save().then(function(result) {
        response.send(JSON.stringify({status : 'ok', result : result}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.edit = function (request, response, next) {
    Category.get(request.body.id).update(request.body).run().then(function(category) {
        response.send(JSON.stringify({status : 'ok', result : category}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.delete = function (request, response, next) {
    Category.get(request.query.id).delete().execute().then(function(result) {
        response.send(JSON.stringify({status : "ok", result: result}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.count = function (request, response, next) {
    Category.count(r.row('category').match(request.query.filter)).execute().then(function(total_categories) {
        response.send(JSON.stringify(total_categories));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};
