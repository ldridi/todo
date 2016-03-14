// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

angular.module("starter").controller("mainCtrl", function($scope,$ionicPopup,$ionicActionSheet,$http,$interval){
    $scope.todo=[
            
    ];
    
    var affiche=function(){
    url ="http://api.dridilotfi.com/?method=affiche";
    $http.post(url)
         .success(function(response){
            if($scope.todo.length < response.length){
                for(var i=$scope.todo.length;i<(response.length);i++){
                $scope.todo.push({ id: response[i].id, titre: response[i].titre, desc: response[i].description});    
                }
            }else if($scope.todo.length>response.length){
                $scope.todo =[];
                for(var i=$scope.todo.length;i<(response.length);i++){
                    $scope.todo.push({ id: response[i].id, titre: response[i].titre, desc: response[i].description});    
                } 
            }
            
            
            //$ionicLoading.hide();
            //console.log(response.data);
         })
         .error(function(err){
            
         });
        
        
    }
    affiche();
    setInterval(affiche,2000);
    
    
    $scope.deleteTodoById = function(id){
        /*for(var i=0;i<$scope.todo.length; i++){
            if($scope.todo[i].id === id){
                $scope.todo.splice(i,1);
                return;
            }
        }*/
        url ="http://api.dridilotfi.com/?method=effacer&param="+id;
        $http.post(url)
         .success(function(response){
            
            affiche();
            
            //$ionicLoading.hide();
            //console.log(response.data);
         })
         .error(function(err){
            
         });
        
        
    };
    
    $scope.addToDo = function(){
        $scope.newTodo = {
            id:$scope.todos.length,
            titre:"",
            description:""
        };
        
        var todoTemplate = '<input type="text" ng-model="newTodo.titre"></br><textarea ng-model="newTdo.description" rows="5" cols="15"></textarea>';
        
        var myPopup = $ionicPopup.show({
            template: todoTemplate,
            title: 'Ajouter une tache',
            subTitle: 'courage',
            scope: $scope,
            buttons: [
              { text: 'Annuler',
                onTap: function(e){
                    return;
                }
              },
              {
                text: '<b>Ajouter</b>',
                type: 'button-positive',
                onTap: function(e) {
                  if (!$scope.newTodo.titre) {
                    //don't allow the user to close unless he enters wifi password
                    e.preventDefault();
                  } else {
                    $scope.todos.push($scope.newTodo);
                    console.log($scope.todos);
                  }
                }
              }
            ]
          });
    };
    
    $scope.editTodoById = function(todo){
        $scope.editTodo = todo;
        
        var todoTemplate = '<input type="text" ng-model="editTodo.titre"></br><textarea ng-model="editTodo.desc" rows="5" cols="15"></textarea>';
        
        var myPopup = $ionicPopup.show({
            template: todoTemplate,
            title: 'modifier une tache',
            subTitle: 'Modification',
            scope: $scope,
            buttons: [
              { text: 'Annuler',
                onTap: function(e){
                    return;
                }
              },
              {
                text: '<b>Modifier</b>',
                type: 'button-positive',
                onTap: function(e) {
                  url ="http://api.dridilotfi.com/?method=mise&titre="+editTodo.titre+"&desc="+editTodo.desc+"&id="+editTodo.id;
                    $http.post(url)
                     .success(function(response){
                        return;
                        affiche();
                        
                        //$ionicLoading.hide();
                        //console.log(response.data);
                     })
                     .error(function(err){

                     });
                    
                }
              }
            ]
          });
    };
    
    $scope.showContext = function(todo){
        var menu = $ionicActionSheet.show({
             buttons: [
               { text: 'urgent' },
               { text: 'penible' }
             ],
             destructiveText: 'Delete',
             titleText: 'Modify your album',
             cancelText: 'Cancel',
             cancel: function() {
                  // add cancel code..
                },
             buttonClicked: function(index) {
                switch(index){
                    case 0: console.log("urgent");
                    todo.urgent = !todo.urgent;
                    break;
                    case 1: console.log("penible");
                    todo.boring = !todo.boring;
                    break;
                }
                 return true;
             }
           });
         
    };
    
});
