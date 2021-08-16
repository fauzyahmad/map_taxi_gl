const GET_TAXI_AVAILABILITY = 'https://api.data.gov.sg/v1/transport/taxi-availability?date_time=';
import regeneratorRuntime from "regenerator-runtime";


export const getTaxiAvailability = async(dateTime) => {
    try {
        let formatDateISO = dateTime.split('.')[0]
        let response = await fetch(GET_TAXI_AVAILABILITY+formatDateISO, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.geo+json"
            }
        });
        let responseData = await response.json();
        return responseData;
    } catch (error) {
        //error handling
        //console.log(error);
        return error;
    }
}