mabapp.directive('autoheight', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var elt = $(element[0]);
			$(document).ready(function(){
				console.log(elt.parent());
				elt.height(elt.parent().height());
				elt.css({margin: 0, padding: 0});
			});
		}
	};
});
