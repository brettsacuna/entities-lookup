var Region = require ("./../schemas/region.js").Region;

exports.list = function (request, response, next) {
    Region.run().then(function(regions) {
        response.send(JSON.stringify(regions));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.add = function (request, response, next) {
    var region = new Region(request.body);

    region.save().then(function(result) {
        response.send(JSON.stringify({status : 'ok', result : result}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.edit = function (request, response, next) {
    Region.get(request.body.id).update(request.body).run().then(function(region) {
        response.send(JSON.stringify({status : 'ok', result : region}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.delete = function (request, response, next) {
    Region.get(request.query.id).delete().execute().then(function(result) {
        response.send(JSON.stringify({status : "ok", result: result}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};
