'use strict';

angular.module('eventsAppApp')
    .factory('dateFixer', function(defaultImages, fixAttributes) {
        // Service logic
        // ...
        function lopOffCST(string) {
            //console.log(string + "");
            //console.log(string.slice(0, string.length - 3));
            return string.slice(0, string.length - 3);

        }

        function fixDateString(object) {
            angular.forEach(object, function(key, value) {

                //did we already convert it?
                if (!(key.date_added instanceof Date)) {
                    //fix the attributes
                    key = fixAttributes.fixAttrib(key);

                    //add default image
                    key.default_image = defaultImages.addDefaultImage(key);

                    //date stuff
                    key.date_added = new Date(lopOffCST(key.date_added));
                    key.date_changed = new Date(lopOffCST(key.date_changed));
                    key.span_end = new Date(lopOffCST(key.span_end));
                    key.span_start = new Date(lopOffCST(key.span_start));

                    angular.forEach(key.occurrences, function(okey, value) {
                        okey.enddatetime = new Date(lopOffCST(okey.enddatetime));
                        okey.startdatetime = new Date(lopOffCST(okey.startdatetime));
                    });
                }
            });

            return object;
        }

        // Public API here
        return {
            fixDate: function(object) {
                return fixDateString(object);
            }
        };
    });