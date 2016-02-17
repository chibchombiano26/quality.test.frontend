 /*global angular*/
 angular.module('app')
 .controller('authorsCtrl', function($scope, libraryService, $q, $mdMedia, $mdDialog){
     
     $scope.Authors = [];
     $scope.Countries = [];
     $scope.selected = {};
     
     (function getAuthors(){
         
         var countries = libraryService.getCountries();
         var authors = libraryService.getAuthors();
         
         $q.all([countries, authors]).then(function(result){
            $scope.Countries = result[0].data; 
            $scope.Authors = result[1].data; 
         })
         
     }());
     
     $scope.new = function(evt){
         $scope.selected = undefined;
         $scope.showAdvanced(evt);
     }
     
     $scope.delete = function(index, item){
        $scope.Authors.splice(index, 1);    
        libraryService.deleteAuthor(item.Id);
     }
     
     $scope.editAction = function(evt, item){
         $scope.selected = item;
         $scope.showAdvanced(evt);
     }
     
 
    
    $scope.showAdvanced = function(ev) {
         var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
         $mdDialog.show({
                 controller: 'authorCtrlAddEdit',
                 templateUrl: 'app/views/addEditAuthors.html',
                 parent: angular.element(document.body),
                 targetEvent: ev,
                 clickOutsideToClose: true,
                 fullscreen: useFullScreen,
                 resolve : {
                     Countries : function(){
                         return $scope.Countries;
                     },
                     Current : function(){
                         return $scope.selected;
                     }
                 }
             })
             .then(function(author) {
                 author['IdNationality'] = author.Country.Id; 
                 delete author.Country;
                 //insert
                 if(!author.Id){
                    libraryService.insertAuthor(angular.toJson(author)).then(function(result){
                        $scope.Authors.push(result.data);
                    });
                 }//edit
                 else{
                     libraryService.updateBook(author.Id, angular.toJson(author));
                 }
             }, function() {
                 $scope.status = 'You cancelled the dialog.';
             });
         $scope.$watch(function() {
             return $mdMedia('xs') || $mdMedia('sm');
         }, function(wantsFullScreen) {
             $scope.customFullscreen = (wantsFullScreen === true);
         });
     };
     
     
 })
 
  .controller('authorCtrlAddEdit', function($scope, $mdDialog, Countries, Current){
     $scope.Countries = Countries;
     $scope.Author = {};
     
     if(Current){
        $scope.Author = Current;    
     }
     
     $scope.hide = function() {
         $mdDialog.hide();
     };
     $scope.cancel = function() {
         $mdDialog.cancel();
     };
     $scope.addOrEdit = function() {
         $mdDialog.hide($scope.Author);
     };
     
 })