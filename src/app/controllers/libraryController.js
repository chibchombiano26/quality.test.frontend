 /*global angular*/
 angular.module('app')
.controller('libraryCtrl', function($scope,$q, libraryService,  $mdDialog, $mdMedia){
     
     $scope.Books = [];
     $scope.Authors = [];
     
     $scope.selected = {};
     
     (function getBooks(){
         
         var books = libraryService.getBooks();
         var authors = libraryService.getAuthors();
         
         $q.all([books, authors]).then(function(result){
            $scope.Books = result[0].data; 
            $scope.Authors = result[1].data; 
         })
         
     }());
     
     $scope.new = function(evt){
         $scope.selected = undefined;
         $scope.showAdvanced(evt);
     }
     
     $scope.delete = function(index, item){
        $scope.Books.splice(index, 1);
        libraryService.deleteBook(item.Id);
     }
     
     $scope.editAction = function(evt, item){
         $scope.selected = item;
         $scope.showAdvanced(evt);
     }
     
 
    
    $scope.showAdvanced = function(ev) {
         var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
         $mdDialog.show({
                 controller: 'libraryCtrlAddEdit',
                 templateUrl: 'app/views/addEditBook.html',
                 parent: angular.element(document.body),
                 targetEvent: ev,
                 clickOutsideToClose: true,
                 fullscreen: useFullScreen,
                 resolve : {
                     Authors : function(){
                         return $scope.Authors;
                     },
                     Current : function(){
                         return $scope.selected;
                     }
                 }
             })
             .then(function(book) {
                 book['IdAuthor'] = book.Author.Id; 
                 delete book.Author;
                 //insert
                 if(!book.Id){
                    libraryService.insertBook(angular.toJson(book)).then(function(result){
                        $scope.Books.push(result.data);    
                    })
                 }//edit
                 else{
                     libraryService.updateBook(book.Id, angular.toJson(book));
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
 
 .controller('libraryCtrlAddEdit', function($scope, $mdDialog, Authors, Current){
     $scope.Authors = Authors;
     $scope.Book = {};
     
     if(Current){
        $scope.Book = Current;    
     }
     
     $scope.hide = function() {
         $mdDialog.hide();
     };
     $scope.cancel = function() {
         $mdDialog.cancel();
     };
     $scope.addOrEditbook = function() {
         $mdDialog.hide($scope.Book);
     };
     
 })
 