/**
 * Created by Uros on 17-Jun-16.
 */

angular.module('testModule').controller('TestController',
    [
        "$scope",
        function ($scope) {
            var ctrlTest = this;
            ctrlTest.test = "Ovo je testni string";
        }
    ]
);