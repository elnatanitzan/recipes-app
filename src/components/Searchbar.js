import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Searchbar.scss';

export default function Searchbar() {
    const [term, setTerm] = useState('')
    const history = useHistory();

    const handleSubmit = (e) => {       
        e.target.value.length === 0 ? history.push('/') : setTimeout(() => { history.push(`/search?q=${term}`) }, 800);
    }

    return (
        <div className="searchbar">
            <form onKeyUp={handleSubmit}>
                <label htmlFor="search"></label>
                <input
                    id="search"
                    type="text"
                    onChange={(e) => setTerm(e.target.value)}
                    required
                    placeholder="Search Recipe..."
                />
            </form>
        </div>
    )
}
