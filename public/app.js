const app = angular.module('ToDo app', [])
function todosCtrl($scope, $http) {
	this.title = 'ToDo app'
	$scope.username = 'testMikey'
	$scope.add = function() {
		$http.post(
			'/api/todos/',
			{
				username: this.username,
				todo: this.todoText,
				hasAttachment: this.hasAttachment,
				isDone: this.isDone
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
}


app.controller('ToDos', ['$scope', '$http', todosCtrl])
