import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import './RecipeList.scss'

export default function RecipeList({ recipes }) {
    const { deleteRecipe } = useFetch(`http://localhost:3000/recipes`, 'DELETE')
    const deleteThisRecipe = (id) => {
        deleteRecipe(id)
    }

    if (recipes.length === 0) {
        return <div className="error">No recipes to load...</div>
    }
        return (
        <div className="recipe-list">
            {recipes.map(recipe => (
                <div key={recipe.id} className="card">
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make.</p>
                    <div>{recipe.method.substring(0, 100)}...</div>
                    <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
                    <button onClick={() => deleteThisRecipe(recipe.id)}>❌</button>
                </div>    
            ))}
        </div>
    )
}
