/**
 * Created by Uros on 18-Jun-16.
 */

angular.module('testModule').directive('testDirective',
    [
        function () {
            return {
              templateUrl: "views/test/directives/test-directive.html"
            };
        }
    ]
);