(function () {
    'use-strict';

    var config  = require('./../config.json');

    angular
        .module('entitiesLookupApp.services', [])
        .factory('searchFct', searchFct);

    function searchFct($http, $q) {
        return {
            getRegions : function () {
				var defered = $q.defer();
		        var promise = defered.promise;

		        $http.get(config.api.url+'region/list')
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
			},
			saveRegion : function (data) {
				var defered = $q.defer();
		        var promise = defered.promise;

		        $http.post(config.api.url+'region/add', data)
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
			},
            getProvinces : function (region) {
				var defered = $q.defer();
		        var promise = defered.promise;

		        $http.get(config.api.url+'province/list?region='+region)
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
			},
			saveProvince : function (data) {
				var defered = $q.defer();
		        var promise = defered.promise;

		        $http.post(config.api.url+'province/add', data)
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
			},
            getDistricts : function (region, province) {
				var defered = $q.defer();
		        var promise = defered.promise;

		        $http.get(config.api.url+'district/list?region='+region+'&province='+province)
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
			},
			saveDistrict : function (data) {
				var defered = $q.defer();
		        var promise = defered.promise;

		        $http.post(config.api.url+'district/add', data)
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
			},
            getCategories : function (flag, page, filter) {
                var defered = $q.defer();
		        var promise = defered.promise;

		        $http.get(config.api.url+'category/list?flag='+flag+'&start='+page+'&filter='+filter.toUpperCase())
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
            },
            getTotalCategories : function (filter) {
                var defered = $q.defer();
		        var promise = defered.promise;

		        $http.get(config.api.url+'category/count?filter='+filter.toUpperCase())
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
            },
            saveCategory : function (data) {
				var defered = $q.defer();
		        var promise = defered.promise;

		        $http.post(config.api.url+'category/add', data)
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
			},
            editCategory : function (data) {
				var defered = $q.defer();
		        var promise = defered.promise;

		        $http.put(config.api.url+'category/edit', data)
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
			},
            deleteCategory : function (category) {
				var defered = $q.defer();
		        var promise = defered.promise;

		        $http.delete(config.api.url+'category/delete?id='+category)
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
			},
            getEstablishments : function (flag, page, filter) {
                var defered = $q.defer();
		        var promise = defered.promise;

		        $http.get(config.api.url+'establishment/list?flag='+flag+'&start='+page+'&filter='+filter.toUpperCase())
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
            },
            getTotalEstablishments : function (filter) {
                var defered = $q.defer();
		        var promise = defered.promise;

		        $http.get(config.api.url+'establishment/count?filter='+filter.toUpperCase())
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
            },
            saveEstablishment : function (data) {
				var defered = $q.defer();
		        var promise = defered.promise;

		        $http.post(config.api.url+'establishment/add', data)
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
			},
            editEstablishment : function (data) {
				var defered = $q.defer();
		        var promise = defered.promise;

		        $http.put(config.api.url+'establishment/edit', data)
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
			},
            deleteEstablishment : function (establishment) {
				var defered = $q.defer();
		        var promise = defered.promise;

		        $http.delete(config.api.url+'establishment/delete?id='+establishment)
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
			},
            searchEstablishments : function (region, province, district, category, filter) {
                var defered = $q.defer();
		        var promise = defered.promise;

		        $http.get(config.api.url+'establishment/search?region='+region+'&province='+province+'&district='+district+'&category='+category+'&filter='+filter.toUpperCase())
		            .success(function(data) {
		                defered.resolve(data);
		            })
		            .error(function(err) {
		                defered.reject(err);
		            });

		        return promise;
            }
        };
    }
})();
