import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <div className="account-container" testid="account">
        <Header />
        <div className="account-container-2">
          <h1>
            Account
            <hr />
          </h1>

          <div className="account-element">
            <p className="header-element">Member ship</p>
            <div>
              <p className="mail">rahul@gmail.com</p>
              <p className="password">Password: ************ </p>
            </div>
          </div>
          <hr />

          <div className="account-element">
            <p className="header-element">Plan Details</p>
            <div>
              <p>Premium</p>
              <p className="ultra-hd">Ultra HD</p>
            </div>
          </div>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Account
