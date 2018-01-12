// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

const languageStrings = {
    'en': {
        'translation': {
            'WELCOME' : "Welcome to Davis City Guide!",
            'HELP'    : "You can say, about, to hear more about the city.",
            'OPTIONS' : "Try saying coffee, breakfast, lunch, or dinner, to hear a random restaurant suggestion. Say, recommend an attraction, or say, go outside. ",
            'ABOUT'   : "Davis is a city located in the Central Valley of California. It is home to over 65,000 people, not including the nearly 10,000 students attending UC Davis. Davis is proud of its mix of agriculture, and modern culture.",
            'STOP'    : "Okay, see you next time!"
        }
    }
    // , 'de-DE': { 'translation' : { 'TITLE'   : "Local Helfer etc." } }
};
const data = {
    city: "Davis",
    state: "CA",
    postcode: "95616",
    "restaurants": [
        { "name": "Burgers and Brew",
            "address": "403 3rd Street", "phone": "530-750-3600",
            "meals": "lunch, dinner",
            "description": "A popular downtown burger spot."
        },
        { "name": "Dumpling House",
            "address": "129 E Street", "phone": "530-753-7210",
            "meals": "lunch, dinner",
            "description": "A friendly Chinese restaurant in the heart of downtown."
        },
        { "name": "Sophia's Thai Kitchen",
            "address": "129 E Street", "phone": "530-758-4333",
            "meals": "lunch, dinner",
            "description": "A Thai restaurant with an adjacent bar and an outdoor deck for live indie music on the weekends."
        },
        { "name": "Davis Sushi Buffet",
            "address": "707 2nd Street", "phone": "530-297-1999",
            "meals": "lunch, dinner",
            "description": "An all-you-can-eat sushi boat bar, along with a regular full menu."
        },
        { "name": "Redrum Burger",
            "address": "978 Olive Drive", "phone": "530-756-2142",
            "meals": "lunch, dinner",
            "description": "A no-frills burger joint with excellent options for fast food and delicious milkshakes."
        },
        { "name": "Taqueria Davis",
            "address": "505 1/2 L Street", "phone": "530-758-8453",
            "meals": "lunch, dinner",
            "description": "Highly-rated authentic Mexican cuisine, home of the 49er Burrito and carne asada fries."
        },
        { "name": "Black Bear Diner",
            "address": "255 2nd Street", "phone": "530-756-4190",
            "meals": "breakfast, lunch, dinner",
            "description": "An all-day diner with hefty-sized portions and rustic countryside decor."
        },
        { "name": "In-N-Out Burger",
            "address": "1020 Olive Drive", "phone": "800-786-1000",
            "meals": "lunch, dinner",
            "description": "The popular California burger chain, home of the Double Double and Animal Fries."
        },
        { "name": "The Hotdogger",
            "address": "129 E Street", "phone": "530-753-6291",
            "meals": "lunch, dinner",
            "description": "A hole-in-the-wall hot dog shop with many delicious options."
        },
        { "name": "Woodstock's Pizza",
            "address": "219 G Street", "phone": "530-757-2525",
            "meals": "lunch, dinner",
            "description": "A popular downtown pizzeria that sells full pies, as well as by-the-slice. Also makes delicious cinnabread."
        },
        { "name": "Fluffy Donuts & Sandwich",
            "address": "757 Russell Boulevard", "phone": "530-756-2037",
            "meals": "breakfast, lunch",
            "description": "A close-to-campus shop that offers delicious fresh donuts, as well as authentic banh mi and Thai iced tea."
        },
        { "name": "Crepeville",
            "address": "330 3rd Street", "phone": "530-750-2400",
            "meals": "breakfast, lunch, dinner",
            "description": "A well-established crepe restaurant offering both sweet and savory crepes for all hours of the day."
        },
        { "name": "Dutch Bros Coffee",
            "address": "980 West Olive Drive", "phone": "530-312-6294",
            "meals": "coffee",
            "description": "A delicious drive-thru coffee shop just off of Interstate 80, open 24 hours."
        },
        { "name": "Common Grounds Coffee",
            "address": "2171 Cowell Boulevard", "phone": "530-792-1781",
            "meals": "coffee, breakfast",
            "description": "A spacious, comfortable atmosphere in South Davis to enjoy coffee and pastry, or to study."
        },
        { "name": "Philz Coffee",
            "address": "521 2nd Street", "phone": "530-231-5255",
            "meals": "coffee",
            "description": "A popular Bay Area-based coffee franchise that offers a variety of hot and cold brews made-to-order."
        },

    ],
    "attractions":[
        {
            "name": "UC Davis Arboretum",
            "description": "100 acres of beautiful gardens for active recreation or peaceful contemplation. The Arboretum gardens are open 24 hours a day, every day of the year, and there is no charge for admission.",
            "distance": "0"
        },
        {
            "name": "Mondavi Center",
            "description": "The Mondavi Center presents a rich program of diverse artists and thinkers in public performance; their mission is to steward and sustain a state-of-the-art venue for artists and audiences.",
            "distance": "0"
        },
        {
            "name": "Davis Farmers Market",
            "description": "Every Saturday from 8 to 1, and on warmer Wednesday afternoons at Central Park. Open year-round, rain or shine. Everything sold is either grown by or made by the seller.",
            "distance": "0"
        },
        {
            "name": "Davis Greenbelt",
            "description": "A nearly continuous stretch of parks and bike paths across north, south, east, and west Davis. More than sixty miles of greenbelt in a town of merely ten square miles, the greenbelt offers many pleasant places to walk, run, or ride your bike.",
            "distance": "0"
        },
        {
            "name": "John Natsoulas Gallery",
            "description": "Established over three decades ago, the John Natsoulas Gallery produces historical and high-profile exhibitions. They have published hundreds of artists’ catalogs and books, and also host educational conferences.",
            "distance": "0"
        },
        {
            "name": "Rocknasium",
            "description": "Over 5,500 square feet of vertical terrain, and offers training classes as well as equipment rentals.",
            "distance": "0"
        },
        {
            "name": "Varsity Theater",
            "description": "The Varsity Theatre is the place to go to see art house, foreign and independent films that are often not shown at the other theaters in town. They have two screens: The larger theater seats 270; the smaller seats 97, with stadium seating. The Varsity also has digital 3D projection capabilities.",
            "distance": "0"
        },

    ]
}

