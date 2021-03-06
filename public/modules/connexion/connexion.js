'use strict';

var app = angular.module('connexion', ['ui.router']);

app.config(function($stateProvider) {
    $stateProvider
    //Login
    .state('login', {
        url: '/login',
        templateUrl:'modules/connexion/views/login.html',
		controller: 'login'
    })
    //Logout
	.state('logout',{
		url: '/logout',
		controller: 'logout'
	})
	//signup
	.state('signup',{
		url: '/signup',
		templateUrl: 'modules/connexion/views/signup.html',
		controller: 'signup'
	});
});

//Login
app.controller('login', ['$rootScope', '$scope', '$http', '$location',
    function($rootScope, $scope, $http, $location){
    	$scope.connection = function(){
    		$http.post('/api/connexion/login', $scope.log)
    		.then(function(reponse){
    			$rootScope.user = reponse.data;
    			$location.path('/');
    		}, function(reponse){
                $scope.error = reponse.data.message;            
            });
    	};
    }
]);

//Logout
app.controller('logout', ['$http', '$location', '$rootScope',
    function($http, $location, $rootScope){
    	$http.get('/api/connexion/logout').then(function(){
    		$rootScope.user = null;
    		$location.path('/');
    	});
    }
]);


//Inscription
app.controller('signup', ['$http', '$location', '$scope', 
	function($http, $location, $scope){
		$scope.inscription= function(){
			console.log($scope.info.mail);
			$http.post('/api/connexion/signup', $scope.info).then(function(user){
				$location.path('/');
			});
		};
	}
]);
