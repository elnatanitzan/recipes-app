import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import './Recipe.scss'

export default function Recipe() {
    
    const { id } = useParams()
    const url = `https://my-recipes-api-server.herokuapp.com/recipes/${id}`
    const { error, isPending, data: recipe } = useFetch(url)
    const { deleteRecipe } = useFetch(url, 'DELETE')

    const deleteThisRecipe = () => {
        deleteRecipe(id)
        alert('Recipe deleted!')
    }

    return (
        <div className="recipe">
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {recipe && (
                <>
                    <h2 className="page-title">{recipe.title}</h2>
                    <p className="time-to-cook">Tasks {recipe.cookingTime} to cook.</p>
                    <ul>
                        {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                    </ul>
                    <p className="method">{recipe.method}</p>
                    <button onClick={() =>  deleteThisRecipe()}>Delete</button>
                </>
            )}
        </div>
    )
}
