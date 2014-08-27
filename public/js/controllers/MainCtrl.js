mabapp.controller('MainCtrl',[
	'$scope',
	'$http',
	'localStorageService',
	'messageService',
	function($scope, $http, localStorageService, messageService) {

	// languages
	$scope.l = 'FR';
	$scope.lang = lang;
	
	//shortcuts
	lss = localStorageService;
	
	// $scope init
	$scope.formData = {};
	$scope.formData.school = {};
	$scope.showProfile = false;
	$scope.showUserMenu = false;
	$scope.user = {};
	$scope.user.username = '';
	$scope.user.token = '';

	// === LocalStorage Load ===
	$scope.user.username = lss.get('user_username');
	$scope.user.token = lss.get('user_token');

	// === EVENT WATCH ===
	$scope.$on('message.new', function(event){
		console.log('about to clear...');
		setTimeout($scope.clearAlerts, 5000);
	});
	
	
	// === DATA INCLUSION FUNCTIONS ===
	$scope.dataMgt = {
		/**
		 * Record a Treatment
		 */
		recordTreatment : function() {
			$scope.formData.user = $scope.user;
			$http({
				method:'POST',
				url:'/api/treatment',
				headers:{'x-access-token':$scope.user.token},
				data:$scope.formData})
			.success(function(data){
				$scope.messages = messageService.log(data);
				$scope.formData = {};
			});
		}
	};
	
	// === USER MANAGEMENT FUNCTIONS ===
	$scope.userMgt = {
		/**
		 * Register new user
		 */
		register : function() {
			/* TMP */
			// TODO : les infos requises sont fournies par l’identification SAS
			$scope.formData.lang = 'NR';
			$scope.formData.age = 0;
			$scope.formData.geoloc = 0;
			$scope.formData.structure = 'NR';
			$scope.formData.activity = {'bovine':'1.0'};
			/* /TMP */
			$http.post('/register', $scope.formData)
			.success(function(data) {
				$scope.messages = messageService.log(data);
				// clear the form
				$scope.formData = {};
			});
		},
		/**
		 * Login known user
		 */
		login : function() {
			$http.post('/login', $scope.formData)
			.success(function(data) {
				$scope.messages = messageService.log(data);
				
				// retrieve user data
				$scope.user.username = $scope.formData.username;
				$scope.user.token = data.token;
				// save user data in localStorageService
				lss.set('user_username', $scope.formData.username);
				lss.set('user_token', data.token);
				
				// clear the form
				$scope.formData = {};
			});
		},
		/**
		 * Disconnect current user
		 */
		logout : function() {
			$scope.user = {};
			lss.clearAll();
			$scope.messages = messageService.log({message : $scope.lang['msg_on_logged_out'][$scope.l]});
		},
		/**
		 * TODO : impossible de faire autrement... je voulais faire comme pour la gestion de
		 * showUserMenu, ça ne marche que comme ça... 
		 */
		getProfile : function(t){
			$scope.formData.username = $scope.user.username;
			if(t=='open'){
				$http({
					method:'GET',
					url:'/profile',
					headers:{'x-access-token':$scope.user.token}})
					.success(function(data){
						$scope.messages = messageService.log(data);
						
						$scope.formData = data;
						$scope.showProfile = true;
					});
			}
			else{
				$scope.messages = messageService.log({message : $scope.lang['msg_no_change_saved'][$scope.l]});
					
				$scope.showProfile = false;
				$scope.formData = {};
			}
		},
		/**
		 * Update user profile
		 */
		updateProfile : function() {
			$http({
				method:'POST',
				url:'/profile',
				headers:{'x-access-token':$scope.user.token},
				data:$scope.formData})
				.success(function(data){
					$scope.messages = messageService.log(data);
					
					$scope.formData = {};
					$scope.showProfile = false;
			});
		}
	};

	
	

	// ==== DATE PICKER ====
	$scope.today = function() {
		$scope.formData.date_dispense = new Date();
	};
	$scope.today();
	$scope.clear = function () {
		$scope.formData.date_dispense = null;
	};
	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};
	
	$scope.initDate = new Date('2016-15-20');
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[1];
	// END DATE
	
	// ==== ALERTS ====
	$scope.closeAlert = function(index) {
		$scope.messages.splice(index, 1);
	};
	$scope.clearAlerts = function() {
		console.log('clear !');
		$scope.messages.splice(0, $scope.messages.length);
	}
	// END ALERTS
	
	$scope.loadSysData = function() {
		$http({
			method:'GET',
			url:'/api/enum',
			headers:{'x-access-token':$scope.user.token}
		})
		.success(function(data){
			$scope.messages = messageService.log(data);
			$scope.enums = {};
			for(var e=0; e<data.length;e++){
				$scope.enums[data[e]['name']] = data[e]['data'];
			}
		});
	};
	// === DB Load ===
	$scope.loadSysData();
}]);