var Flight = (function () {
    var privateAttribute = new WeakMap()

    var airportsOfCities = new Map([
        ['Bangkok', ['Don Mueng', 'Suvannabhumi']],
        ['Paris', ['CDG']],
        ['', ['Don Mueng', 'Suvannabhumi', 'CDG']]
    ])

    var allAirports = ['Don Mueng', 'Suvannabhumi', 'CDG']

    function FlightConstructor() {
        var privateFlight = {
            price: 0,
            airline: '',
            fromAirport: '',
            toAirport: '',
            takeoffTime: '',
            landingTime: ''
        }
        privateAttribute.set(this, privateFlight)
    }

    FlightConstructor.prototype.setDetail = function (
            price,
            airline,
            fromAirport,
            toAirport,
            takeoffTime,
            landingTime
            ) {
        privateAttribute.get(this).price = price
        privateAttribute.get(this).airline = airline
        privateAttribute.get(this).fromAirport = fromAirport
        privateAttribute.get(this).toAirport = toAirport
        privateAttribute.get(this).takeoffTime = takeoffTime
        privateAttribute.get(this).landingTime = landingTime
    }

    FlightConstructor.prototype.show = function () {
        return (
                privateAttribute.get(this).price +
                ' ' +
                privateAttribute.get(this).airline +
                ' ' +
                privateAttribute.get(this).fromAirport +
                ' ' +
                privateAttribute.get(this).toAirport +
                ' ' +
                privateAttribute.get(this).takeoffTime +
                ' ' +
                privateAttribute.get(this).landingTime
                )
    }

    FlightConstructor.prototype.getAirportsOfCity = function (city) {
        console.log(city)
        if (airportsOfCities !== null) {
            console.log('not null')
            if (airportsOfCities.has(city)) {
                return airportsOfCities.get(city)
            } else {
                return null
            }
        } else {
            return null
        }
    }

    FlightConstructor.prototype.getAllDetails = function () {
        return privateAttribute.get(this)
    }

    return FlightConstructor
})()

var f = new Flight()
f.setDetail(
        2055,
        'El Al Israel Air',
        'BKK',
        'CDG',
        'September 7, 2016 6:00:00',
        'September 8, 2016 18:00:00'
        )

console.log(f.show())

// event handler
function setAllListOfAirports(listItemElm_ID) {
    var list = document.getElementById(listItemElm_ID)
    console.log(length)
}

function setAirports(listItemElm_ID, city) {
    var list = document.getElementById(listItemElm_ID)
    var airports = f.getAirportsOfCity(city)

    var input1 = document.getElementById('fromCity').value
    var input2 = document.getElementById('toCity').value
    var btn = document.getElementById('btn')

    console.log('airport:' + airports)

    if (input1 !== '' && input2 !== '') {
        btn.disabled = false
    } else {
        btn.disabled = true
    }

    if (airports !== null) {
        var length = list.length
        // console.log("list length: " + length)
        var select = list.selectedIndex
        console.log(select)

        var count = 0
        for (var i = 0; i < length; i++) {
            if (airports.includes(list[i].value)) {
                list[i].style.display = 'block'
                if (count === 0) {
                    list[select].innerHTML = list[i].value // select is selectedIndex and add same
                    console.log(list[select].value + '<------' + list[i].value)
                    count++
                }
            } else {
                list[i].style.display = 'none'
            }
        }
        for (var i = 0; i < airports.length; i++) {
            list[i].innerHTML = airports[i]
        }
    }
}


// angular 
var flightModule = angular.module('flightModule', [])


flightModule.config(['$qProvider', function($qProvider){
   $qProvider.errorOnUnhandledRejections(false);
}]);

flightModule.controller('searchCtrl', function ($scope, $window, $http) {
    $http.get('https://phiyawat-comsci.herokuapp.com/list').then(function (response) {
        $scope.listAirports = response.data
    })



    $scope.nextPage = function () {
        $window.location.href = 'detailFlight.html'
    }

    $scope.split = function (string, number) {
        var arr = string.split(',')
        return arr[number]
    }

    $scope.compareTime = function (takeOffHour, takeOffMinute, landingHour, landingMinute) {
        var hour = 0, minute = 0
        if ((takeOffMinute - landingMinute) < 0) {
            takeOffHour -= 1
            minute = (60 + takeOffMinute) - landingMinute
            if (takeOffHour > landingHour) {
                hour = takeOffHour - landingHour
            } else {
                hour = (takeOffHour + 24) - landingHour
            }
        } else {
            minute = takeOffMinute - landingMinute
            if (takeOffHour > landingHour) {
                hour = takeOffHour - landingHour
            } else {
                hour = (takeOffHour + 24) - landingHour
            }
        }
        return '(' + (hour + 5) + 'h ' + minute + 'm)'
    }

    $scope.showDate = function (day, month, year) {
        var date = new Date()
        date.setDate(day)
        date.setMonth(month - 1)
        date.setFullYear(year)
        var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        var pointer = ''
        if (date.getDate() > 3 && date.getDate() < 21) {
            pointer = 'th'
        }
        switch (date.getDate() % 10) {
            case 1:
                pointer = 'st'
            case 2:
                pointer = 'nd'
            case 3:
                pointer = 'rd'
            default:
                pointer = 'th'
        }
        return weekday[date.getDay()] + ', ' + month[date.getMonth()] + ' ' + date.getDate() + pointer + ', ' + date.getFullYear()
    }

    $scope.validateForm = function () {
        var input1 = document.getElementById('fromCity').value
        var input2 = document.getElementById('toCity').value
        if (
                input1 == '' ||
                input2 == '' ||
                ((input1 == 'Bangkok' && input2 == 'Bangkok') ||
                        (input1 == 'Paris' && input2 == 'Paris'))
                ) {
            $window.alert(input1)
            $window.alert(input2)
            return false
        } else {
            $window.alert(input1)
            $window.alert(input2)
            $scope.nextPage()
        }
    }


    $scope.totalPrice = function (check, total, price) {
        if (check % 2 == 0) {
            return total - price;
        } else {
            return total + price;
        }
    }

    $scope.createJSON = function (price, insurance, notification) {
        console.log("All json: " + price + " " + insurance + " " + notification);
               
        $scope.p = price;
        $scope.i = insurance;
        $scope.n = notification;
        
        var dataObj = {
            price : $scope.p,
            insurance : $scope.i,
            service : $scope.n           
        };
 
     
        $http.post('http://localhost:8080/myProject/rest/price', dataObj)
        .then(function(response){
           $scope.totalFlight = response.data; 
        })
        .catch(function(response){
            alert("failure message: " + JSON.stringify({data: response.data}))
        });
        
        $scope.p = "";
        $scope.i = "";
        $scope.n = "";
    
    }
})
