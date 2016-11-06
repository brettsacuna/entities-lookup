var Province = require ("./../schemas/province.js").Province;

exports.list = function (request, response, next) {
    Province.filter({code_region : request.query.region}).run().then(function(provinces) {
        response.send(JSON.stringify(provinces));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.add = function (request, response, next) {
    var province = new Province(request.body);

    province.save().then(function(result) {
        response.send(JSON.stringify({status : 'ok', result : result}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.edit = function (request, response, next) {
    Province.get(request.body.id).update(request.body).run().then(function(province) {
        response.send(JSON.stringify({status : 'ok', result : province}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};

exports.delete = function (request, response, next) {
    Province.get(request.query.id).delete().execute().then(function(result) {
        response.send(JSON.stringify({status : "ok", result: result}));
    }).error(function(error) {
        response.send(500, {error: error.message});
    });
};
