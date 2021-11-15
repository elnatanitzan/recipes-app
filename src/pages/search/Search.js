import { useFetch } from "../../hooks/useFetch"
import { useLocation } from "react-router-dom"
import RecipeList from "../../components/RecipeList"
import './Search.css'

export default function Search() {
    const qureyString = useLocation().search
    const queryParams = new URLSearchParams(qureyString)
    const query = queryParams.get('q')

    const url = `https://my-recipes-api-server.herokuapp.com/recipes?q=${query}`
    const { data, isPending, error } = useFetch(url)

    return (
        <div className="search">
            <h2 className="page-title">Recipes including "{query}"</h2>
            {error && <p className="error">{error.message}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    )
}
