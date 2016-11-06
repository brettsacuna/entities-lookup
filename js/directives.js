(function () {
    'use-strict';

    angular
        .module('entitiesLookupApp.directives', [])
        .directive('showDuringResolve', showDuringResolve)
        .directive('spinner', spinnerLoader);

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
            template: '<div class="preloader-wrapper big active" style="margin: 23% auto auto 48% !important;"><div class="spinner-layer spinner-blue"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-red"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-yellow"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-green"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>'
        };
	}

    function spinnerLoader () {
		return {
            restrict: 'AE',
            replace: true,
            template: '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div><div class="bounce4"></div></div>'
		  };
	}
})();
