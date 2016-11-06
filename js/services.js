(function () {
    'use-strict';

    angular
        .module('entitiesLookupApp.services', [])
        .factory('searchFct', searchFct);

    function searchFct($http, $q) {
        return {
            getRegions : function () {
				var defered = $q.defer();
		        var promise = defered.promise;

		        $http.get('http://localhost/region/list')
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

		        $http.post('http://localhost/region/add', data)
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
