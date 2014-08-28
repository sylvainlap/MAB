function findOne(j,f,v){
	var r = [];
	for(i in j){
		if (j[i][f] === v){
			return j[i];
		}
	}
}
function print(j){
	return j;
}
