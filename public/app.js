const app = angular.module('ToDo app', [])
function todosCtrl($scope, $http) {
	this.title = 'ToDo app'
	$scope.userId = '5910e3727c4a255ee077279e'
	$scope.todosList = []
	$scope.hasAttachment = false
	$scope.isDone = false
	$scope.add = function() {
		const user = {
			userId: this.userId,
			todo: this.todoText,
			hasAttachment: this.hasAttachment,
			isDone: this.isDone
		}
		console.log(user)
		$http.post(
			'/api/todos/',
			user
		).then(
			response => {
				$scope.todosList.push(response.data)
			},
			err => {
				console.log(err)
			}
		)
	}
	$scope.delete = function(id) {
		$http({
				method: 'DELETE',
				url: `/api/todos/${id}`
			}
		).then(
			response => {
				console.log(response.data)
			},
			err => {
				console.log(err)
			}
		)
	}
	setInterval(() => {
		$http.get(
			`/api/todos/${$scope.userId}`
		).then(
			response => $scope.todosList = response.data
			,
			err => console.log(err)
		)
		},
		1000
	)
}


app.controller('ToDos', ['$scope', '$http', todosCtrl])
