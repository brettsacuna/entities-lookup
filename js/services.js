(function () {
    'use-strict';

    var config  = require('./../config.json');

    angular
        .module('entitiesLookupApp.services', [])
        .factory('messageFct', messageFct)
        .factory('searchFct', searchFct)
        .factory('$modal', modalFct);

    function messageFct ($modal, $log) {
		return {
		    message : function (message, callback, button) {
				var modalInstance = $modal.open({
					templateUrl: 'views/partials/message_tpl_prtl.html',
					controllerAs: 'messageCtrlPrtl as alert',
					resolve: {
					  message: function () {
					    return message;
					  },
					  callback : function(){
					    return callback;
					  },
					  button: function(){
					    return button;
					  }
					}
				});
		    }
		};
	}

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



    function modalFct($http, $compile, $rootScope, $document, $q, $controller, $timeout) {
        var service = {
			open: open
		};

		function open(options) {
            var deferred = $q.defer();

			getTemplate(options).then(function (modalBaseTemplate) {
				var modalBase = angular.element(modalBaseTemplate);

				var scope = $rootScope.$new(false, options.scope),
					modalInstance = {
						params: options.params || {},
						close: function (result) {
							deferred.resolve(result);
							closeModal(modalBase, scope);
						},
						dismiss: function (reason) {
							deferred.reject(reason);
							closeModal(modalBase, scope);
						}
					};

				scope.$close = modalInstance.close;
				scope.$dismiss = modalInstance.dismiss;

				$compile(modalBase)(scope);

				var openModalOptions = {
					complete: function () { modalInstance.dismiss(); }
				};

				runController(options, modalInstance, scope);

				modalBase.appendTo('body').openModal(openModalOptions);

			}, function (error) {
				deferred.reject({ templateError: error });
			});

			return deferred.promise;
		}

		function runController(options, modalInstance, scope) {
			if (!options.controller) return;

			var controller = $controller(options.controller, {
				$scope: scope,
				$modalInstance: modalInstance
			});

			if (angular.isString(options.controllerAs)) {
				scope[options.controllerAs] = controller;
			}
		}

		function getTemplate(options) {
			var deferred = $q.defer();

			if (options.templateUrl) {
				$http.get(options.templateUrl).success(function (data) {
					deferred.resolve(data);
				}).catch(function (error) {
					deferred.reject(error);
				});
			} else {
				deferred.resolve(options.template || '');
			}


			return deferred.promise.then(function (template) {

				var cssClass = options.fixedFooter ? 'modal modal-fixed-footer' : 'modal';
				var html = [];
				html.push('<div class="' + cssClass + '">');
				if (options.title) {
					html.push('<div class="modal-header">');
					html.push(options.title);
					html.push('<a class="grey-text text-darken-2 right" ng-click="$dismiss()">');
					html.push('<i class="mdi-navigation-close" />');
					html.push('</a>');
					html.push('</div>');
				}
				html.push(template);
				html.push('</div>');

				return html.join('');
			});
		}

		function closeModal(modalBase, scope) {
			modalBase.closeModal();

			$timeout(function () {
				scope.$destroy();
				modalBase.remove();
			}, 5000, true);
		}

		return service;
    }
})();
