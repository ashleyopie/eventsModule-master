'use strict';

angular.module('eventsAppApp')
    .directive('map', function($timeout) {

        var directionsDisplay = new google.maps.DirectionsRenderer(),
            directionsService = new google.maps.DirectionsService(),
            geocoder = new google.maps.Geocoder(),
            map,
            marker,
            mapObj,
            infowindow;

        mapObj = {
            restrict: 'EAC',
            transclude: true,
            replace: true,
            scope: {
                event: '@',
                type: '@',
                destination: '@',
                markerContent: '@'
            },
            template: '<form novalidate name="mapContainer" class="mapContainer panel">' +
                '<div id="theMap"></div>' +
                '<div class="directions" ng-show="directions || directions==undefined">' +
                '<label>Origin:</label>' +
                '<input type="text" ng-model="origin" name="origin"  required>' +
                '<small class="error" id="wrongAddress">Error: \n ' +
                '<span>Sorry this is not a valid address.</span>' +
                '</small>' +
                '<label>Destination:</label>' +
                '<input ng-model="endPoint" type="text" disabled>' +
                '<button class="getDirections" ng-click="getDirections()" ng-disabled="mapContainer.$invalid">Get Directions</button> ' +
                '<button class="clearDirections alert" ng-click="clearDirections()" ng-disabled="mapContainer.$invalid">Clear</button>' +
                '<div id="directionsList"></div>' +
                '</div>' +
                '</form>', // todo: use template url and template file

            link: function(scope, element, attrs) {

                //console.log(scope);

                scope.init = function() {
                    var mapOptions = {
                        zoom: scope.zoom !== undefined ? scope.zoom : 13,
                        mapTypeId: scope.type.toLowerCase(),
                        streetViewControl: false
                    };
                    map = new google.maps.Map(document.getElementById('theMap'), mapOptions);
                    scope.endPoint = scope.destination !== undefined ? scope.destination : '1600 Amphitheatre Parkway, Santa Clara County, CA';

                    geocoder.geocode({
                        address: scope.endPoint
                    }, function(results, status) {
                        console.log(results);
                        var location = new google.maps.LatLng(results[0].geometry.location.ob, results[0].geometry.location.pb);
                        if (status === google.maps.GeocoderStatus.OK) {
                            map.setCenter(location);
                            marker = new google.maps.Marker({
                                map: map,
                                position: location,
                                animation: google.maps.Animation.DROP
                            });
                            infowindow = new google.maps.InfoWindow({
                                content: scope.markerContent !== undefined ? scope.markerContent : 'Google HQ'
                            });
                            google.maps.event.addListener(marker, 'click', function() {
                                return infowindow.open(map, marker);
                            });

                        } else {
                            alert('Cannot Geocode');
                        }
                        google.maps.event.addListenerOnce(map, 'idle', function() {
                            google.maps.event.trigger(map, 'resize');
                            map.setCenter(location);
                        });
                    });



                };

                scope.init();

                scope.getDirections = function() {
                    var request = {
                        origin: scope.origin,
                        destination: scope.endPoint,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };
                    directionsService.route(request, function(response, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response)
                            document.getElementById('wrongAddress').style.display = "none";
                        } else {
                            document.getElementById('wrongAddress').style.display = "block";
                        }
                    });
                    directionsDisplay.setMap(map);

                    directionsDisplay.setPanel(document.getElementById('directionsList'));

                };

                scope.clearDirections = function() {
                    scope.init();
                    directionsDisplay.setPanel(null);
                    scope.origin = '';
                };



            }
        };

        return mapObj;


    });