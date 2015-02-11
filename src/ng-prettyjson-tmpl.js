(function(angular) {
'use strict';

  angular.module('ngPrettyJson')
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('ng-prettyjson/ng-prettyjson-panel.tmpl.html',
    '<div>' + 
    '<button ng-click="edit()" ng-show="edition && !editActivated">Edit</button>' +
    '<button ng-click="edit()" ng-show="edition && editActivated">Cancel</button>' +
    '<button ng-click="update()" ng-show="editActivated && parsable">Update</button>' +
    '<pre class="pretty-json" id="{{id}}"></pre>' +                        
    '</div>');
  }]);

})(window.angular);
