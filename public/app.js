'use strict';

var app = angular.module('ToDo app', []);
function todosCtrl($scope, $http) {
	this.title = 'ToDo app';
	$scope.tokenId = '';
	$scope.todosList = [];
	$scope.hasAttachment = false;
	$scope.isDone = false;
	$scope.token = '';
	$scope.$watch('token', function () {
		$http.get('/api/tokens/' + $scope.token).then(function (response) {
			if (response === null) return Promise.reject('No such token found');
			$scope.tokenId = response.data;
			$scope.refresh();
		}, function (err) {
			return console.log(err);
		});
	}, true);
	$scope.keypress = function (ev) {
		if (ev.originalEvent.keyCode === 13) {
			$scope.add();
		}
	};
	$scope.genToken = function () {
		alert();
	};
	$scope.add = function () {
		if (this.todoText !== '') {
			var todo = {
				tokenId: this.token,
				todo: this.todoText,
				hasAttachment: this.hasAttachment,
				isDone: this.isDone
			};
			$http.post('/api/todos/', todo).then(function (response) {
				$scope.refresh();
			}, function (err) {
				console.log(err);
			});
		}
	};
	$scope.delete = function (id) {

		$http({
			method: 'DELETE',
			url: '/api/todos/' + id
		}).then(function (response) {
			console.log(response.data);
			$scope.refresh();
		}, function (err) {
			console.log(err);
		});
	};
	$scope.refresh = function () {
		$http.get('/api/todos/' + $scope.token).then(function (response) {
			return $scope.todosList = response.data;
		}, function (err) {
			return console.log(err);
		});
	};
	setInterval($scope.refresh, 1000);
}

app.controller('ToDos', ['$scope', '$http', todosCtrl]);