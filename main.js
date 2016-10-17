var data = require('./data.js');

// ----- Weather data string(s) -----

function weatherInfo (obj) {
	return addEquals(obj.name + ' ') + '\n' +
		obj.weather[0].description + '\n' +
		'Temp: ' + toF(obj.main.temp) + '\260' + 'F' + '\n' +
		'Lo: ' + toF(obj.main.temp_min) + '\260' + 'F' + ', ' + 'Hi: ' + toF(obj.main.temp_max) + '\260' + 'F' + '\n' +
		'Humidity: ' + obj.main.humidity + '%' + '\n' +
		'Wind: ' + obj.wind.speed + ' MPH ' + degreeConversion(obj.wind.deg) + '\n' +
		addEquals('') + '\n';
}

var newArr = data.list.map(weatherInfo);

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
	return value.main.temp;
})

var mainMinTemp = data.list.map(function (value) {
	return value.main.temp_min;
})

var mainMaxTemp = data.list.map(function (value) {
	return value.main.temp_max;
})

var mainHumidity = data.list.map(function (value) {
	return value.main.humidity;
})

var windSpeed = data.list.map(function (value) {
	return value.wind.speed;
})

var windDirection = data.list.map(function (value) {
	return value.wind.deg;
})


function avg (array) {
	var result = 0;
	for (var i = 0; i < array.length; i++) {
        result += array[i];
    }
    return result / array.length;
}

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
    	}
    });
    
    
    return highestOcc;;

}

var averages = {
	name: 'Averages',
	main: {
		temp: avg(mainTemp),
		temp_min: avg(mainMinTemp),
		temp_max: avg(mainMaxTemp),
		humidity: avg(mainHumidity)
	},
	wind: {
		speed: avg(windSpeed),
		deg: avg(windDirection)
	},
	weather: [
		{
			description: mostOccurences(weatherDescription)
		}
	]
};

console.log(weatherInfo(averages));

// ----- Lowest/Highest Temp: -----


function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
	return Math.min.apply(null, numArray);
}



console.log(toF(getMinOfArray(mainMinTemp)) + '\260' + 'F', toF(getMaxOfArray(mainMaxTemp)) + '\260' + 'F');
console.log(getMinOfArray(mainHumidity) + '%', getMaxOfArray(mainHumidity) + '%');



// ----- Lowest/Highest Wind Speeds Including Direction: -----

var maxWindLocation = data.list.reduce(function (prev, next) {
	if (prev.wind.speed < next.wind.speed) {
		return next;
	}
	return prev;
});

var minWindLocation = data.list.reduce(function (prev, next) {
	if (prev.wind.speed > next.wind.speed) {
		return next;
	}
	return prev;
});

console.log(maxWindLocation.wind.speed + ' MPH ' + degreeConversion(maxWindLocation.wind.deg));
console.log(minWindLocation.wind.speed + ' MPH ' + degreeConversion(minWindLocation.wind.deg));


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













	








	


