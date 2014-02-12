'use strict';

angular.module('eventsAppApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap'
])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/events/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/events/:eventId', {
                templateUrl: 'views/partials/eventview.html',
                controller: 'EventviewCtrl'
            })
            .when('/venues/', {
                templateUrl: 'views/venuelist.html',
                controller: 'VenueListCtrl'
            })
            .when('/venues/:listingId', {
                templateUrl: 'views/partials/venueview.html',
                controller: 'VenuedetailCtrl'
            })
            .when('/search/', {
                templateUrl: 'views/partials/search_light.html',
                controller: 'SearchcontrollerCtrl'
            })
            .when('/search/advanced/', {
                templateUrl: 'views/search.html',
                controller: 'SearchcontrollerCtrl'
            })
            .when('/bestbets/', {
                templateUrl: 'views/bestbets.html',
                controller: 'BestbetscontrollerCtrl'
            })
            .when('/dining/', {
                templateUrl: 'views/dining.html',
                controller: 'DiningcontrollerCtrl'
            })
            .when('/dining/:venueId', {
                templateUrl: 'views/partials/diningview.html',
                controller: 'DiningcontrollerCtrl'
            })
            .when('/listings/', {
                templateUrl: 'views/listing.html',
                controller: 'ListingcontrollerCtrl'
            })
            .when('/listings/:listingId', {
                templateUrl: 'views/partials/listingview.html',
                controller: 'ListingdetailctrlCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        //$locationProvider.html5Mode(true);
    });