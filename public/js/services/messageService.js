mabapp
// === MESSAGE SERVICE ========
// = manage messages from app =
.service('messageService', ['$rootScope', function($rootScope){
	this.log = function(data){
		var messages = [];
		if(data && data.message && data.message!=''){
			messages.push({ type : 'success', msg : data.message});
			$rootScope.$broadcast('message.new');
		}
		else if(data && data.error && data.error!=''){
			messages.push({ type : 'danger', msg : data.error});
			$rootScope.$broadcast('message.new');
		}
		return messages;
	};
}]);