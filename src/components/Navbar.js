import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import './Navbar.scss';

export default function Navbar() {
    return (
        <div className="navbar">
            <nav>
                <Link className="brand" to="/">
                <h1>CookBook</h1>
                </Link>
                <Searchbar />
                <Link to="/create">Create Recipe</Link>
            </nav>
        </div>
    )
}
