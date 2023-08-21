import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Trending from '../Trending'
import TopRated from '../TopRated'
import VideosSlider from '../VideosSlider'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {originalsData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getOriginalsData()
  }

  getOriginalsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const originalsApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(originalsApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        originalsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPosterSuccessView = () => {
    const {originalsData} = this.state
    const randomNumber = Math.floor(Math.random() * (originalsData.length - 1))
    const posterImage = originalsData[randomNumber]

    return (
      <div
        style={{backgroundImage: `url(${posterImage.backdropPath})`}}
        className="bg-image"
      >
        <Header />
        <div className="movie-heading-container">
          <h1 className="poster-title">{posterImage.title}</h1>
          <p className="poster-description">{posterImage.overview}</p>
          <button type="button" className="play-button">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderPosterLoadingView = () => (
    <div className="home-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderPosterFailureView = () => (
    <div className="poster-failure-view">
      <img
        src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670040709/Movies%20App/alert-triangle_sc1zom.png"
        alt="failure view"
        className="poster-failure-image"
      />
      <p className="failure-title">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-retry-button"
        onClick={this.getOriginalsData}
      >
        Try Again
      </button>
    </div>
  )

  renderPosterOutputView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPosterSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderPosterLoadingView()
      case apiStatusConstants.failure:
        return this.renderPosterFailureView()

      default:
        return null
    }
  }

  renderOriginalsLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderOriginalsSuccessView = () => {
    const {originalsData} = this.state
    return <VideosSlider videoData={originalsData} />
  }

  renderOriginalsFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670040709/Movies%20App/alert-triangle_sc1zom.png"
        alt="failure view"
        className="poster-failure-image"
      />
      <p className="failure-title">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-retry-button"
        onClick={this.getOriginalsData}
      >
        Try Again
      </button>
    </div>
  )

  renderOriginalsOutputView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOriginalsSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderOriginalsLoadingView()
      case apiStatusConstants.failure:
        return this.renderOriginalsFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="home-bg-container">
          {this.renderPosterOutputView()}

          <h1 className="section-title">Trending Now</h1>
          <div className="video-slider-container">
            <Trending />
          </div>
          <h1 className="section-title">Top Rated</h1>
          <div className="video-slider-container">
            <TopRated />
          </div>
          <h1 className="section-title">Originals</h1>
          <div className="video-slider-container">
            {this.renderOriginalsOutputView()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