const SKILL_NAME = "Davis City Guide";

// Weather courtesy of the Yahoo Weather API.
// This free API recommends no more than 2000 calls per day

const myAPI = {
    host: 'query.yahooapis.com',
    port: 443,
    path: `/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(data.city)}%2C%20${data.state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`,
    method: 'GET'
};
// 2. Skill Code =======================================================================================================

const Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    let alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    ///alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        let say = this.t('WELCOME') + ' ' + this.t('HELP');
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'AboutIntent': function () {
        let say = this.t('ABOUT') + ' What else would you like to learn more about? ' + this.t('HELP');
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'SportsTeamIntent': function () {
        let say = '';
        let sportName = '';
        if (this.event.request.intent.slots.sport.value) {
            sportName = this.event.request.intent.slots.sport.value;
        } else {
            'Here are the local sports teams. The local basketball teams are the UC Davis Aggies and the Sacramento Kings. The local baseball teams are the UC Davis Aggies and the Sacramento River Cats. The local football team is the UC Davis Aggies. The local soccer teams are the UC Davis Aggies and the Sacramento Republic FC. ';
        }
        switch(sportName) {
        case 'basketball':
          say = 'The local basketball teams are the UC Davis Aggies and the Sacramento Kings.';
          break;
          case 'baseball':
          say = 'The local baseball teams are the UC Davis Aggies and the Sacramento River Cats.';
          break;
          case 'football':
          say = 'The local football team is the UC Davis Aggies.';
          break;
          case 'soccer':
          say = 'The local soccer teams are the UC Davis Aggies and the Sacramento Republic FC.';
          break;
          default:
          say = 'Please try again. You can ask which team plays either basketball, baseball, football, or soccer.';
        }
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'CoffeeIntent': function () {
        let restaurant = randomArrayElement(getRestaurantsByMeal('coffee'));
        this.attributes['restaurant'] = restaurant.name;

        let say = 'For great coffee, I recommend, ' + restaurant.name + '. Care to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'BreakfastIntent': function () {
        let restaurant = randomArrayElement(getRestaurantsByMeal('breakfast'));
        this.attributes['restaurant'] = restaurant.name;

        let say = 'For breakfast, try, ' + restaurant.name + '. Care to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'LunchIntent': function () {
        let restaurant = randomArrayElement(getRestaurantsByMeal('lunch'));
        this.attributes['restaurant'] = restaurant.name;

        let say = 'Lunch time! Here is a good spot. ' + restaurant.name + '. Care to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'DinnerIntent': function () {
        let restaurant = randomArrayElement(getRestaurantsByMeal('dinner'));
        this.attributes['restaurant'] = restaurant.name;

        let say = 'Enjoy dinner at, ' + restaurant.name + '. Care to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'AMAZON.YesIntent': function () {
        let restaurantName = this.attributes['restaurant'];
        let restaurantDetails = getRestaurantByName(restaurantName);

        let say = restaurantDetails.name
            + ' is located at ' + restaurantDetails.address
            + ', the phone number is ' + restaurantDetails.phone
            + ', here is what I know, ' + restaurantDetails.name + ' is ' + restaurantDetails.description
            + '  I have sent these details to the Alexa App on your phone. Enjoy your meal!' + ' What else would you like to know more about? ';

        let card = restaurantDetails.name + '\n' + restaurantDetails.address + '\n'
            + data.city + ', ' + data.state + ' ' + data.postcode
            + '\nPhone: ' + restaurantDetails.phone + '\n';

        this.response.cardRenderer(SKILL_NAME, card);
        this.response.speak(say).listen(say);
        this.emit(':responseReady');

    },

    'AttractionIntent': function () {
        let distance = 200;
        if (this.event.request.intent.slots.distance.value) {
            distance = this.event.request.intent.slots.distance.value;
        }

        let attraction = randomArrayElement(getAttractionsByDistance(distance));

        let say = 'Try visiting '
            + attraction.name + ', which is '
            + (attraction.distance == "0" ? 'right downtown. ' : attraction.distance + ' miles away from downtown Davis. ')
            + attraction.description;

        this.response.speak(say);
        this.emit(':responseReady');
    },

    'GoOutIntent': function () {

        getWeather( ( localTime, currentTemp, currentCondition) => {
            // time format 10:34 PM
            // currentTemp 72
            // currentCondition, e.g.  Sunny, Breezy, Thunderstorms, Showers, Rain, Partly Cloudy, Mostly Cloudy, Mostly Sunny

            // sample API URL for Irvine, CA
            // https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22irvine%2C%20ca%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys

            let say = 'It is ' + localTime
                + ' and the weather in ' + data.city
                + ' is '
                + currentTemp + ' and ' + currentCondition;
            this.response.speak(say);
            this.emit(':responseReady');

            // TODO
            // Decide, based on current time and weather conditions,
            // whether to go out to a local beach or park;
            // or recommend a movie theatre; or recommend staying home


        });
    },

    'AMAZON.NoIntent': function () {
        let say = 'OK. What else could I help you find? ' + this.t('OPTIONS')
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        this.response.speak(this.t('HELP')).listen(this.t('HELP'));
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(this.t('STOP'));
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.response.speak(this.t('STOP'));
        this.emit(':responseReady');
    }

};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function getRestaurantsByMeal(mealtype) {

    let list = [];
    for (let i = 0; i < data.restaurants.length; i++) {

        if(data.restaurants[i].meals.search(mealtype) >  -1) {
            list.push(data.restaurants[i]);
        }
    }
    return list;
}

function getRestaurantByName(restaurantName) {

    let restaurant = {};
    for (let i = 0; i < data.restaurants.length; i++) {

        if(data.restaurants[i].name == restaurantName) {
            restaurant = data.restaurants[i];
        }
    }
    return restaurant;
}

function getAttractionsByDistance(maxDistance) {

    let list = [];

    for (let i = 0; i < data.attractions.length; i++) {

        if(parseInt(data.attractions[i].distance) <= maxDistance) {
            list.push(data.attractions[i]);
        }
    }
    return list;
}

function getWeather(callback) {
    let https = require('https');


    let req = https.request(myAPI, res => {
        res.setEncoding('utf8');
        let returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });
        res.on('end', () => {
            let channelObj = JSON.parse(returnData).query.results.channel;

            let localTime = channelObj.lastBuildDate.toString();
            localTime = localTime.substring(17, 25).trim();

            let currentTemp = channelObj.item.condition.temp;

            let currentCondition = channelObj.item.condition.text;

            callback(localTime, currentTemp, currentCondition);

        });

    });
    req.end();
}
function randomArrayElement(array) {
    let i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}
