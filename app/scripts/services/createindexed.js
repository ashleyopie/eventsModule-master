'use strict';

angular.module('eventsAppApp')
    .factory('createindexed', function() {
            /*
             * Usage: indexedData = createIndex
             *                          .data(data)
             *                          .by('id');
             *
             * Accepts array or object (sparse array) of objects
             *
             */

            return {

                unindexedData: null,
                indexedData: {},

                // indexBy indexes by object attribute, it is case-sensitive
                by: function(indexBy) {
                    var key = null;
                    var datum = null;

                    // clear this indexedData (since factories are singletons)
                    this.indexedData = {};

                    for (key in this.unindexedData) {
                        datum = this.unindexedData[key];
                        if (typeof datum[indexBy] === 'undefined') {
                            console.log('attempting to index array of objects by non-existent object-property');
                        }
                        this.indexedData[datum[indexBy]] = datum;
                    }

                    return this.indexedData;
                }, // end by()

                // mutator methods for fluent interface
                data: function(unindexedData) {
                    this.unindexedData = unindexedData;
                    return this;
                } // end data();

            }; // end return

        } // end indexResponse factory function()

); // end factory();