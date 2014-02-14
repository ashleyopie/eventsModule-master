'use strict';

angular.module('eventsAppApp')
    .directive('gmaps',
        function($timeout) {
            return {
                restrict: 'A',
                transclude: true,
                // scope: {
                //     lat: '@lat',
                //     lon: '@lon'
                // },
                link: function(scope, elem, attrs, ctrl) {
                    var renderMap = function() {

                        function breakItUp(rec) {
                            return rec.split(' ').join('+');
                        }
                        var geo = {
                            lat: scope.event.listing.latitude,
                            lon: scope.event.listing.longitude
                        } || null;

                        if (geo === null) {
                            var queryString = "http://search.indystar.com/scripts/mapping/map_js.jsp?";
                            var addressOne = breakItUp(listing.address) || "";
                            var addressTwo = breakItUp(listing.address2) || "";
                            var city = breakItUp(listing.city) || "";
                            var state = listing.state;
                            var zip = parseInt(listing.zip);


                            //backup address validation if no lat/lon are provided
                            var geo = new google.maps.Geocoder();
                            geo.geocode({
                                'address': addressOne + ' ' + addressTwo + ' ' + city + ' ' + state + ' ' + zip
                            }, function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    console.log(results);
                                    geo = {
                                        lat: results.geometry.location.ob,
                                        lon: results.geometry.location.pb
                                    };
                                }
                            });
                        }

                        var mapOptions,
                            controlTemplate,
                            controlElem,
                            map;

                        mapOptions = {
                            zoom: 12,
                            disableDefaultUI: true,
                            center: new google.maps.LatLng(geo.lat, geo.lon),
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };

                        map = new google.maps.Map(elem[0], mapOptions);

                        var marker = new google.maps.Marker({
                            map: map,
                            draggable: false,
                            animation: google.maps.Animation.DROP,
                            position: new google.maps.LatLng(geo.lat, geo.lon)
                        });
                        scope.event.geo = geo;
                    }
                    $timeout(renderMap, 1500);
                }
            };
        }
);