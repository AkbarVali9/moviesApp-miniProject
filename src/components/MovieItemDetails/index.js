import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import format from 'date-fns/format'
import Header from '../Header'
import MovieItem from '../MovieItem'
import FooterSection from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    movieDetailData: [],
    similarMovieDetailData: [],
    genresDetailData: [],
    spokenLanguageDetailData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieDetailData()
  }

  getMovieData = data => ({
    id: data.id,
    backdropPath: data.backdrop_path,
    overview: data.overview,
    posterPath: data.poster_path,
    title: data.title,
    adult: data.adult,
    budget: data.budget,
    releaseDate: data.release_date,
    runtime: data.runtime,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  getSimilarMoviesData = data => ({
    id: data.id,
    backdropPath: data.backdrop_path,
    posterPath: data.poster_path,
    title: data.title,
  })

  getGenresData = data => ({
    id: data.id,
    name: data.name,
  })

  getSpokenLanguageData = data => ({
    id: data.id,
    englishName: data.english_name,
  })

  getMovieDetailData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const movieDetailApiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(movieDetailApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedMovieData = this.getMovieData(fetchedData.movie_details)
      const genresData = fetchedData.movie_details.genres.map(eachData =>
        this.getGenresData(eachData),
      )
      const similarMovieData = fetchedData.movie_details.similar_movies.map(
        eachData => this.getSimilarMoviesData(eachData),
      )
      const spokenLanguageData = fetchedData.movie_details.spoken_languages.map(
        eachData => this.getSpokenLanguageData(eachData),
      )
      this.setState({
        movieDetailData: updatedMovieData,
        similarMovieDetailData: similarMovieData,
        genresDetailData: genresData,
        spokenLanguageDetailData: spokenLanguageData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  runtime = () => {
    const {movieDetailData} = this.state
    const hours = Math.floor(movieDetailData.runtime / 60)
    const minutes = Math.floor(movieDetailData.runtime) % 60

    return `${hours}h ${minutes}m`
  }

  releasedYear = () => {
    const {movieDetailData} = this.state
    const {releaseDate} = movieDetailData
    if (releaseDate !== undefined) {
      return format(new Date(releaseDate), 'yyyy')
    }
    return null
  }

  formattedDate = () => {
    const {movieDetailData} = this.state
    const {releaseDate} = movieDetailData
    if (releaseDate !== undefined) {
      return format(new Date(releaseDate), 'do MMMM yyyy')
    }
    return null
  }

  renderSuccessView = () => {
    const {
      movieDetailData,
      similarMovieDetailData,
      genresDetailData,
      spokenLanguageDetailData,
    } = this.state

    const censorRating = movieDetailData.adult ? 'A' : 'U/A'

    return (
      <div className="movie-detail-bg-container">
        <div
          style={{backgroundImage: `url(${movieDetailData.backdropPath})`}}
          className="bg-image"
        >
          <Header />
          <div className="movie-heading-container">
            <h1 className="poster-title">{movieDetailData.title}</h1>
            <div className="time-year-container">
              <p className="year-time">{this.runtime()}</p>
              <p className="censor-criteria">{censorRating}</p>
              <p className="year-time">{this.releasedYear()}</p>
            </div>
            <p className="poster-description">{movieDetailData.overview}</p>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>

        <div className="movie-detail-flex-container">
          <div className="movie-content-details">
            <h1 className="movie-content-title">Genres</h1>

            {genresDetailData.map(eachData => (
              <p className="movie-content-description" key={eachData.id}>
                {eachData.name}
              </p>
            ))}
          </div>
          <div className="movie-content-details">
            <h1 className="movie-content-title">Audio Available</h1>

            {spokenLanguageDetailData.map(eachData => (
              <p className="movie-content-description" key={eachData.id}>
                {eachData.englishName}
              </p>
            ))}
          </div>

          <div className="movie-content-details">
            <h1 className="movie-content-title">Rating Count</h1>
            <p className="movie-content-description">
              {movieDetailData.voteCount}
            </p>
            <h1 className="movie-content-title">Rating Average</h1>
            <p className="movie-content-description">
              {movieDetailData.voteAverage}
            </p>
          </div>
          <div className="movie-content-details">
            <h1 className="movie-content-title">Budget</h1>
            <p className="movie-content-description">
              {movieDetailData.budget}
            </p>
            <h1 className="movie-content-title">Release Date</h1>
            <p className="movie-content-description">{this.formattedDate()}</p>
          </div>
        </div>
        <div className="more-like-this-container">
          <h1 className="more-movies-title">More like this</h1>
          <ul className="more-movies-container">
            {similarMovieDetailData.map(eachData => (
              <MovieItem movieData={eachData} key={eachData.id} />
            ))}
          </ul>
        </div>

        <FooterSection />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="movie-detail-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="no-result-view-container">
      <img
        src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670002135/Movies%20App/Failure_l6kgfg.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getMovieDetailData}
      >
        Try Again
      </button>
    </div>
  )

  renderMovieDetailOutputView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return <>{this.renderMovieDetailOutputView()}</>
  }
}

export default MovieItemDetails
