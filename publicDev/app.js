const app = angular.module('ToDo app', [])
function todosCtrl($scope, $http) {
	this.title = 'ToDo app'
	$scope.tokenId = ''
	$scope.todosList = []
	$scope.hasAttachment = false
	$scope.isDone = false
	$scope.token = ''
	$scope.$watch('token', function() {
		$http.get( 
			`/api/tokens/${$scope.token}`
		).then(
			response => {
				if (response === null) return Promise.reject('No such token found')
				$scope.tokenId = response.data
				$scope.refresh()
			},
			err => console.log(err)
		)
	}, true);
	$scope.keypress = function(ev) {
		if (ev.originalEvent.keyCode === 13) {
			$scope.add()
		}
	} 
	$scope.genToken = function() {
		alert()
	}
	$scope.add = function() {
		if (this.todoText !== '') {
			const todo = {
				tokenId: this.token ,
				todo: this.todoText,
				hasAttachment: this.hasAttachment,
				isDone: this.isDone
			}
			$http.post('/api/todos/', todo)
			.then(
				response => {
					$scope.refresh()
				},
				err => {
					console.log(err)
				}
			)
		}

	}
	$scope.delete = function(id) {

		$http({
				method: 'DELETE',
				url: `/api/todos/${id}`
			}
		).then(
			response => {
				console.log(response.data)
				$scope.refresh()
			},
			err => {
				console.log(err)
			}
		)
	}
	$scope.refresh = function () {
		$http.get(
			`/api/todos/${$scope.token}`
		).then(
			response => $scope.todosList = response.data
			,
			err => console.log(err)
		)
	}
	setInterval($scope.refresh, 1000)
}



app.controller('ToDos', ['$scope', '$http', todosCtrl])
