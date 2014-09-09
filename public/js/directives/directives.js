mabapp.directive('autoheight', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var elt = $(element[0]);
			elt.ready(function(){
				elt.height(elt.parent().height());
			});
		}
	};
});
