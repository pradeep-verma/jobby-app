import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
        <ul className="nav-link-container">
          <li>
            <Link to="/" className="nav-link">
              <p className="nav-link-item-lg">Home</p>
              <AiFillHome className="nav-link-icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              <p className="nav-link-item-lg">Jobs</p>
              <BsFillBriefcaseFill className="nav-link-icon" />
            </Link>
          </li>
          <li>
            <FiLogOut className="logout-icon" onClick={onClickLogout} />
          </li>
        </ul>
        <button type="button" className="logout-btn-lg" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
