(function () {
    'use-strict';

    angular
        .module('entitiesLookupApp.controllers', [])
        .controller('searchFormCtrl', searchFormCtrl);

    function searchFormCtrl(searchFct) {
        var search_form = this, regions = [];

        search_form.get_regions = function () {
            searchFct.getRegions().then(function (response) {
                search_form.regions = response;
            }).catch(function (reason) {
                console.log(reason);
            });
        };

        search_form.save_region = function () {
            _.map(regions, function (objRegion) {
                var data = {
                    code_region : objRegion.codigo_departamento,
                    region : objRegion.departamento,
                    code_location : objRegion.codigo_ubigeo
                };

                searchFct.saveRegion(data).then(function (response) {
                    console.log(response);
                }).catch(function (reason) {
                    console.log(reason);
                });
            });
        };

        search_form.get_regions();
    }
})();
