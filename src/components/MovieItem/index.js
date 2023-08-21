import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieData} = props
  const {id, title, posterPath} = movieData

  return (
    <Link to={`/movies/${id}`}>
      <li className="movie-item">
        <img src={posterPath} alt={title} className="movie-item-image" />
      </li>
    </Link>
  )
}

export default MovieItem
