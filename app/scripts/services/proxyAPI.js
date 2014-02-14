'use strict';

/*
 *
 * Usage:
 *
 * proxyAPI
 *      .url()              // specify endpoint url
 *      .apiRequest()       // specify post variables as json object
 *      .verobose()         // enable console.log of apiResponse
 *      .submit(callback)   // execute the request, and specify callback
 *                          // (returns the http object)
 *
 */

angular.module('eventsAppApp')
    .factory(
        'proxyAPI',
        function(
            // dependencies injected
            $http,
            appConfig
        ) {

            return {

                settings: {
                    endpointURL: null,
                    apiRequest: null,
                    method: 'POST',
                    proxyURL: appConfig.get('proxyURL'),
                    proxyKey: appConfig.get('proxyKey'),
                    verbose: false,

                },

                // mutator methods
                url: function(endpointURL) {
                    if (typeof endpointURL === 'undefined') {
                        return this.settings.endpointURL;
                    }

                    this.settings.endpointURL = endpointURL;
                    return this;
                }, // end url(endpointURL)

                apiRequest: function(apiRequest) {
                    if (typeof apiRequest === 'undefined') {
                        return this.settings.endpointURL;
                    }

                    this.settings.apiRequest = apiRequest;
                    return this;
                }, // end request(apiRequest)

                method: function(submitmethod) {
                    if (typeof submitmethod === 'undefined') {
                        return this.settings.method;
                    }

                    this.settings.method = submitmethod;
                    return this;
                },
                verbose: function(bool) {
                    if (typeof bool === 'undefined') {
                        this.settings.verbose = true;
                    } else {
                        this.settings.verbose = bool;
                    }

                    return this;
                },

                // query/command methods
                submit: function(callback) {
                    if (this.settings.verbose === true) {
                        // debug info
                        console.log("Proxy API-Request (Post Variables): ");
                        console.log(this.settings.apiRequest);
                    }

                    return $http({
                        method: this.settings.method,
                        url: this.buildURL(),
                        data: this.settings.apiRequest,
                        //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    })
                        .success(callback)
                        .error(callback);
                }, // emd submit(callback(data, status, headers, config)

                buildURL: function() {
                    return this.settings.proxyURL + '?proxykey=' + this.settings.proxyKey + '&url=' + encodeURIComponent(this.settings.endpointURL);

                } //end buildURL();


            }; // end return


        }); // end proxyAPI