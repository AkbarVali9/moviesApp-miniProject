import {Switch, Route, Redirect} from 'react-router-dom'
import LoginRoute from './components/Login'
import HomeSection from './components/Home'
import PopularSection from './components/Popular'
import AccountSection from './components/Account'
import SearchRoute from './components/Search'
import MovieItemDetails from './components/MovieItemDetails'
import NotFound from './components/NotFound/index'
import ProtectedRoute from './components/ProtectedRoute/index'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeSection} />
    <ProtectedRoute exact path="/popular" component={PopularSection} />
    <ProtectedRoute exact path="/account" component={AccountSection} />
    <ProtectedRoute exact path="/search" component={SearchRoute} />
    <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
