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
                searchFct.getProvinces(region).then(function (response) {
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

        search_form.get_districts = function (region, province) {
            search_form.districts = []; search_form.district = undefined;

            if (angular.isDefined(province) && province !== null) {
                searchFct.getDistricts(region, province).then(function (response) {
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

        search_form.initialize = function () {
            search_form.get_regions();
            search_form.get_categories();
        };

        search_form.initialize();
    }

    function maintainersCtrl (messageFct, searchFct) {
        var maintainers = this;

        maintainers.establishment = {};
        maintainers.establishment.data = {};
        maintainers.establishment.data_modify = {};
        maintainers.establishment.action = 0;
        maintainers.establishment.loading = false;

        maintainers.category = {};
        maintainers.category.data = {};
        maintainers.category.data_modify = {};
        maintainers.category.action = 0;
        maintainers.category.loading = false;

        maintainers.establishment.regions = [];
        maintainers.establishment.provinces = [];
        maintainers.establishment.districts = [];

        maintainers.save_establishment = function (form) {
            if (maintainers.establishment.action === 0) {
                var data = {
                    establishment : form.establishment.toUpperCase(),
                    address : form.address.toUpperCase(),
                    latitude : form.latitude,
                    longitude : form.longitude,
                    phone : form.phone,
                    cellphone : form.cellphone,
                    code_category : form.category
                };

                searchFct.saveEstablishment(data).then(function (response) {
                    if (response.status == 'ok') {
                        maintainers.button_flag(0);
                        alert("Establishment was saved successfully !");
                    }
                }).catch(function (reason) {
                    console.log(reason);
                });
            } else {
                var data_edit = {
                    establishment : form.establishment.toUpperCase(),
                    address : form.address.toUpperCase(),
                    latitude : form.latitude,
                    longitude : form.longitude,
                    phone : form.phone,
                    cellphone : form.cellphone,
                    code_category : form.category,
                    id : maintainers.establishment.data_modify.id || null
                };

                searchFct.editEstablishment(data_edit).then(function (response) {
                    if (response.status == 'ok') {
                        maintainers.button_flag(0);
                        alert("Establishment was saved successfully !");
                    }
                }).catch(function (reason) {
                    console.log(reason);
                });
            }
        };

        maintainers.get_establishments = function (page) {
            maintainers.establishment.loading = true;

            maintainers.cancel_establishment();

            searchFct.getTotalEstablishments((maintainers.establishment.filter || "")).then(function (total) {
                maintainers.establishment.total = total;

                searchFct.getEstablishments(1, (page || 1), (maintainers.establishment.filter || "")).then(function (response) {
                    _.map(response, function (objEstablishment) {
    					objEstablishment.modify = false;
    				});

                    maintainers.establishment.list = response;

                    maintainers.establishment.loading = false;
                }).catch(function (reason) {
                    console.log(reason);

                    maintainers.establishment.loading = false;
                });
            }).catch(function (reason) {
                console.log(reason);

                maintainers.establishment.loading = false;
            });
        };

        maintainers.delete_establishment = function (establishment) {
            searchFct.deleteEstablishment(establishment.id).then(function (response) {
                if (response.status == "ok") {
                    alert("Establishment was delete successfully !");

                    maintainers.get_establishments();
                }
            }).catch(function (reason) {
                console.log(reason);
            });
        };

        maintainers.select_establishment = function (establishment) {
			maintainers.cancel_edition_establishment();

			maintainers.establishment.data.establishment = establishment.establishment;
			maintainers.establishment.data.address = establishment.address;
			maintainers.establishment.data.latitude = establishment.latitude;
			maintainers.establishment.data.longitude = establishment.longitude;
			maintainers.establishment.data.phone = establishment.phone;
			maintainers.establishment.data.cellphone = establishment.cellphone;
			maintainers.establishment.data.category = establishment.code_category;
			maintainers.establishment.data.id = establishment.id;

            maintainers.establishment.data_modify.establishment = establishment.establishment;
			maintainers.establishment.data_modify.address = establishment.address;
			maintainers.establishment.data_modify.latitude = establishment.latitude;
			maintainers.establishment.data_modify.longitude = establishment.longitude;
			maintainers.establishment.data_modify.phone = establishment.phone;
			maintainers.establishment.data_modify.cellphone = establishment.cellphone;
			maintainers.establishment.data_modify.category = establishment.code_category;
			maintainers.establishment.data_modify.id = establishment.id;

			maintainers.establishment.action = 1;

			establishment.modify = true;
		};

        maintainers.cancel_edition_establishment = function () {
			_.map(maintainers.establishment.list, function (objEstablishment) {
				objEstablishment.modify = false;
			});
		};

		maintainers.cancel_establishment = function () {
			maintainers.cancel_edition_establishment();

			maintainers.establishment.data = {};
			maintainers.establishment.data_modify = {};

			maintainers.establishment.action = 0;
		};

        maintainers.save_category = function (form) {
            if (maintainers.category.action === 0) {
                var data = {
                    category : form.description.toUpperCase()
                };

                searchFct.saveCategory(data).then(function (response) {
                    if (response.status == 'ok') {
                        maintainers.button_flag(1);
                        alert("Category was saved successfully !");
                    }
                }).catch(function (reason) {
                    console.log(reason);
                });
            } else {
                var data_edit = {
                    category : form.description.toUpperCase(),
                    id : maintainers.category.data_modify.id || null
                };

                searchFct.editCategory(data_edit).then(function (response) {
                    if (response.status == 'ok') {
                        maintainers.button_flag(1);
                        alert("Category was saved successfully !");
                    }
                }).catch(function (reason) {
                    console.log(reason);
                });
            }
        };

        maintainers.get_categories = function (page, band) {
            maintainers.category.loading = true;

            maintainers.cancel_category();

            searchFct.getTotalCategories((maintainers.category.filter || "")).then(function (total) {
                maintainers.category.total = total;

                searchFct.getCategories((band || 1), (page || 1), (maintainers.category.filter || "")).then(function (response) {
                    _.map(response, function (objCategory) {
                        objCategory.modify = false;
                    });

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

        maintainers.select_category = function (category) {
            maintainers.cancel_edition_category();

            maintainers.category.data.description = category.category;
            maintainers.category.data.id = category.id;

            maintainers.category.data_modify.description = category.category;
            maintainers.category.data_modify.id = category.id;

            maintainers.category.action = 1;

            category.modify = true;
        };

        maintainers.cancel_edition_category = function () {
            _.map(maintainers.category.list, function (objCategory) {
                objCategory.modify = false;
            });
        };

        maintainers.cancel_category = function () {
            maintainers.cancel_edition_category();

            maintainers.category.data = {};
            maintainers.category.data_modify = {};

            maintainers.category.action = 0;
        };

        maintainers.get_regions = function () {
            searchFct.getRegions().then(function (response) {
                maintainers.establishment.regions = _.sortBy(response, function (objRegion) {
                    return objRegion.code_region;
                });
            }).catch(function (reason) {
                console.log(reason);
            });
        };

        maintainers.get_provinces = function (region) {
            maintainers.establishment.provinces = []; maintainers.establishment.districts = []; maintainers.establishment.province = undefined; maintainers.establishment.district = undefined;

            if (angular.isDefined(region) && region !== null) {
                searchFct.getProvinces(region).then(function (response) {
                    maintainers.establishment.provinces = _.sortBy(response, function (objProvince) {
                        return objProvince.code_province;
                    });
                }).catch(function (reason) {
                    console.log(reason);
                });
            }
        };

        maintainers.get_districts = function (region, province) {
            maintainers.establishment.districts = []; maintainers.establishment.district = undefined;

            if (angular.isDefined(province) && province !== null) {
                searchFct.getDistricts(region, province).then(function (response) {
                    maintainers.establishment.districts = _.sortBy(response, function (objDistrict) {
                        return objDistrict.code_district;
                    });
                }).catch(function (reason) {
                    console.log(reason);
                });
            }
        };

        maintainers.button_flag = function (flag) {
            if (flag == 1) {
                maintainers.cancel_establishment();
                maintainers.get_categories();
            } else {
                maintainers.cancel_establishment();
                maintainers.get_establishments();
            }
        };

        maintainers.initialize = function () {
            maintainers.get_regions();
            maintainers.get_categories(0);
            maintainers.get_establishments();
        };

        maintainers.initialize();
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
