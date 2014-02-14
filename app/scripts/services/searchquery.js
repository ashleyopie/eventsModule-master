'use strict';

angular.module('eventsAppApp')
    .factory('searchQuery', function($http) {
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


        var pdUrl = 'http://indystar.test.planetdiscover.com/api/events/?';
        var api_key = 'vm29t4jhk9vlkpfl7j95omgu0';

        var pdCatUrl = "http://indystar.admin.test.planetdiscover.com/api/categories/?api_key=";
        var today = new Date();
        var daysInFuture = 7;
        var futureDate = new Date();

        today = formatDate(today);
        futureDate.setDate(futureDate.getDate() + daysInFuture);
        futureDate = formatDate(futureDate);

        //CORS support
        //delete $http.defaults.headers.common['X-Requested-With'];

        var getEvent = function(eventId) {
            return $http({

                method: 'POST',
                url: pdUrl +
                    '&api_key=' + api_key +
                    '&ids=' + eventId
            });
        };

        var getCategories = function(type) {
            return $http({
                method: 'POST',
                url: pdCatUrl +
                    api_key + "&type=" + type
            });
        };


        return {
            events: function(eventId) {
                return getEvent(eventId);
            },
            getCategories: function(type) {
                return getCategories(type);
            }
        };
    });