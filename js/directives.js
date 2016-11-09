(function () {
    'use-strict';

    angular
        .module('entitiesLookupApp.directives', [])
        .directive('showDuringResolve', showDuringResolve)
        .directive('spinnerGoogle', spinnerLoaderGoogle)
        .directive('spinnerMaterial', spinnerLoaderMaterial);

    function showDuringResolve ($rootScope) {
        return {
            replace: false,
            link: function(scope, element) {

                element.addClass('ng-hide');

                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('ng-hide');
                });

                $rootScope.$on('$stateChangeSuccess', function() {
                    element.addClass('ng-hide');
                });
            },
            templateUrl: 'views/directives/routerResolver.html'
        };
	}

    function spinnerLoaderGoogle () {
		return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'views/directives/spinnerGoogle.html'
		  };
	}

    function spinnerLoaderMaterial () {
		return {
            restrict: 'E',
            replace: false,
            scope: {
              size: '='
            },
            templateUrl: 'views/directives/spinnerMaterial.html'
		  };
	}
})();
