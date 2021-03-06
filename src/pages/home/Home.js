import { useFetch } from '../../hooks/useFetch';
import RecipeList from '../../components/RecipeList'
import './Home.scss';

export default function Home() {
    const { data, isPending, error } = useFetch('https://my-recipes-api-server.herokuapp.com/recipes');
    
    return (
        <div className="home">
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    )
}
