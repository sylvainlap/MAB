mabapp.controller('MainCtrl',[
	'$scope',
	'$http',
	'$timeout',
	'filterFilter',
	'messageService',
	function($scope, $http, $timeout, filterFilter,messageService) {

	//shortcuts
	lss = localStorage;

	// config load
	$scope.lang = lang;
	$scope.enums = enums;
	$scope.animals = animals;
	$scope.products = productsData;
	$scope.years = [];
	$scope.datePicker = {};
	$scope.sendingTreatment = false;
	

	// $scope init
	$scope.reset = {
		data : function(){
			$scope.data = {
				school : {},
				animals : [],
				prescription : [],
				activity : [],
				volume : [],
				date_dispense: new Date(),
				delivered : true
			};
		},
		tmp : function(){
			$scope.tmp = {
				animal:{
					environment:{},
					envControl:false,
				},
				product:{},
				species_list:[],
				activity:{},
				volume : {}
			};
			for(var e in enums['ani_environment']){
				$scope.tmp.animal.environment[enums['ani_environment'][e]] = false;
			}
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
				username : lss.user_username,
				codeCSO : lss.user_cso,
				token : lss.user_token,
				_id : lss.user_id,
				language : lss.user_l,
				favs : (lss.user_favs!=undefined)?JSON.parse(lss.user_favs):{}
			};
		},
		print : function(){
			$scope.print = {};
		}
	};
	
	// === DATA FILTER FUNCTIONS ===
	$scope.filterMgt = {
		products : {
			target : function(element){
				return (intersect_safe(element.target, $scope.tmp.species_list).length>0)?true:false;
			},
			notTarget : function(element){
				return (intersect_safe(element.target, $scope.tmp.species_list).length>0)?false:true;
			},
			clics : function(element){
				return (element.clics>0)?true:false;
			},
			noClics : function(element){
				return (element.clics>0)?false:true;	
			}
		}
	};
	// === DATA INCLUSION FUNCTIONS ===
	$scope.dataMgt = {
		updateLocalFavs : function(){
			if($scope.user.favs!=undefined){
				for(k in $scope.user.favs.products){
					updateOne($scope.products, 'name', k, 'clics', $scope.user.favs.products[k])
				}
				lss.user_favs = JSON.stringify($scope.user.favs);
			}
		},
		/**
		 * Record a Treatment
		 */
		recordTreatment : function() {
			$scope.sendingTreatment = true;
			
			$scope.data.user = $scope.user;
			$scope.data.veterinary = $scope.user._id;
			$http({
				method:'POST',
				url:'/api/treatment',
				headers:{'x-access-token':$scope.user.token},
				data:$scope.data})
			.success(function(data){
				$scope.messages = messageService.log(data);
				$http({
					method:'POST',
					url:'/user/profile',
					headers:{'x-access-token':$scope.user.token},
					data:$scope.user})
					.success(function(data){
						$scope.dataMgt.updateLocalFavs();
				});
				
				$scope.sendingTreatment = false;
			});
				
		},
		/**
		 * 
		 */
		getTreatments : function() {
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
		buildEnvControl : function() {
			var envControl = false;
			Object.keys($scope.tmp.animal.environment).forEach(function(k){
				envControl = envControl || $scope.tmp.animal.environment[k];
			});
			$scope.tmp.animal.envControl = envControl;
		},
		/**
		 * Build and add the animal object from the selected value
		 */
		addAnimal : function() {
			var animal = $scope.tmp.animal.raw.split('|');
			var environment = [];
			Object.keys($scope.tmp.animal.environment).forEach(function(k){
				if($scope.tmp.animal.environment[k]){
					environment.push(k);
				}
			});
			$scope.data.animals.push({
				species : animal[0],
				type : animal[1],
				age : animal[2],
				weight : animal[3],
				quantity : $scope.tmp.animal.quantity,
				environment : environment
			});
			$scope.tmp.animal = {environment:{}};
			for(var e in enums['ani_environment']){
				$scope.tmp.animal.environment[enums['ani_environment'][e]] = false;
			}
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
			// var buff = [];
			// for(var i in $scope.tmp.product){
			// 	buff[i] = $scope.tmp.product[i];
			// }
			$scope.tmp.product = findOne($scope.products, 'name', $scope.tmp.productName);
			// for(var i in $scope.tmp.product){
			// 	if(buff[i]!=undefined){
			// 		$scope.tmp.product[i] = buff[i];
			// 	}
			// }
		},
		/**
		 * 
		 */
		addProduct : function() {
			$scope.data.prescription.push($scope.tmp.product);

			if($scope.user.favs == undefined){
				$scope.user.favs = {
					products: {}
				};
			}
			if($scope.user.favs.products[$scope.tmp.productName]!=undefined){
				$scope.user.favs.products[$scope.tmp.productName] = $scope.user.favs.products[$scope.tmp.productName] +1; 
			}
			else{
				$scope.user.favs.products[$scope.tmp.productName] = 1;
			}
			
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
			$scope.data.volume.splice(index, 1);
		}
	};
	
	// === USER MANAGEMENT FUNCTIONS ===
	$scope.userMgt = {
		/**
		 * Disconnect current user
		 */
		logout : function() {
			$scope.user = {};
			lss.clear();
			$scope.messages = messageService.log({message : 'msg_on_logged_out'});
		},
		updatePagevet : function(){
			$http({
				method: 'GET',
					url:'/user/update/'+$scope.user.codeCSO,
					headers:{'x-access-token':$scope.user.token},
			})
			.success(function(data){
				$scope.messages = messageService.log(data);
				console.log(data);
			});
		},
		/**
		 * TODO : impossible de faire autrement... je voulais faire comme pour la gestion de
		 * ui.showUserMenu, ça ne marche que comme ça... 
		 */
		getProfile : function(t){
			if(t=='open'){
				$http({
					method:'GET',
					url:'/user/profile',
					headers:{'x-access-token':$scope.user.token}
				})
					.success(function(data){
						$scope.messages = messageService.log(data);
						for(i in data){
							$scope.data[i] = data[i];
						}
						$scope.ui.showProfile = true;
					});
			}
			else{
				$scope.messages = messageService.log({message : 'msg_no_change_saved'});
					
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
				url:'/user/profile',
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
	// === DEVICE DETECTION ===
	var uap = new UAParser();
	$scope.client = uap.getResult();
	$scope.client.screen = {
		ih : window.innerHeight,
		iw : window.innerWidth,
		ri : window.innerWidth/window.innerHeight,
		h : window.screen.height,
		w: window.screen.width,
		r : window.screen.width/window.screen.height
	};
	$scope.client.ok = true;
	
	// === WATCH ===
	$scope.$watch('data', function(){
		$scope.print.data = dump($scope.data);
	},true);
	$scope.$watch('tmp', function(){
		$scope.print.tmp = dump($scope.tmp);
	},true);
	$scope.$watch('user', function(){
		$scope.print.user = dump($scope.user);
	},true);
	$scope.$watch('products', function(){
		$scope.print.products = dump($scope.products);
	},true);
	$scope.$watch('data.animals', function(){
		$scope.tmp.species_list = [];
		for(var i in $scope.data.animals){
			var sp = $scope.data.animals[i]['species'].split('p_')[1];
			if($scope.tmp.species_list.indexOf(sp)<0){
				$scope.tmp.species_list.push(sp);
			}
		}
	}, true);

	// ==== INITIALISATIONS ====
	$scope.reset.data();
	$scope.reset.tmp();
	$scope.reset.ui();
	$scope.reset.user();
	$scope.reset.print();

	// ==== DATE PICKER ====
	$scope.today = function() {
		$scope.data.date_dispense = new Date();
		$scope.thisday = new Date();
	};
	$scope.today();

	$scope.clear = function () {
		$scope.date_dispense = null;
	};

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$timeout(function(){
			$scope.datePicker.opened = true;
		}, 50);
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1,
		formatDayTitle: 'MM/yy'
	};

	$scope.initDate = new Date('2016-15-20');
	$scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];

	for(var y=$scope.thisday.getFullYear() - 100; y<=$scope.thisday.getFullYear(); y++){
		$scope.years.push(y);
	}
	// END DATE


	// inject favs value in the product list
	$scope.dataMgt.updateLocalFavs();
	$scope.l = ($scope.user.language!='undefined'&&$scope.user.language!=undefined)?$scope.user.language:'FR';
}]);