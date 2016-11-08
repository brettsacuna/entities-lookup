var Establishment = require ("./../schemas/establishment.js").Establishment;

var config  = require('./../../config.json');
var thinky  = require("thinky")({db : config.rethinkdb.db});
var r       = thinky.r;

exports.list = function (request, response, next) {
    if (request.query.flag == "1") {
        var page = (request.query.start) ? request.query.start : 1;
        page = page == "1" ? 0 : (Number(page) - 1) * config.pagination.per_page;

        Establishment.filter(r.row('establishment').match(request.query.filter).or(r.row('address').match(request.query.filter))).skip(Number(page)).limit(config.pagination.per_page).run().then(function(establishments) {
          response.send(JSON.stringify(establishments));
        }).error(function(error) {
          response.send(500, {error: error.message});
        });
    } else {
        Establishment.run().then(function(establishments) {
          response.send(JSON.stringify(establishments));
        }).error(function(error) {
          response.send(500, {error: error.message});
        });
    }
};

exports.add = function (request, response, next) {
    var establishment = new Establishment(request.body);

    establishment.save().then(function(result) {
        response.send(JSON.stringify({status : 'ok', result : result}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.edit = function (request, response, next) {
    Establishment.get(request.body.id).update(request.body).run().then(function(establishment) {
        response.send(JSON.stringify({status : 'ok', result : establishment}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.delete = function (request, response, next) {
    Establishment.get(request.query.id).delete().execute().then(function(result) {
        response.send(JSON.stringify({status : "ok", result: result}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.count = function (request, response, next) {
    Establishment.count(r.row('establishment').match(request.query.filter).or(r.row('address').match(request.query.filter))).execute().then(function(total_establishments) {
        response.send(JSON.stringify(total_establishments));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};
