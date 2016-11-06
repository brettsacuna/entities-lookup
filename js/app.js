(function () {
    'use-strict';

    angular
        .module('entitiesLookupApp', ['entitiesLookupApp.controllers', 'entitiesLookupApp.services', 'entitiesLookupApp.directives', 'ui.router', 'ui.materialize'])
        .run(appRun)
        .config(appConfig);

    function appRun($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    function appConfig ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
			.otherwise('/app/search');

        $stateProvider
			.state('app', {
				abstract: true,
				url: '/app',
				views: {
					'': {
						templateUrl: './index.html'
					},
					'content@': {
						templateUrl: './views/layout.html'
					}
				}
			})
				.state('app.search', {
					parent: 'app',
					url: '/search',
					templateUrl: 'views/pages/search_tpl.html',
					data : { title: 'Search Form', sub_title: 'Search Establishments' },
					controller: 'searchFormCtrl as search_form',
					resolve: {
						delay: function($q, $timeout) {
				          var delay = $q.defer();
				          $timeout(delay.resolve, 1000);
				          return delay.promise;
				        }
					}
				})
                .state('app.maintainers', {
					parent: 'app',
					url: '/maintainers',
					templateUrl: 'views/pages/maintainers_tpl.html',
					data : { title: 'Maintainers', sub_title: 'Maintainers' },
					controller: 'maintainersCtrl as maintainers',
					resolve: {
						delay: function($q, $timeout) {
				          var delay = $q.defer();
				          $timeout(delay.resolve, 1000);
				          return delay.promise;
				        }
					}
				});
    }
})();
