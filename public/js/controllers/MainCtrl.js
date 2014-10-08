mabapp.controller('MainCtrl',[
	'$scope',
	'$http',
	'$timeout',
	'filterFilter',
	'messageService',
	function($scope, $http, $timeout, filterFilter,messageService) {

	// =================
	// === SHORTCUTS ===
	lss = localStorage;

	// ======================
	// === CONFIG LOADING ===
	$scope.lang = lang;
	$scope.enums = enums;
	$scope.animals = animals;
	$scope.products = productsData;

	// ========================
	// === DEVICE DETECTION ===
	// ========================
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
	
	
	// +------------------------------------------------------------------------------------------------------------------------+
	// | +--------------------------------------------------------------------------------------------------------------------+ |
	// | |   											~<( FUNCTION DEFINITIONS )>~										  | |
	// | +--------------------------------------------------------------------------------------------------------------------+ |
	// +------------------------------------------------------------------------------------------------------------------------+
	

	// ============================
	// === INIT/RESET FUNCTIONS ===
	// ============================
	$scope.reset = {
		/**
		 *	Init DATA.
		 *	DATA object stores form data in order to send it to the api
		 */
		data : function(){
			$scope.data = {};
			$scope.data = {
				school : {},
				animals : [],
				prescription : [],
				activity : [],
				volume : [],
				date_dispense: new Date()
			};
		},
		/**
		 *	Init TMP.
		 *	TMP object stores temporary data used in some DATA fields construction
		 */
		tmp : function(){
			$scope.tmp = {};
			$scope.tmp = {
				animal:{
					environment:{},
					envControl:false,
				},
				product:{
					delivered : true
				},
				species_list:[],
				activity:{},
				volume : {}
			};
			for(var e in enums['ani_environment']){
				$scope.tmp.animal.environment[enums['ani_environment'][e]] = false;
			}
		},
		/**
		 *	Init UI.
		 *	UI object contains informations on the display of the app page
		 */
		ui : function(){
			$scope.ui = {};
			$scope.ui = {
				showProfile : false,
				showUserMenu : false,
				page : 'inclusion'
			}
		},
		/**
		 *	Init USER.
		 *	USER object stores user informations
		 */
		user : function(){
			$scope.user = {};
			$scope.user = {
				username : lss.user_username,
				codeCSO : lss.user_cso,
				token : lss.user_token,
				_id : lss.user_id,
				language : lss.user_l,
				favs : ((lss.user_favs!=undefined)&&(lss.user_favs!='undefined'))?JSON.parse(lss.user_favs):{}
			};
		}
	};
	
	// =============================
	// === DATA FILTER FUNCTIONS ===
	// =============================
	$scope.filterMgt = {
		products : {
			/** 
			 *	@return	TRUE if the product.target match with the species selected
			 */
			target : function(element){
				return (intersect(element.target, $scope.tmp.species_list).length>0)?true:false;
			},
			/** 
			 *	@return	TRUE if the product.target doesn’t match the species selected	
			 */
			notTarget : function(element){
				return (intersect(element.target, $scope.tmp.species_list).length>0)?false:true;
			},
			/** 
			 *	@return	TRUE if the products has some clics (which means it’s in the user.favs)
			 */
			clics : function(element){
				return (element.clics>0)?true:false;
			},
			/** 
			 *	@return	TRUE if the products hasn’t any clic (which means it isn’t in the user.favs)	
			 */
			noClics : function(element){
				return (element.clics>0)?false:true;	
			}
		}
	};

	// ================================
	// === DATA INCLUSION FUNCTIONS ===
	// ================================
	$scope.dataMgt = {
		/**
		 *	Updates the product.clics in the local products list (in the select).
		 *	Updates the localStorage.user_favs
		 */
		updateLocalFavs : function(){
			if($scope.user.favs != undefined){
				for(k in $scope.user.favs.products){
					updateOne($scope.products, 'name', k, 'clics', $scope.user.favs.products[k])
				}
				lss.user_favs = JSON.stringify($scope.user.favs);
			}
		},
		/**
		 * 	Record the current Treatment (DATA object)
		 *	Update the user(.favs) in distant DB
		 *	Update the local favs (@call updateLocalFavs)
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
						$scope.reset.data();
				});
				
				$scope.sendingTreatment = false;
			});
				
		},
		/**
		 * 	Get all the current user’s stored treatments. All the treatments are stored in the DATA object
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
		/**
		 *	Check if one of the environment checkbox is checked.
		 */
		buildEnvControl : function() {
			var envControl = false;
			Object.keys($scope.tmp.animal.environment).forEach(function(k){
				envControl = envControl || $scope.tmp.animal.environment[k];
			});
			$scope.tmp.animal.envControl = envControl;
		},
		/**
		 *	Build and add the tmp.animal object into the data.animals list
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
		 *	remove animal from selection (data.animals)
		 */
		removeAnimal : function(index) {
			$scope.data.animals.splice(index, 1);
		},
		/**
		 *	Get the product object from the local product list, matching its name
		 */
		buildProduct : function(){
			$scope.tmp.product = findOne($scope.products, 'name', $scope.tmp.productName);
			$scope.tmp.product.delivered = true;
		},
		/**
		 *	Build and add the tmp.product object into the data.prescription list
		 *	Update the user.favs
		 */
		addProduct : function() {
			var dur = $scope.tmp.product.duration;
			$scope.tmp.product.duration = (dur==undefined)?0:dur;
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
		 *	Remove a product from selection (data.prescription)
		 */
		removeProduct : function(index) {
			$scope.data.prescription.splice(index, 1);
		},
		/**
		 *	Add the tmp.activity in the data.activity list
		 */
		addActivity : function() {
			$scope.data.activity.push($scope.tmp.activity);
			$scope.tmp.activity = {};
		},
		/**
		 *	Remove an activity from the selection (data.activity)
		 */
		removeActivity : function(index) {
			$scope.data.activity.splice(index, 1);
		},
		/**
		 * Build and add the volume object in the data.volume list
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
		 * Remove a volume from selection
		 */
		removeVolume : function(index) {
			$scope.data.volume.splice(index, 1);
		}
	};
	
	// =================================
	// === USER MANAGEMENT FUNCTIONS ===
	// =================================
	$scope.userMgt = {
		/**
		 *	Disconnect current user
		 */
		logout : function() {
			$scope.user = {};
			lss.clear();
			$scope.messages = messageService.log({message : 'msg_on_logged_out'});
		},
		/**
		 *	GET the Pagevet information in the user profile
		 */
		updatePagevet : function(){
			$scope.updatingPagevetInfo = true;
			$http({
				method: 'GET',
					url:'/user/update/'+$scope.user.codeCSO,
					headers:{'x-access-token':$scope.user.token},
			})
			.success(function(data){
				$scope.messages = messageService.log(data);
				console.log(data);
				$scope.updatingPagevetInfo = false;
			});
		},
		/**
		 *	Show the profile page and get profile data from the DB
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
		 *	Update the user profile in DB and close profile page.
		 */
		updateProfile : function() {
			$scope.updatingProfile = true;
			$http({
				method:'POST',
				url:'/user/profile',
				headers:{'x-access-token':$scope.user.token},
				data:$scope.data})
				.success(function(data){
					$scope.messages = messageService.log(data);
					
					$scope.reset.data();
					$scope.updatingProfile = false;
					$scope.ui.showProfile = false;
			});
		}
	};

	// ===========================
	// === ALERT MGT FUNCTIONS ===
	// ===========================
	$scope.alertMgt = {
		/**
		 *	Close the current alert (clic on the cross)
		 */
		closeAlert : function(index) {
			$scope.messages.splice(index, 1);
		},
		/**
		 *	Close all alerts
		 */
		clearAlerts : function() {
			$scope.messages.splice(0, $scope.messages.length);
		}
	};


	// +------------------------------------------------------------------------------------------------------------------------+
	// | +--------------------------------------------------------------------------------------------------------------------+ |
	// | |   											~<( INITIALISATIONS AND CALLS )>~									  | |
	// | +--------------------------------------------------------------------------------------------------------------------+ |
	// +------------------------------------------------------------------------------------------------------------------------+


	// ===========================
	// === $WATCH DECLARATIONS ===
	$scope.$watch('data.animals', function(){
		$scope.tmp.species_list = [];
		for(var i in $scope.data.animals){
			var sp = $scope.data.animals[i]['species'].split('p_')[1];
			if($scope.tmp.species_list.indexOf(sp)<0){
				$scope.tmp.species_list.push(sp);
			}
		}
	}, true);

	// =======================
	// === INITIALISATIONS ===
	$scope.sendingTreatment = false;
	$scope.updatingPagevetInfo = false;
	$scope.updatingProfile = false;
	$scope.reset.data();
	$scope.reset.tmp();
	$scope.reset.ui();
	$scope.reset.user();
	$scope.dataMgt.updateLocalFavs();
	$scope.l = (($scope.user.language != 'undefined') && ($scope.user.language != undefined))?$scope.user.language:'FR';

	// ===================
	// === DATE PICKER ===
	$scope.today = function() {
		$scope.data.date_dispense = new Date();
		$scope.thisday = new Date();
	};
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

	$scope.years = [];
	$scope.datePicker = {};
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1,
		formatDayTitle: 'MM/yy'
	};
	$scope.initDate = new Date('2016-15-20');
	$scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
	$scope.today();
	for(var y=$scope.thisday.getFullYear() - 100; y<=$scope.thisday.getFullYear(); y++){
		$scope.years.push(y);
	}
	// === END DATE PICKER ===
	// =======================
}]);