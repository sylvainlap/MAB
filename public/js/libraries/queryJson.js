/**
 * @param j the json
 * @param f the field
 * @param v the value

 * @returns the object
 */
function findOne(j,f,v){
	var r = [];
	for(i in j){
		if (j[i][f] === v){
			return j[i];
		}
	}
}
/**
 * @param j the json
 * @param f the 'where' field 
 * @param v the 'where' value
 * @param nf the field to update 
 * @param nv the update value
 * 
 * @returns null
 */
function updateOne(j,f,v,nf,nv){
	for(i in j){
		if (j[i][f] === v){
			j[i][nf] = nv;
		}
	}
}

/**
 *	@param a: one array
 *	@param b: another
 *
 *	@returns Array: the exclusion (objects that aren’t common between a & b)
 */
function contains(a, obj) {
	var i = a.length;
	while (i--) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
}

/**
 *	@param a: one array
 *	@param b: another
 *
 *	@returns Array: the union of a & b
 */
function union(a, b){
	var result = b.slice();
	for(ai in a){
		if(!contains(result, a[ai])){
			result.push(a[ai]);
		}
	}
	return result.sort();
}

/**
 *	src : http://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
 *	@param a: one array
 *	@param b: another
 *
 *	@returns Array: the intersection (objects that are common between a & b)	
 */
function intersect(a, b)
{
  var ai=0, bi=0;
  var result = new Array();
  var sa = a.sort();
  var sb = b.sort();

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}

/**
 *	@param a: one array
 *	@param b: another
 *
 *	@returns Array: the exclusion (objects that aren’t common between a & b)	
 */
function exclude(a, b)
{
	var ai=0, bi=0;
	var result = new Array();
	var sa = a.sort();
	var sb = b.sort();

	while( ai < a.length && bi < b.length ){
		if (a[ai] < b[bi] ){ 
			result.push(a[ai]);
			ai++;
		}
		else if (a[ai] > b[bi] ){
			result.push(b[bi]);
			bi++;
		}
		else /* they're equal */
		{
			ai++;
			bi++;
		}
	}

	return result;
}

/**
 *	a print_r(php)-like	
 */
function printR(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' : {\n";
				dumped_text += printR(value,level+1) + level_padding + "}\n";
			} else {
				dumped_text += level_padding + "'" + item + "' : \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}
