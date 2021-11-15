import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const useFetch = (url, method = "GET") => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState(null)
    const history = useHistory()
    
    const postData = (postData) => {
        setOptions({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
    }

    const deleteRecipe = (id) => {
        setOptions({
            method: "DELETE",
            id
        })
        return;    
    }


    useEffect(() => {
        const controller = new AbortController()
    
        const fetchData = async (fetchOptions) => {
            setIsPending(true)
            try {
                const res = await fetch(url, { ...fetchOptions, signal: controller.signal })
                if(!res.ok) {
                    throw new Error(res.statusText)
                   
                }
                const data = await res.json()
                setIsPending(false)
                setData(data)
                setError(null)
                if (fetchOptions && fetchOptions.method === 'DELETE') {
                    console.log(fetchOptions)
                    history.push('/');
                } 
            } catch (err) {
                console.log(err)
                if (err.name === 'AbortError') {
                    console.log('the fetch was aborted')
                } else {
                    setIsPending(false)
                    setError("Could not fetch data")
                }
            }
             
        }

        if (method === 'GET') fetchData();
        if (method === 'POST' && options) fetchData(options);
        if (method === 'DELETE') fetchData(options);

        return () => {
            controller.abort()
        }
    }, [url, method, options, history])

    return { data, error, isPending, postData, deleteRecipe }
}
