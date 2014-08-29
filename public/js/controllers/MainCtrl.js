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
	$scope.years = [];

	
	//shortcuts
	lss = localStorageService;
	
	// $scope init
	$scope.reset = {
		data : function(){
			$scope.data = {
				school : {},
				animals : [],
				prescription : [],
				activity : [],
				volume : []
			};
		},
		tmp : function(){
			$scope.tmp = {
				animal:{},
				product:{},
				activity:{},
				volume : {}
			};
		},
		ui : function(){
			$scope.ui = {
				showProfile : false,
				showUserMenu : false,
				page : 'inclusion'
			}
		},
		user : function(){
			$scope.user = {
				username : lss.get('user_username'),
				token : lss.get('user_token'),
				_id : lss.get('user_id')
			};
		}
	};
	$scope.reset.data();
	$scope.reset.tmp();
	$scope.reset.ui();
	$scope.reset.user();

	// === EVENT WATCH ===
	$scope.$on('message.new', function(event){
		setTimeout($scope.alertMgt.clearAlerts, 5000);
	});
	
	
	// === DATA INCLUSION FUNCTIONS ===
	$scope.dataMgt = {
		/**
		 * Record a Treatment
		 */
		recordTreatment : function() {
			$scope.data.user = $scope.user;
			$scope.data.veterinary = $scope.user._id;
			console.log($scope.data);
			$http({
				method:'POST',
				url:'/api/treatment',
				headers:{'x-access-token':$scope.user.token},
				data:$scope.data})
			.success(function(data){
				$scope.messages = messageService.log(data);
				$scope.reset.data();
			});
		},
		/**
		 * 
		 */
		getTreatments : function() {
			console.log('get treatments for '+$scope.user._id);
			$http({
				method:'GET',
				url:'/api/treatment',
				headers:{'x-access-token':$scope.user.token, 'uid':$scope.user._id}
			})
			.success(function(data){
				$scope.messages = messageService.log(data);
				$scope.data = data;
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
			$scope.tmp.product = findOne(products, 'name', $scope.tmp.productName);
			$scope.tmp.product.quantity = q;
		},
		/**
		 * 
		 */
		addProduct : function() {
			$scope.data.prescription.push($scope.tmp.product);
			$scope.tmp.product = {};
			$scope.tmp.productName = undefined;
		},
		/**
		 * 
		 */
		removeProduct : function(index) {
			$scope.data.prescription.splice(index, 1);
		},
		/**
		 * 
		 */
		addActivity : function() {
			$scope.data.activity.push($scope.tmp.activity);
			$scope.tmp.activity = {};
		},
		/**
		 * 
		 */
		removeActivity : function(index) {
			$scope.data.activity.splice(index, 1);
		},
		/**
		 * Build and add the animal object from the selected value
		 */
		addVolume : function() {
			var animal = $scope.tmp.volume.raw.split('|');
			$scope.data.volume.push({
				species : animal[0],
				type : animal[1],
				age : animal[2],
				weight : animal[3],
				volume : $scope.tmp.volume.value,
			});
			$scope.tmp.volume = {};
		},
		/**
		 * remove animal from selection
		 */
		removeVolume : function(index) {
			$scope.data.Volume.splice(index, 1);
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
//			$scope.data.lang = 'NR';
//			$scope.data.age = 0;
//			$scope.data.geoloc = 0;
//			$scope.data.structure = 'NR';
//			$scope.data.activity = {'bovine':'1.0'};
			/* /TMP */
			$http.post('/register', $scope.data)
			.success(function(data) {
				$scope.messages = messageService.log(data);
				// clear the form
				$scope.reset.data();
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
				$scope.user._id = data._id;
				// save user data in localStorageService
				lss.set('user_username', $scope.data.username);
				lss.set('user_token', data.token);
				lss.set('user_id', data._id);
				
				// clear the form
				$scope.reset.data();
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
						for(i in data){
							$scope.data[i] = data[i];
						}
						$scope.ui.showProfile = true;
					});
			}
			else{
				$scope.messages = messageService.log({message : $scope.lang['msg_no_change_saved'][$scope.l]});
					
				$scope.ui.showProfile = false;
				$scope.reset.data();
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
					
					$scope.reset.data();
					$scope.ui.showProfile = false;
			});
		}
	};

	$scope.alertMgt = {
		closeAlert : function(index) {
			$scope.messages.splice(index, 1);
		},
		clearAlerts : function() {
			$scope.messages.splice(0, $scope.messages.length);
		}
	};
	

	// ==== DATE PICKER ====
	$scope.today = function() {
		$scope.today = new Date();
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
	for(var y=$scope.today.getFullYear() - 100; y<=$scope.today.getFullYear(); y++){
		$scope.years.push(y);
	}
	$scope.initDate = new Date('2016-15-20');
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[1];
	// END DATE
}]);