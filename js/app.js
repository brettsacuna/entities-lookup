(function () {
    'use-strict';

    angular
        .module('entitiesLookupApp', ['entitiesLookupApp.controllers', 'entitiesLookupApp.services', 'entitiesLookupApp.directives', 'entitiesLookupApp.components', 'ui.router', 'ui.materialize'])
        .run(appRun)
        .config(appConfig);

    function appRun($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    function appConfig ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
			.otherwise('/access/login');

        $stateProvider
			.state('app', {
				abstract: true,
				url: '/app',
				views: {
					'': {
						templateUrl: './views/layout.html'
					},
					'content@': {
						templateUrl: './views/content.html'
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
				})
            .state('access', {
    				url: '/access',
    				template: '<div class="row" ui-view></div>'
    			})
    				.state('access.login', {
    					url: '/login',
    					templateUrl: 'views/pages/login_tpl.html',
    					data : { title: 'Log In' },
    					authenticate: false,
    					controller: 'loginCtrl as login',
    				});
    }
})();
