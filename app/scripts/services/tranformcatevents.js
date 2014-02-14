'use strict';

angular.module('eventsAppApp')
    .factory('tranformcatevents',
        function(

            // injected dependencies
            createIndex

        ) {

            return {
                origData: null,
                transformedData: {},

                transform: function(data) {
                    if (typeof data !== 'undefined') {
                        this.origData = data;
                    }

                    this.transformedData = this.origData;

                    var categories_indexed = {
                        by: {
                            id: {},
                            title: {}
                        }
                    };

                    // index categories by id 
                    categories_indexed.by.id = createIndex
                        .data(this.origData.categories)
                        .by('id');
                    // index categories by title
                    categories_indexed.by.title = createIndex
                        .data(this.origData.categories)
                        .by('title');

                    this.transformedData.categories_indexed = categories_indexed;

                    return this.transformedData;

                }, // end transform();

                // mutator methods

                data: function(data) {
                    this.origData = data;
                    return this;
                }

            }; // end return

        } // end function([injected dependencies])

); // end factory();