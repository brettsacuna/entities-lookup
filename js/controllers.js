(function () {
    'use-strict';

    angular
        .module('entitiesLookupApp.controllers', [])
        .controller('searchFormCtrl', searchFormCtrl)
        .controller('maintainersCtrl', maintainersCtrl)
        .controller('messageCtrlPrtl', messageCtrlPrtl);

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

        search_form.get_categories = function () {
            searchFct.getCategories(0, 0, "").then(function (response) {
                search_form.categories = response;
            }).catch(function (reason) {
                console.log(reason);
            });
        };

        //search_form.get_regions();

        search_form.get_categories();
    }

    function maintainersCtrl (messageFct, searchFct) {
        var maintainers = this;

        maintainers.category = {};
        maintainers.category.data = {};
        maintainers.category.action = 0;
        maintainers.category.loading = false;

        maintainers.save_category = function (form) {
            var data = {
                category : form.description.toUpperCase()
            };

            searchFct.saveCategory(data).then(function (response) {
                if (response.status == 'ok') {
                    maintainers.category.data = {};

                    alert("Category was saved successfully !");

                    maintainers.get_categories();
                }
            }).catch(function (reason) {
                console.log(reason);
            });
        };

        maintainers.get_categories = function (page) {
            maintainers.category.loading = true;

            searchFct.getTotalCategories((maintainers.category.filter || "")).then(function (total) {
                maintainers.category.total = total;

                searchFct.getCategories(1, (page || 1), (maintainers.category.filter || "")).then(function (response) {
                    maintainers.category.list = response;

                    maintainers.category.loading = false;
                }).catch(function (reason) {
                    console.log(reason);

                    maintainers.category.loading = false;
                });
            }).catch(function (reason) {
                console.log(reason);

                maintainers.category.loading = false;
            });
        };

        maintainers.get_categories();

        maintainers.delete_category = function (category) {
            searchFct.deleteCategory(category.id).then(function (response) {
                if (response.status == "ok") {
                    alert("Category was delete successfully !");

                    maintainers.get_categories();
                }
            }).catch(function (reason) {
                console.log(reason);
            });
        };
    }

    function messageCtrlPrtl ($modalInstance, $sce, message, callback, button) {
		var alert = this;

		callback = callback || null;

		alert.button = button;
		alert.message = $sce.trustAsHtml(message);

		alert.ok = function () {
			$modalInstance.close();
		};

		if(callback){
			alert.callback = callback;
		}
	}
})();
