var data = require('./data.js');

// ----- Weather data string(s) -----

var newArr = data.list.map(function (value) {
	return addEquals(value.name + ' ') + '\n' +
	value.weather[0].description + '\n' +
	'Temp: ' + toF(value.main.temp) + '\260' + 'F' + '\n' +
	'Lo: ' + toF(value.main.temp_min) + '\260' + 'F' + ', ' + 'Hi: ' + toF(value.main.temp_max) + '\260' + 'F' + '\n' +
	'Humidity: ' + value.main.humidity + '%' + '\n' +
	'Wind: ' + value.wind.speed + ' MPH ' + degreeConversion(value.wind.deg) + '\n' +
	addEquals('') + '\n';
});


newArr.sort();

var dataStr = newArr.join('');

console.log(dataStr);

function addEquals (name) {
	var numEquals = 30 - name.length;
	var result = '';
	for (var i = 0; i < numEquals; i++) {
		result += '='
	}
	return name + result;
}

function toF (kelvin) {
	var result = 0;
	result = kelvin * 9/5 - 459.67;
	return result.toFixed();
}


// ----- Temperature Average(s): -----

var mainTemp = data.list.map(function (value) {
	return toF(value.main.temp);
})

var mainMinTemp = data.list.map(function (value) {
	return toF(value.main.temp_min);
})

var mainMaxTemp = data.list.map(function (value) {
	return toF(value.main.temp_max);
})

var mainHumidity = data.list.map(function (value) {
	return value.main.humidity;
})

var windSpeed = data.list.map(function (value) {
	return value.wind.speed;
})

var windDirection = data.list.map(function (value) {
	return degreeConversion(value.wind.deg);
})

var windSpeedDirection = data.list.map(function (value) {
	return value.wind;
})


function avg (array) {
	var result = 0;
	for (var i = 0; i < array.length; i++) {
        result += parseInt(array[i]);
    }
    return result / array.length;
}

console.log(avg(mainTemp) + '\260' + 'F');
console.log(avg(mainMinTemp) + '\260' + 'F');
console.log(avg(mainMaxTemp) + '\260' + 'F');
console.log(avg(mainHumidity) + '%');
console.log(avg(windSpeed) + ' MPH ' + avg(windDirection));



// ----- Description with the most occurences: -----

var weatherDescription = data.list.map(function (value) {
	return value.weather[0].description;
})

// creating a new object to help determine the description with the most occurences
function mostOccurences(arr) {
	// creating a new object to push in property name and assign it a value
		var descOcc = {};
		// using forEach to go through each of the items in the array where a = the current element in the array 
    arr.forEach(function (a) {
    	// if the current elemet in the array is present in the object...
    	if (a in descOcc) {
    		// add to object and give it a value of 1... 
        	descOcc[a] += 1;
        } // if it has already occured just add to the value
        else {
        	descOcc[a] = 1;
        }
    });

    // finding the which description in the new object has the most occurences
    var highestOcc = Object.keys(descOcc).reduce(function(a, b){ // using object.keys() as a place holder for the ////descriptions in our object, then using reduce to turn the array into a single value.
    	if(descOcc[a] > descOcc[b]) {
    		return a;
    	} else {
    		return b;
    	} })
    
    
    return highestOcc;;

}

console.log(mostOccurences(weatherDescription));


// ----- Lowest/Highest Temp: -----


function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
	return Math.min.apply(null, numArray);
}



console.log(getMinOfArray(mainMinTemp) + '\260' + 'F', getMaxOfArray(mainMaxTemp) + '\260' + 'F');
console.log(getMinOfArray(mainHumidity) + '%', getMaxOfArray(mainHumidity) + '%');



// ----- Lowest/Highest Wind Speeds Including Direction: -----

var result = windSpeedDirection[0];

for(var i = 1; i < windSpeedDirection.length; i++) {
	if(windSpeedDirection[i].speed < result.speed) {
		result = windSpeedDirection[i];
	} 
	i++;
};

console.log(result.speed + ' MPH ' + degreeConversion(result.deg));

for(var i = 1; i < windSpeedDirection.length; i++) {
	if(windSpeedDirection[i].speed > result.speed) {
		result = windSpeedDirection[i];
	} 
	i++;
};

console.log(result.speed + ' MPH ' + degreeConversion(result.deg));


// ----- Degree Conversion -----

function degreeConversion (value) {
	if (value === 0) {
		return 'N';
	} else if (value > 0 && value < 90) {
		return 'NE';
	} else if (value === 90) {
		return 'E';
	} else if (value > 90 && value < 180) {
		return 'SE'
	} else if (value === 180) {
		return 'S';
	} else if (value > 180 && value < 270) {
		return 'SW';
	} else if (value === 270) {
		return 'W';
	} else if (value > 270 && (value <= 359)) {
		return 'NW';
	}
};


// need to complete:
// ----- Averages Object -----











	








	


