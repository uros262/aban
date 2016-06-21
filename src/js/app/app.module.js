/**
 * Created by Uros on 17-Jun-16.
 */

var appModule = angular.module('appModule',
    [
        'ui.router',
        "testModule"
    ]
);

appModule.config(
    [
        "$stateProvider",
        '$urlRouterProvider',
        '$locationProvider',
        '$httpProvider',
        '$urlMatcherFactoryProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $urlMatcherFactoryProvider) {

            $urlMatcherFactoryProvider.strictMode(false);

            $httpProvider.defaults.withCredentials = true;

            // Rule that converts url to lower case
            $urlRouterProvider.rule(function ($injector, $location) {
                var path = $location.path(),
                    lowerCasePath = path.toLowerCase();

                // if path is not lower case then convert to lower case
                if (path != lowerCasePath) {
                    $location.replace().path(lowerCasePath);
                }
            });

            $urlRouterProvider.when("", "/test");
            $urlRouterProvider.when("/", "/test");

        }
    ]
);

appModule.run(
    [
        "$rootScope",
        function ($rootScope) {

            $rootScope.$on(
                '$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams){
                    console.log(toState);
                }
            );

            $rootScope.$on(
                '$stateNotFound',
                function(event, unfoundState, fromState, fromParams){
                    console.log(fromState);
                    console.log(unfoundState);
                }
            );
        }
    ]
);