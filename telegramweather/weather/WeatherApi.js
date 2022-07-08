import axios from "axios";
import {NAMES_OF_DAYS, NAMES_OF_MONTH} from "../constants/constants.js";

const API_TOKEN = '06ba3a69594677b1347abe932fe58353';

export default class WeatherApi {
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
    }

    async getWeather() {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${API_TOKEN}&units=metric&lang=en`);
        return response.data.list;
    }

    async get3HoursWeather() {
        const list3HourResponse = await this.getWeather();
        let result = ``;
        let tempDay = NAMES_OF_DAYS[new Date(list3HourResponse[0].dt_txt).getDay()]
        list3HourResponse.forEach((item) => {
            const date = new Date(item.dt_txt);
            if (tempDay !== NAMES_OF_DAYS[date.getDay()] || result === '') {
                result += NAMES_OF_DAYS[date.getDay()]
                    + date.getDate()
                    + ' ' + NAMES_OF_MONTH[date.getMonth()] + ':\n';
                tempDay = NAMES_OF_DAYS[date.getDay()];
            }
            result += date.toString().split(' ')[4].substr(0, 5)
                + `, ${item.main.temp} ˚C, feels like: ${item.main.feels_like} ˚C, ${item.weather[0].description}`
                + '\n';
        });
        return result;
    }

    async get6HoursWeather() {
        const list3HourResponse = await this.getWeather();
        let result = ``;
        let tempDay = NAMES_OF_DAYS[new Date(list3HourResponse[0].dt_txt).getDay()]
        list3HourResponse.forEach((item, index) => {
            if (index / 2 === 0) return;
            const date = new Date(item.dt_txt);
            if (tempDay !== NAMES_OF_DAYS[date.getDay()] || result === '') {
                result += NAMES_OF_DAYS[date.getDay()]
                    + date.getDate()
                    + ' ' + NAMES_OF_MONTH[date.getMonth()] + ':\n';
                tempDay = NAMES_OF_DAYS[date.getDay()];
            }
            result += date.toString().split(' ')[4].substr(0, 5)
                + `, ${item.main.temp} ˚C, feels like: ${item.main.feels_like} ˚C, ${item.weather[0].description}`
                + '\n';
        });
        return result;
    }
}
