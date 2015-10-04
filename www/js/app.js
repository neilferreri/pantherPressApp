// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var rssApp = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})



rssApp.controller("FeedController", function($http, $scope, $timeout) {
	
			$http.get("http://pantherpressonline.org/?json=1")
				.success(function(data) {
					$scope.data = data;
					$scope.entries = data.posts;
					$scope.count = data.count;
					
					window.localStorage["entries"] = JSON.stringify(data.posts);
					
				})
				.error(function(data) {
					//console.log("ERROR: " + data);
					
				if(window.localStorage["entries"] !== undefined) {
                    $scope.entries = JSON.parse(window.localStorage["entries"]);
                }
					
				});
	
		
		$scope.browse = function(v) {
			window.open(v, "_blank", "location=no", "zoom=no", "closebuttoncaption='YoYo'");
		}
		
		$scope.doRefresh = function() { 
			
			$http.get("http://pantherpressonline.org/?json=1")
				.success(function(data) {
					$scope.data = data;
					$scope.entries = data.posts;
					$scope.count = data.count;
					
					window.localStorage["entries"] = JSON.stringify(data.posts);
					
				})
				.error(function(data) {
					//console.log("ERROR: " + data);
					
				if(window.localStorage["entries"] !== undefined) {
                    $scope.entries = JSON.parse(window.localStorage["entries"]);
                }
					
				});
				
			  $scope.$broadcast('scroll.refreshComplete');
			
			
		   
		  };
 
});

/* rssApp.controller('MyCtrl', function($scope, $timeout, $state) {
  $scope.doRefresh = function() { 
    $timeout( function() {
	  //$ionicHistory.clearHistory();
	  location.reload(true);
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
   
  };
  
}); */
