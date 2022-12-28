import { APOD_URL, NASA_API_KEY } from "../constants"
import moment from "moment";

export const buildNasaApodUrl = ({count, offset}) => {
    const params = {
        api_key: NASA_API_KEY,
        start_date: moment().subtract(count, 'days').format('YYYY-MM-DD'),
        thumbs: true
    }

    const paramsWithOffset ={
        ...params,
        end_date: moment().subtract(offset, 'days').format('YYYY-MM-DD'),
        start_date: moment().subtract(count+offset, 'days').format('YYYY-MM-DD'),
    }

    return `${APOD_URL}?${new URLSearchParams(offset ? paramsWithOffset : params)}`
}