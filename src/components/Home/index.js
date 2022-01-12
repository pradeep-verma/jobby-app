import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="app-container">
    <Header />
    <div className="home-container">
      <div className="home-content-container">
        <h1 className="home-title">Find The Job That Fits Your Life</h1>
        <p className="home-text">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the jon that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="home-find-jobs-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)
export default Home
