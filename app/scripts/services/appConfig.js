'use strict';

angular.module('eventsAppApp')
    .factory(
        'appConfig',
        function(
            // dependencies injected
        ) {
            // construct

            // return 
            return {

                // valid values: 'dev', 'production', (whatever other configs you want to add)
                'mode': 'dev',


                // production config
                production: {
                    // SearchPublisher API Key
                    apiKey: 'vm29t4jhk9vlkpfl7j95omgu0',

                    // Google ReCaptcha Config
                    domain: 'workdev3.esilogix.com',
                    reCaptchaPublicKey: '6Lfabu4SAAAAAJWhtOU6-mT9olFIgUnSI0u8bwDb',

                    // pass through api proxy config
                    proxyKey: 'Gannet2014',
                    proxyURL: 'http://ec2-23-21-153-60.compute-1.amazonaws.com/digital/production/apiProxy/gateway.php',


                    // SearchPublisher API Configs
                    eventReview: {
                        apiEndPoint: 'http://indystar.planetdiscover.com/api/events/reviews.do?api_key=vm29t4jhk9vlkpfl7j95omgu0',

                    },



                }, // end production config



                // dev config
                dev: {

                    // SearchPublisher API Key
                    apiKey: 'vm29t4jhk9vlkpfl7j95omgu0',

                    // Google ReCaptcha Config
                    domain: 'workdev3.esilogix.com',
                    reCaptchaPublicKey: '6Lfabu4SAAAAAJWhtOU6-mT9olFIgUnSI0u8bwDb',

                    // pass through api proxy config
                    proxyKey: 'Gannet2014',
                    proxyURL: 'http://ec2-23-21-153-60.compute-1.amazonaws.com/digital/production/apiProxy/gateway.php',


                    // SearchPublisher API Configs
                    eventReview: {
                        apiEndPoint: 'http://indystar.test.planetdiscover.com/api/events/reviews.do?api_key=vm29t4jhk9vlkpfl7j95omgu0',

                    },


                }, // end dev config



                // getter method
                get: function(key) {

                    if (typeof this[this.mode][key] !== 'undefined') {
                        return this[this.mode][key];
                    } else {
                        return null;
                    }
                } //end get(key)

            }; //end return

        });