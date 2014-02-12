'use strict';

angular.module('eventsAppApp')
    .factory('tranformresTypedetector',
        function(
            // injected dependencies
            // (none)
        ) {
            return {
                type: null, // detected type

                // possible types (if res has this attribute in the
                // root of the data, it's that type (see this.checkResponse())
                possibleTypes: [
                    'events',
                    'listings',
                    'categories'
                    // 2ndary checking breaks this out into:
                    // 'categories_events',
                    // 'categories_listings'


                ], // end possible types definition

                obj: {
                    has: function(attr) {
                        if (typeof this[attr] !== 'undefined') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }, // end obj initialization

                check: function(response) {
                    if (typeof response !== 'undefined') {
                        this.response(response);
                    }

                    return this.checkResponse();
                }, // end check();

                // accepts response or response.data
                response: function(response) {
                    if (typeof response.data !== 'undefined') {
                        response = response.data;
                    }
                    this.obj = $.extend(this.obj, response);
                    return this;
                }, //end response()

                checkResponse: function() {
                    // function variables
                    var key = null;
                    var type = null;

                    // instance variables
                    this.type = null;

                    // detect type
                    for (key in this.possibleTypes) {
                        type = this.possibleTypes[key];
                        if (this.obj.has(type)) {
                            this.type = type;
                        }
                    }

                    // 2ndary processing
                    // if the type is categories, events or listings categories?
                    if (this.type === 'categories') {
                        if (typeof this.obj.categories[0].synonyms === 'undefined') {
                            this.type = 'categories_events';
                        } else {
                            this.type = 'categories_listings';
                        }
                    }

                    return this.type;
                } // end checkResponse()

            }; // end return

        } // end function([injected dependencies])

); // end factory();