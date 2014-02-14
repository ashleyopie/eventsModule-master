'use strict';

angular.module('eventsAppApp')
    .factory(
        'eventReview',
        function(
            // dependencies injected
            appConfig,
            proxyAPI
        ) {
            // construct

            // return 
            return {

                eventId: null,
                name: null,
                email: null,
                comment: null,
                format: 'json',

                domain: null,
                captcha_challenge: null,
                captcha_response: null,

                apiEndPoint: null,
                apikey: null,

                import: function(objData) {
                    angular.extend(this, objData);
                },

                submit: function(callback) {
                    // ensure that callback is a function, if not passed, use an empty closure
                    if (typeof callback === 'undefined') {
                        callback = function() {};
                    }

                    var apiRequest = {
                        api_key: this.apiKey,

                        eventId: encodeURIComponent(this.eventId),
                        name: encodeURIComponent(this.name),
                        email: encodeURIComponent(this.email),
                        comment: encodeURIComponent(this.comment),
                        format: encodeURIComponent(this.format),

                        domain: encodeURIComponent(this.domain),
                        recaptcha_challenge_field: encodeURIComponent(this.recaptcha_challenge_field),
                        recaptcha_response_field: encodeURIComponent(this.recaptcha_response_field)
                    };

                    // this is where the review is submitted to searchpublisher

                    proxyAPI
                        .url(appConfig.get('eventReview').apiEndPoint)
                        .apiRequest(apiRequest)
                        .verbose()
                        .submit(callback);

                }

            };

        });