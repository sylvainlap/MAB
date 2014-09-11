mabapp.directive('autoheight', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var elt = element[0];
			var getParentH = function(e){
				return e.parentNode.offsetHeight;
			};
			scope.$watch(function(){return getParentH(elt);}, function(){
				setTimeout(function(){elt.style.height = getParentH(elt)+'px'}, 50);
			});
		}
	};
});
