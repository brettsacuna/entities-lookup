var District = require ("./../schemas/district.js").District;

exports.list = function (request, response, next) {
    District.run().then(function(districts) {
        response.send(JSON.stringify(districts));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.add = function (request, response, next) {
    var district = new District(request.body);

    district.save().then(function(result) {
        response.send(JSON.stringify({status : 'ok', result : result}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.edit = function (request, response, next) {
    District.get(request.body.id).update(request.body).run().then(function(district) {
        response.send(JSON.stringify({status : 'ok', result : district}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.delete = function (request, response, next) {
    District.get(request.query.id).delete().execute().then(function(result) {
        response.send(JSON.stringify({status : "ok", result: result}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};
