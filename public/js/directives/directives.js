mabapp
// === AUTOHEIGHT =======================
// = set the height to the parent’s one =
.directive('autoheight', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var elt = element[0];
			if((scope.client.device.type!='mobile' && scope.client.device.type!='tablet') || (elt.className.indexOf("ahf")>0)){
				var getParentH = function(e){
					return e.parentNode.offsetHeight;
				};
				scope.$watch(function(){return getParentH(elt);}, function(){
					setTimeout(function(){elt.style.height = getParentH(elt)+'px'}, 50);
				});
			}
		}
	};
})
// === DROPDOWN ================
// = toggle visibility on clic =
.directive('dropdown', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			element.addClass('up');
			element.on('click', function(){
				element.toggleClass('up');
			});
		}
	};
});
