mabapp.service('messageService', ['$rootScope', function($rootScope){
	this.log = function(data){
		var messages = [];
		if(data && data.message && data.message!=''){
			messages.push({ type : 'success', msg : data.message});
			$rootScope.$broadcast('message.new');
		}
		else if(data && data.errors && data.errors!=''){
			messages.push({ type : 'danger', msg : data.errors});
			$rootScope.$broadcast('message.new');
		}
		return messages;
	};
}]);