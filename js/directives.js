(function () {
    'use-strict';

    angular
        .module('entitiesLookupApp.directives', [])
        .directive('select', materialSelect)
        .directive('showDuringResolve', showDuringResolve)
        .directive('spinner', spinnerLoader);

    function materialSelect($timeout) {
		var directive = {
			link: link,
			restrict: 'E',
			require: '?ngModel'
		};

		function link(scope, element, attrs, ngModel) {
			if (ngModel) {
				ngModel.$render = create;
			}else {
				$timeout(create);
			}

			function create() {
				element.material_select();
			}

			element.one('$destroy', function () {
				element.material_select('destroy');
			});

			element.one('$destroy', function () {
				var parent = element.parent();
				if (parent.is('.select-wrapper')) {
					var elementId = parent.children('input').attr('data-activates');
					if (elementId) {
						$('#' + elementId).remove();
					}
					parent.remove();
					return;
				}

				element.remove();
			});
		}

		return directive;
	}

    function showDuringResolve ($rootScope) {
        return {
            link: function(scope, element) {

                element.addClass('ng-hide');

                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('ng-hide');
                });

                $rootScope.$on('$stateChangeSuccess', function() {
                    element.addClass('ng-hide');
                });
            }
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
