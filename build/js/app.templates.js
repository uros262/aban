angular.module('appModule').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/test/directives/test-directive.html',
    "<span>Ovo je testna direktivaaaaaaaaaaaaaaaaaaaaaa</span> <span>Ovo je testna direktivaaaaaaaaaaaaaaaaaaaaaa</span> <span>Ovo je testna direktivaaaaaaaaaaaaaaaaaaaaaa</span>"
  );


  $templateCache.put('views/test/index.html',
    "<span ng-bind=\"ctrlTest.test\"></span><br><test-directive></test-directive>"
  );

}]);
