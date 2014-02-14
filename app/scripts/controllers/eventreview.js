'use strict';

angular.module('eventsAppApp')
    .controller('EventreviewCtrl', function($scope, $modalInstance, eventData, appConfig, eventReview) {

        /* -- private scope -- */

        // configure/initialize eventReview
        eventReview.apiEndPoint = appConfig.get('eventReview').apiEndPoint;
        eventReview.apiKey = appConfig.get('apiKey');
        eventReview.reCaptchaPublicKey = appConfig.get('reCaptchaPublicKey');
        eventReview.domain = appConfig.get('domain');

        // private scope also includes eventData
        // console.log(eventData);


        /* -- public scope -- */

        // import data from resolve() into modal controller scope
        $scope.eventData = eventData.event;

        // data-binding to form elements in the view
        $scope.eventReview = {
            eventId: $scope.eventData.id,
            name: null,
            email: null,
            comment: null,
            format: 'json'
        };

        // submit the eventReview to SearchPublisher
        $scope.submitEventReview = function() {
            // get the data from the view, into the eventReview object
            eventReview.import($scope.eventReview);
            //console.log('submit review clicked');

            // get the captcha challenge and response
            eventReview.recaptcha_challenge_field = Recaptcha.get_challenge();
            eventReview.recaptcha_response_field = Recaptcha.get_response();

            // submit the review, and return data to callback
            eventReview.submit(function(apiResponse, status, headers, config) {
                console.log('API Response: ');
                console.log(apiResponse);
                console.log('status: ');
                console.log(status);
                /*
            console.log('headers: ');
            console.log(headers);
            console.log('config: ');
            console.log(config);
            */
                if (apiResponse.success === 'true') {
                    $modalInstance.close();
                }

            });

        };

        // function to close this modal
        $scope.cancel = function() {
            $modalInstance.close();
        };

        // gets a recaptcha and displays it in the 
        $scope.getCaptcha = function() {
            Recaptcha.create(
                appConfig.get('reCaptchaPublicKey'), // recaptcha public key
                "event-review-recaptcha", // id of the container element
                {
                    theme: "clean", // options here: https://developers.google.com/recaptcha/docs/customization
                    callback: Recaptcha.focus_response_field // callback function after recaptcha loads
                }
            );
        };


    });