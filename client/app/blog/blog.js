var app = angular.module('blog', []); 

app.controller('blogController', 
	[ '$scope', 'blogs', function($scope,blogs){ 
	$scope.test = 'Hello world!'; 

	$scope.blogs = blogs.blogs;
	// [ 
	// 	{title: 'post 1', upvotes: 5}, 
	// 	{title: 'post 2', upvotes: 2}, 
	// 	{title: 'post 3', upvotes: 15}, 
	// 	{title: 'post 4', upvotes: 9}, 
	// 	{title: 'post 5', upvotes: 4}
	// ]
	

	$scope.addBlog = function(){
		if(!$scope.title || $scope.title === '') { return; }
		$scope.blogs.push({
			link: $scope.link,
			title: $scope.title, 
			upvotes: 0,
			comments: [ 
			{
				author: 'Joe', body: 'Cool post!', upvotes: 0
			}, 
			{
				author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0
			}]
		});
		$scope.title = '';
		$scope.link = '';
	};

	$scope.incrementUpvotes = function(blog) {
		blog.upvotes += 1;
	};



}]);


app.controller('PostsCtrl', [ '$scope', '$stateParams', 'blogs', function($scope, $stateParams, posts){ 
	$scope.blog = blogs.blogs[$stateParams.id];
	$scope.addComment = function(){
	  if($scope.body === '') { return; }
	  $scope.post.comments.push({
	    body: $scope.body,
	    author: 'user',
	    upvotes: 0
	  });
	  $scope.body = '';
	};
}]);

app.factory('blogs', [ function(){ 
	var o = { 
		blogs: 
		[ 
			{title: 'post 1', upvotes: 5}, 
			{title: 'post 2', upvotes: 2}, 
			{title: 'post 3', upvotes: 15}, 
			{title: 'post 4', upvotes: 9}, 
			{title: 'post 5', upvotes: 4}
		] 
	}; 
	return o; 
}]);