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
			},
            getProvinces : function (region) {
				var defered = $q.defer();
		        var promise = defered.promise;

		        $http.get('http://localhost/province/list?region='+region)
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

		        $http.post('http://localhost/province/add', data)
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

		        $http.get('http://localhost/district/list?region='+region+'&province='+province)
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

		        $http.post('http://localhost/district/add', data)
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
