import { useState, useEffect } from 'react'
import { API_URL } from '../utils/constants';

function useCurrencyInfo(currency: string) {
    const dataObj: any = {};
    const [data, setData] = useState(dataObj);

    useEffect(() => {
        fetch(API_URL + `${currency}.json`)
            .then((response) => response.json())
            .then((response) => setData(response[currency]))
    }, [currency])

    return data;
}

export default useCurrencyInfo;