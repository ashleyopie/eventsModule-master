'use strict';

angular.module('eventsAppApp')
    .controller('SearchcontrollerCtrl', function($scope, $http, searchQuery, limitToFilter) {

        var api_key = 'vm29t4jhk9vlkpfl7j95omgu0';
        var pdCatUrl = 'http://indystar.admin.test.planetdiscover.com/api/categories/?&api_key=' + api_key;
        var pdUrl = 'http://indystar.test.planetdiscover.com/api/events/?&api_key=' + api_key;
        var pdListUrl = "http://indystar.admin.test.planetdiscover.com/api/listings/?api_key=" + api_key;



        //start typeahead query assist
        $scope.categoriesFlat = [];

        $scope.getCategories = function(type) {
            return $http.get(pdCatUrl, {
                params: {
                    limit: 20,
                    start: 0,
                    type: type,
                    ms: "-12m",
                    ids: null,
                    onlyDeleted: false,
                    catIds: null,
                    searchChildCats: false,
                    attribFilter: null, //string
                    kw: null, //string
                    address: null, //street, city/state and or zipcode
                    distance: null, //in miles
                    sort: "dateModified", // string, csv - title, score, random, site_title, dateModified, distance
                    fips: null, //not sure
                    activeVenue: true, //do they have events associated?
                    eIds: null, //csv of external id's to retrieve
                    source: null // name of source where events originated
                }
            }).then(function(res) {
                angular.forEach(res.data.categories, function(item) {
                    $scope.categoriesFlat.push(item.title);
                });
                //console.log(categoriesFlat);
                return limitToFilter($scope.categoriesFlat, 15);
            });

        };
        //end typeahead query assist

        //start advanced query helpers
        $scope.properParams = function(params) {
            switch (params) {
                case 1:
                    return $scope.queryParam.event;
                    break;
                case 2:
                    return $scope.queryParam.listing;
                    break;
                default:
                    return $scope.queryParam.event;
            };
        };

        $scope.processForm = function() {
            //console.log($scope.queryUrl);
            var queryUrl = null;
            var params = {};

            switch ($scope.queryUrl) {
                case "Events":
                    queryUrl = pdUrl;
                    params = 1;
                    break;
                case "Venues":
                    queryUrl = pdListUrl;
                    params = 2;
                    break;
                case "Categories":
                    queryUrl = pdCatUrl + '&type=' + $scope.queryParam.catType;
                    params = 3;
                    break;
                default:
                    queryUrl = pdUrl;
            };

            return $http({
                method: 'POST',
                url: queryUrl,
                params: $scope.properParams(params),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(data, status, headers) {
                console.log(data.data);
                return $scope.$parent.response = data.data;
            });

        };

        $scope.displayFields = function(queryUrl, section) {
            switch (queryUrl) {
                case "Events":
                    return section === 1;
                    break;
                case "Venues":
                    return section === 2;
                    break;
                case "Categories":
                    return section === 3;
                    break;
                default:
                    return false;
            };
        };

        //end advanced query helpers

        //generic date garbage, used for datepickers
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.showWeeks = true;
        $scope.toggleWeeks = function() {
            $scope.showWeeks = !$scope.showWeeks;
        };

        $scope.clear = function() {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.toggleMin = function() {
            $scope.minDate = ($scope.minDate) ? null : new Date();
        };
        $scope.toggleMin();

        $scope.openStart = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.openEnd = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
        $scope.format = $scope.formats[0];

    });