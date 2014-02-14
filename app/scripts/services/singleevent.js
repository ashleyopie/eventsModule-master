'use strict';

angular.module('eventsAppApp')
    .factory('singleevent', function($http, dateFixer) {
        // Service logic
        // ...
        // ...
        var offset = new Date().getTimezoneOffset();

        function formatDate(date) {
            return ("0" + (date.getMonth() + 1)).slice(-2) + '/' + ("0" + date.getDate()).slice(-2) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + roundMinutes(date.getMinutes()) + ':' + ("0" + date.getSeconds()).slice(-2);
        }

        function roundMinutes(min) {
            if (min <= 30) {
                return "00";
            } else {
                return "30";
            }
        }

        var api_key = 'vm29t4jhk9vlkpfl7j95omgu0';
        var pdUrl = 'http://indystar.test.planetdiscover.com/api/events/?api_key=' + api_key;

        var pdListUrl = "http://indystar.admin.test.planetdiscover.com/api/listings/?api_key=" + api_key;

        var today = new Date();
        var daysInFuture = 7;
        var futureDate = new Date();

        today = formatDate(today);
        futureDate.setDate(futureDate.getDate() + daysInFuture);
        futureDate = formatDate(futureDate);

        var fixAttributes = function(object) {
            var temp = {};
            angular.forEach(object.attributes, function(key, value) {
                if (key.value === null || key.value === "") {
                    temp[key.key] = {
                        name: key.name,
                        value: null,
                        public_display: key.public_display
                    };
                } else {
                    temp[key.key] = {
                        name: key.name,
                        value: key.value,
                        public_display: key.public_display
                    };
                }
            });
            object.attributes = temp;
            return object;
        };

        var getEvent = function(eventId) {
            return $http({
                method: 'POST',
                url: pdUrl +
                    '&api_key=' + api_key +
                    '&ids=' + eventId
            });
        };

        var getListing = function(listingId) {
            return $http({

                method: 'POST',
                url: pdListUrl +
                    '&ids=' + listingId
            });
        };

        var getListingEvents = function(listingId) {
            return $http({
                method: 'POST',
                url: pdUrl +
                    '&venueId=' + listingId +
                    '&sd=' + today
            });
        }


        return {
            events: function(eventId) {
                return getEvent(eventId);
            },
            listings: function(listingId) {
                return getListing(listingId);
            },
            fixAttribute: function(object) {
                return fixAttributes(object);
            },
            listingEvents: function(listingId) {
                return getListingEvents(listingId);
            }

        };
    });