(function(){
  'use strict';

  angular.module('app')
          .service('navService', [
          '$q',
          navService
  ]);

  function navService($q){
    var menuItems = [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        sref: '.dashboard'
      },
      {
        name: 'Books',
        icon: 'view_module',
        sref: '.library'
      },
      {
        name: 'Authors',
        icon: 'person',
        sref: '.authors'
      },
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
