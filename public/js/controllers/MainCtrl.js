mabapp.controller('MainCtrl',[
	'$scope',
	'$http',
	'localStorageService',
	'messageService',
	function($scope, $http, localStorageService, messageService) {

	// config load
	$scope.l = 'FR';
	$scope.lang = lang;
	$scope.enums = enums;
	$scope.animals = animals;
	$scope.products = products;
	
	//shortcuts
	lss = localStorageService;
	
	// $scope init
	$scope.data = {
		school : {},
		animals : [],
		products : []
	};
	$scope.tmp = {
		animal:{},
		product:{}
	};
	$scope.ui = {
		showProfile : false,
		showUserMenu : false
	}
	$scope.user = {
		username : lss.get('user_username'),
		token : lss.get('user_token')
	};

	// === EVENT WATCH ===
	$scope.$on('message.new', function(event){
		console.log('about to clear...');
		setTimeout($scope.alertMgt.clearAlerts, 5000);
	});
	
	
	// === DATA INCLUSION FUNCTIONS ===
	$scope.dataMgt = {
		/**
		 * Record a Treatment
		 */
		recordTreatment : function() {
			$scope.data.user = $scope.user;
			$http({
				method:'POST',
				url:'/api/treatment',
				headers:{'x-access-token':$scope.user.token},
				data:$scope.data})
			.success(function(data){
				$scope.messages = messageService.log(data);
				$scope.data = {};
			});
		},
		/**
		 * Build and add the animal object from the selected value
		 */
		addAnimal : function() {
			var animal = $scope.tmp.animal.raw.split('|');
			$scope.data.animals.push({
				species : animal[0],
				type : animal[1],
				age : animal[2],
				weight : animal[3],
				quantity : $scope.tmp.animal.quantity,
				environment : $scope.tmp.animal.environment
			});
			$scope.tmp.animal = {};
		},
		/**
		 * remove animal from selection
		 */
		removeAnimal : function(index) {
			$scope.data.animals.splice(index, 1);
		},
		/**
		 * 
		 */
		buildProduct : function(){
			var q = $scope.tmp.product.quantity;
			$scope.tmp.product = findOne(products, 'name', $scope.tmp.product.name);
			$scope.tmp.product.quantity = q;
		},
		/**
		 * 
		 */
		addProduct : function() {
			$scope.data.products.push($scope.tmp.product);
			$scope.tmp.product = {};
		},
		/**
		 * 
		 */
		removeProduct : function(index) {
			$scope.data.products.splice(index, 1);
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
			$scope.data.lang = 'NR';
			$scope.data.age = 0;
			$scope.data.geoloc = 0;
			$scope.data.structure = 'NR';
			$scope.data.activity = {'bovine':'1.0'};
			/* /TMP */
			$http.post('/register', $scope.data)
			.success(function(data) {
				$scope.messages = messageService.log(data);
				// clear the form
				$scope.data = {};
			});
		},
		/**
		 * Login known user
		 */
		login : function() {
			$http.post('/login', $scope.data)
			.success(function(data) {
				$scope.messages = messageService.log(data);
				
				// retrieve user data
				$scope.user.username = $scope.data.username;
				$scope.user.token = data.token;
				// save user data in localStorageService
				lss.set('user_username', $scope.data.username);
				lss.set('user_token', data.token);
				
				// clear the form
				$scope.data = {};
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
		 * ui.showUserMenu, ça ne marche que comme ça... 
		 */
		getProfile : function(t){
			$scope.data.username = $scope.user.username;
			if(t=='open'){
				$http({
					method:'GET',
					url:'/profile',
					headers:{'x-access-token':$scope.user.token}})
					.success(function(data){
						$scope.messages = messageService.log(data);
						
						$scope.data = data;
						$scope.ui.showProfile = true;
					});
			}
			else{
				$scope.messages = messageService.log({message : $scope.lang['msg_no_change_saved'][$scope.l]});
					
				$scope.ui.showProfile = false;
				$scope.data = {};
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
				data:$scope.data})
				.success(function(data){
					$scope.messages = messageService.log(data);
					
					$scope.data = {};
					$scope.ui.showProfile = false;
			});
		}
	};

	$scope.alertMgt = {
			closeAlert : function(index) {
				$scope.messages.splice(index, 1);
			},
			clearAlerts : function() {
				console.log('clear !');
				$scope.messages.splice(0, $scope.messages.length);
			}
	};
	

	// ==== DATE PICKER ====
	$scope.today = function() {
		$scope.data.date_dispense = new Date();
	};
	$scope.today();
	$scope.clear = function () {
		$scope.data.date_dispense = null;
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
}]);