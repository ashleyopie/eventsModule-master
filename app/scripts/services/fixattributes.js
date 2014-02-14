'use strict';

angular.module('eventsAppApp')
    .factory('fixAttributes', function() {

        var fixAttributes = function(object) {
            var temp = {};
            angular.forEach(object.attributes, function(key, value) {
                if (key.value === null || key.value === "" || key.value === "null") {
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

        // Public API here
        return {
            fixAttrib: function(object) {
                return fixAttributes(object);
            }
        };
    });