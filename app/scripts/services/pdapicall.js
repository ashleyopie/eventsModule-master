'use strict';

angular.module('eventsAppApp')
    .factory('pdAPItest', function($http, $q, $timeout) {
        // Service logic
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


        var pdUrl_events = 'http://indystar.test.planetdiscover.com/api/events/?';
        var pdUrl_listings = 'http://indystar.test.planetdiscover.com/api/listings/?';
        var api_key = 'vm29t4jhk9vlkpfl7j95omgu0';

        var foodCatIds = "1000019,1000020,1000021,1000022,1000023,1000497,1000025";

        var today = new Date();
        var daysInFuture = 7;
        var futureDate = new Date();

        today = formatDate(today);
        futureDate.setDate(futureDate.getDate() + daysInFuture);
        futureDate = formatDate(futureDate);

        var limit = 15;

        var tempElistStore = null;
        var tempEQlistStore = null;
        var tempBlistStore = null;
        var tempDlistStore = null;

        var primaryEventResponseCategories = [{
            catId: 1000002,
            title: 'Dance'
        }, {
            catId: 1000004,
            title: 'Fashion'
        }, {
            catId: 1000007,
            title: 'Theater'
        }, {
            catId: 1000031,
            title: 'Live Music'
        }, {
            catId: 1000026,
            title: 'Night life'
        }, {
            catId: 1000027,
            title: 'DJs & Dancing'
        }, {
            catId: 1000028,
            title: 'Comedy'
        }, {
            catId: 1000029,
            title: 'Concerts'
        }, {
            catId: 1000030,
            title: 'Karaoke'
        }, {
            catId: 1000038,
            title: 'SPECTATOR SPORTS - MAIN CATEGORY'
        }, {
            catId: 1000009,
            title: 'Community - Festivals'
        }];

        var runEventRequest = function() {
            var eventCats = [];
            angular.forEach(primaryEventResponseCategories, function(key, value) {
                eventCats.push(key.catId);
            });

            if (tempElistStore === null) {
                tempElistStore = $http({

                    method: 'POST',
                    url: pdUrl_events +
                        '&api_key=' + api_key +
                        '&sd=' + today +
                        '&ed=' + futureDate +
                        '&limit=' + 15 +
                        '&catIds=' + eventCats +
                        '&searchChildCats=' + true +
                        '&sort=' + 'startDate'
                });
            }
            console.log(tempElistStore);
            return tempElistStore;

        };

        var isStringMatch = function(str, match) {
            if (str.indexOf(match) > 0) {
                return true;
            } else {
                return false;
            }
        };


        var runEventQuery = function(params, cats) {

            //this will be the hard part
            // take params and push to multiple event queries
            // take response events, concatenate
            // custom sort/filter by 
            //event name
            //

            console.log(params);
            console.log(cats);

            var catArray = [];

            angular.forEach(cats, function(key, value) {
                if (isStringMatch(key.title.toLowerCase(), params.kw.toLowerCase())) {
                    catArray.push(key.id);
                }
            });
            //console.log(catArray);

            params.sd = today;
            params.limit = limit;
            params.catIds = catArray.join();
            params.searchChildCats = true;
            params.api_key = api_key;
            params.sort = 'startDate';

            console.log(params);

            return $http({
                method: 'POST',
                url: pdUrl_events,
                params: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };



        var getNextEvents = function(url) {

            tempElistStore = $http({
                method: 'POST',
                url: url
            });

            return tempElistStore;
        };

        var getBestBets = function() {
            return $http({

                method: 'POST',
                url: pdUrl_events +
                    '&api_key=' + api_key +
                // '&sd=' + today +
                '&sort=' + 'startDate' +
                    '&attribFilter=' + '(attr_best_bet=yes)' +
                    '&limit=' + 3
            });


        };

        var listings = function() {
            if (tempDlistStore === null) {
                tempDlistStore = $http({

                    method: 'POST',
                    url: pdUrl_listings +
                        '&api_key=' + api_key
                    // '&sd=' + today +
                    // '&sort=' + 'startDate' +
                    // '&attribFilter=' + '(attr_best_bet=yes)' +
                    // '&limit=' + 3
                });
            }
            return tempDlistStore;
        };

        var getListing = function(listingId) {
            return $http({

                method: 'POST',
                url: pdUrl_listings +
                    '&api_key=' + api_key +
                    '&ids=' + listingId
            });
        };

        var getDining = function(diningId) {
            if (tempDlistStore === null) {
                tempDlistStore = $http({

                    method: 'POST',
                    url: pdUrl_listings +
                        '&api_key=' + api_key +
                        '&sd=' + today +
                        '&sort=' + 'startDate' +
                        '&attribFilter=' + '(attr_best_bet=yes)' +
                        '&limit=' + 3
                });
            }
            return tempDlistStore;
        };
        var getDiningBestBets = function() {
            if (tempDlistStore === null) {
                tempDlistStore = $http({

                    method: 'POST',
                    url: pdUrl_listings +
                        '&api_key=' + api_key +
                        '&sd=' + today +
                        '&sort=' + 'startDate' +
                        '&attribFilter=' + '(attr_best_bet=yes)' +
                        '&limit=' + 3
                });
            }
            return tempDlistStore;
        };

        return {
            events: function() {
                return runEventRequest('events');
            },
            eventsKwLoc: function(params, cats) {
                return runEventQuery(params, cats);
            },
            getNext: function(url) {
                return getNextEvents(url);
            },
            bestBets: function() {
                return getBestBets('events');
            },
            listings: function() {
                return listings('events');
            },
            listing: function(listingId) {
                return getListing('events');
            },
            dining: function(diningId) {
                return getDining(diningId);
            },
            diningBets: function() {
                return getDiningBestBets('dining');
            }

        };
    });