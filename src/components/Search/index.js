import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItem from '../MovieItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noResult: 'NO_RESULT',
}

class Search extends Component {
  state = {
    searchInput: '',
    searchData: [],
    apiStatus: apiStatusConstants.initial,
  }

  getSearchApiData = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const searchApiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(searchApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      if (updatedData.length === 0) {
        this.setState({apiStatus: apiStatusConstants.noResult})
      } else {
        this.setState({
          searchData: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeSearchInput = value => {
    this.setState({searchInput: value})
  }

  renderSuccessView = () => {
    const {searchData} = this.state
    return (
      <ul className="search-list-container">
        {searchData.map(eachData => (
          <MovieItem movieData={eachData} key={eachData.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="search-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderNoResultView = () => {
    const {searchInput} = this.state

    return (
      <div className="no-result-view-container">
        <img
          src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670000784/Movies%20App/Not_Found_qfz2oz.png"
          alt="no movies"
          className="no-result-image"
        />
        <p className="no-result-text">
          {`
          Your search for ${searchInput} did not find any matches.`}
        </p>
      </div>
    )
  }

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
        onClick={this.getSearchApiData}
      >
        Try Again
      </button>
    </div>
  )

  renderOutputView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.noResult:
        return this.renderNoResultView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  renderHeader = () => (
    <Header
      changeSearchInput={this.changeSearchInput}
      getSearchApiData={this.getSearchApiData}
    />
  )

  render() {
    return (
      <>
        <div className="search-bg-container">
          {this.renderHeader()}
          {this.renderOutputView()}
        </div>
      </>
    )
  }
}

export default Search
