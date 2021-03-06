const app = angular.module('ToDo app', []);
function todosCtrl($scope, $http) {
	this.title = 'ToDo app';
	$scope.userId = '';
	$scope.todosList = [];
	$scope.hasAttachment = false;
	$scope.isDone = false;
	$scope.username = '';
	$scope.$watch('username', function () {
		$http.get(`/api/users/${$scope.username}`).then(response => {
			if (response === null) return Promise.reject('No such user found');
			$scope.userId = response.data;
			$scope.refresh();
		}, err => console.log(err));
	}, true);
	$scope.add = function () {
		if (this.todoText !== '') {
			const user = {
				userId: this.userId,
				todo: this.todoText,
				hasAttachment: this.hasAttachment,
				isDone: this.isDone
			};
			$http.post('/api/todos/', user).then(response => {
				$scope.refresh();
			}, err => {
				console.log(err);
			});
		}
	};
	$scope.delete = function (id) {

		$http({
			method: 'DELETE',
			url: `/api/todos/${id}`
		}).then(response => {
			console.log(response.data);
			$scope.refresh();
		}, err => {
			console.log(err);
		});
	};
	$scope.refresh = function () {
		$http.get(`/api/todos/${$scope.userId}`).then(response => $scope.todosList = response.data, err => console.log(err));
	};
	setInterval($scope.refresh, 1000);
}

app.controller('ToDos', ['$scope', '$http', todosCtrl]);