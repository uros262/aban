/**
 * Created by Uros on 17-Jun-16.
 */
var testModule = angular.module('testModule', [])
    .config(
        [
            "$stateProvider",
            function ($stateProvider) {
                $stateProvider
                    .state("test", {
                        url: "/test",
                        controller: "TestController",
                        controllerAs: "ctrlTest",
                        templateUrl: "views/test/index.html"
                    });
            }
        ]
    );