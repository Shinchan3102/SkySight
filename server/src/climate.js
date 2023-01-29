const dotenv=require('dotenv');

dotenv.config();

//function to fetch the climatic conditions

const getClimate = async (page) => {
    //array containing the name of 30 cities
    const city = [
        "Delhi", "Mumbai", "Noida", "Lucknow", "Ranchi", "Dhanbad", "Bokaro", "Kanpur", "Patna", "Bengaluru",
        "Gwalior", "Jaipur", "Kota", "Pune", "Dehri", "Chennai", "Jamshedpur", "Jammu", "Goa", "Chandigarh",
        "Kolkata", "Hyderabad", "Haridwar", "Assam", "Gaya", "Gujarat", "Bhubaneshwar", "Kerala", "Vadodara", "Indore"
    ];

    const arrData = [];

    for (let i = (page - 1) * 10; i < page * 10; i++) {

        //fetching api
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=${process.env.API_ID}`);
        const data = await response.json();

        //adding the json data in the array
        arrData.push(data);
    }
    return arrData;
}

module.exports = getClimate;