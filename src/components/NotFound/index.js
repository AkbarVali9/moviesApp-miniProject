import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <div className="not-found-content-container">
      <h1 className="not-found-title">Lost Your Way?</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/" className="route-link">
        <button type="button" className="go-home-button">
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
