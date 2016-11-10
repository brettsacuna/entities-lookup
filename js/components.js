(function () {
    'use-strict';

    angular
        .module('entitiesLookupApp.components', [])
        .component('establishmentList', {
            templateUrl: 'views/components/establishmentList.html',
            controller: 'establishmentListCtrl',
            controllerAs: 'establishment_list',
            bindings: {
                list: '='
            }
        })
        .component('establishmentDetail', {
            templateUrl: 'views/components/establishmentDetail.html',
            controller: 'establishmentDetailCtrl',
            controllerAs: 'establishment_detail',
            bindings: {
                establishment: '='
            }
        })
        .component('selectSearch', {
            templateUrl: 'views/components/selectSearch.html',
            controller: 'selectSearchCtrl',
            controllerAs: 'select_search',
            bindings: {
                model: '=',
                options: '=',
                key: '@',
                value: '@',
                label: '@',
                color: '@',
                callback: '&',
                callbackAlter: '&'
            }
        });
})();
