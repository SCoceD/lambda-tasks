import axios from "axios";
import {PRIVAT_BANK_API} from "../constants/constants.js";

export default class ExchangeRate {
    async getUSDExchangeRate() {
        const response = await axios.get(PRIVAT_BANK_API);
        return `USD/UAH buy: ${response.data[0].buy}; sell: ${response.data[0].sale}`;
    }

    async getEURExchangeRate() {
        const response = await axios.get(PRIVAT_BANK_API);
        return `EUR/UAH buy: ${response.data[1].buy}; sell: ${response.data[1].sale}`;
    }
}
