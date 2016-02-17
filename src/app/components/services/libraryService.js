 /*global angular*/
 angular.module('app')
 .service('libraryService', function($q, $http){
     
     var url = "http://190.147.9.61:8056/api/";
     var dataFactory = {};
     
     dataFactory.getBooks = function(){
         return $http.get(url + 'library');
     }
     
     dataFactory.getAuthors = function(){
         return $http.get(url + 'Authors');
     }
     
     dataFactory.getCountries = function(){
         return $http.get(url + 'Countries');
     }
     
     dataFactory.insertBook = function(book) {
         return $http.post(url + 'library', book)
     }
     
     dataFactory.updateBook = function(id, book){
          $http.put(url + 'library/' + id, book)
     }
     
     dataFactory.deleteBook = function(id){
          $http.delete(url + 'library/' + id)
     }
     
     dataFactory.insertAuthor = function(Author) {
         return $http.post(url + 'Authors', Author)
     }
     
     dataFactory.updateAuthor = function(id, Author){
          $http.put(url + 'Authors/' + id, Author)
     }
     
     dataFactory.deleteAuthor = function(id){
          $http.delete(url + 'Authors/' + id)
     }
     
     return dataFactory;
     
 })
 
 