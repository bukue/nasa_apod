import { useEffect, useState, useCallback } from 'react';
import { buildNasaApodUrl } from '../utils/url'

export const useNasaApod = ({count})=>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true);

        fetch(buildNasaApodUrl({count}))
        .then((response) => response.json())
        .then((parsedResponse) => {
            parsedResponse.sort((a,b)=> a.date - b.date)
            setData(parsedResponse)
            setLoading(false);
        })
    }, [count]);

    const fetchMore = useCallback(
        ()=>{
            setLoading(true);

            fetch(buildNasaApodUrl({count, offset: data.length}))
            .then((response) => response.json())
            .then((parsedResponse) => {
                parsedResponse.sort((a,b)=> a.date - b.date)
                setData((prevData)=>{
                    return [...prevData, ...parsedResponse]
                });

                setLoading(false);
            })
        }
    , [count, data.length]);

    return {data, loading, fetchMore};
}