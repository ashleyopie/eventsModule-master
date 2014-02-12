'use strict';

angular.module('eventsAppApp')
    .factory('geoHelper', function() {
        // Service logic
        // ...

        // var mapApi = "https://magellan.planetdiscover.com//proxy.js?version=3&channel=indystar&jskey=dca18a10-f7d8-0130-6ec2-000c2973d5a9&libraries";
        // var trackerAPI = "https://magellan.planetdiscover.com//tracker.js?jskey=dca18a10-f7d8-0130-6ec2-000c2973d5a9";

        // //asynch load the map scripts from g-digital
        // $http.get(mapApi).success(function(data) {
        //     if (!data)
        //         console.error("no map script found!!");
        //     eval(data);
        // });

        // $http.get(trackerApi).success(function(data) {
        //     if (!data)
        //         console.error("no map tracking script found!!");
        //     eval(data);
        // });

    // function breakItUp(rec) {
    //     return rec.split(' ').join('+');
    // };

    // var getGeoLoc = function(listing) {
    //     var geo = {
    //         lat: listing.latitude,
    //         lon: listing.longitude
    //     } || null;

    //     //backup address validation if no lat/lon are provided
    //     if (geo === null) {
    //         var queryString = "http://search.indystar.com/scripts/mapping/map_js.jsp?";
    //         var addressOne = breakItUp(listing.address) || "";
    //         var addressTwo = breakItUp(listing.address2) || "";
    //         var city = breakItUp(listing.city) || "";
    //         var state = listing.state;
    //         var zip = parseInt(listing.zip);

    //         var geo = new google.maps.Geocoder();

    //         geo.geocode({
    //             'address': addressOne + ' ' + addressTwo + ' ' + city + ' ' + state + ' ' + zip
    //         }, function(results, status) {
    //             if (status == google.maps.GeocoderStatus.OK) {
    //                 console.log(results);
    //                 geo = {
    //                     lat: results.geometry.location.ob,
    //                     lon: results.geometry.location.pb
    //                 }
    //             }
    //         });
    //     }
    //     return geo;
    // }

    // // Public API here
    // return {
    //     getGeoCenter: function(listing) {
    //         return getGeoLoc(listing);
    //     }
    // };
    });