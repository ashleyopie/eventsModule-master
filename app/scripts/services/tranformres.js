'use strict';

angular.module('eventsAppApp')
    .factory('tranformres',
        function(

            // injected dependencies
            transformResponse_TypeDetector,
            transform_categories_events
            //transformEvents,
            //transformListings

        ) {

            return {

                theResponse: {},
                theTransformedResponse: {},
                transformers: [],

                transform: function(response) {

                    if (typeof response !== 'undefined') {
                        this.response(response);
                    }

                    var type = transformResponse_TypeDetector
                        .check(this.theResponse);

                    // get the appropriate transformer(s)
                    switch (type) {

                        // all of these transformers need to be defined/loaded  before hand
                        // (see index.html - src = 'scripts/transformers/transform_' + transformerName
                        case 'categories_events':
                        case 'categories_listings':
                        case 'events':
                        case 'listings':

                            var factoryName = 'transform_' + type;

                            var injector = angular.injector(['eventsAppApp', 'ng']);
                            this.transformers.push(injector.get(factoryName));

                            break;
                        default:

                    }

                    // apply the appropriate transformers
                    var tkey = null;
                    this.theTransformedResponse = this.theResponse;
                    for (tkey in this.transformers) {
                        var transformer = this.transformers[tkey];

                        // transform the response
                        this.theTransformedResponse = transformer
                            .data(this.theTransformedResponse)
                            .transform();;
                    }

                    return this.theTransformedResponse;

                }, // end transform(response)

                // (accepts repsonse or response.data)
                // mutator method
                response: function(theResponse) {
                    if (typeof theResponse.data !== 'undefined') {
                        theResponse = theResponse.data;
                    }
                    this.theResponse = theResponse;
                }


            }; // end return

        } // end function([injected dependencies])

); // end factory();