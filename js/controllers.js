(function () {
    'use-strict';

    angular
        .module('entitiesLookupApp.controllers', [])
        .controller('searchFormCtrl', searchFormCtrl)
        .controller('maintainersCtrl', maintainersCtrl);

    function searchFormCtrl (searchFct) {
        var search_form = this, regions = [], provinces = [], districts = [];

        search_form.regions = []; search_form.provinces = []; search_form.districts = [];

        search_form.get_regions = function () {
            searchFct.getRegions().then(function (response) {
                search_form.regions = _.sortBy(response, function (objRegion) {
                    return objRegion.code_region;
                });
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

        search_form.get_provinces = function (region) {
            search_form.provinces = []; search_form.districts = []; search_form.province = undefined; search_form.district = undefined;

            if (angular.isDefined(region) && region !== null) {
                searchFct.getProvinces(region.code_region).then(function (response) {
                    search_form.provinces = _.sortBy(response, function (objProvince) {
                        return objProvince.code_province;
                    });
                }).catch(function (reason) {
                    console.log(reason);
                });
            }
        };

        search_form.save_province = function () {
            _.map(provinces, function (objProvince) {
                var data = {
                    code_region : objProvince.codigo_departamento,
                    code_province : objProvince.codigo_provincia,
                    province : objProvince.provincia,
                    code_location : objProvince.codigo_ubigeo
                };

                searchFct.saveProvince(data).then(function (response) {
                    console.log(response);
                }).catch(function (reason) {
                    console.log(reason);
                });
            });
        };

        search_form.get_districts = function (province) {
            search_form.districts = []; search_form.district = undefined;

            if (angular.isDefined(province) && province !== null) {
                searchFct.getDistricts(province.code_region, province.code_province).then(function (response) {
                    search_form.districts = _.sortBy(response, function (objDistrict) {
                        return objDistrict.code_district;
                    });
                }).catch(function (reason) {
                    console.log(reason);
                });
            }
        };

        search_form.save_district = function () {
            _.map(districts, function (objDistrict) {
                var data = {
                    code_region : objDistrict.codigo_departamento,
                    code_province : objDistrict.codigo_provincia,
                    code_district : objDistrict.codigo_distrito,
                    district : objDistrict.distrito,
                    code_location : objDistrict.codigo_ubigeo
                };

                searchFct.saveDistrict(data).then(function (response) {
                    console.log(response);
                }).catch(function (reason) {
                    console.log(reason);
                });
            });
        };

        search_form.get_regions();
    }

    function maintainersCtrl () {
        var maintainers = this;
    }
})();
