import { useEffect, useState } from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.github.com'
})


export function useApi<T = unknown>(url: string) {

    const [data, useData] = useState<T | null>(null)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState<Error | null>(null)


    useEffect(() => {
        api.get(url)
            .then(response => {
                useData(response.data);
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setIsFetching(false)
            })
    }, [])

    return { data, error, isFetching }
}