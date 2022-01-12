import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
    jobsList: [],
    userProfile: {},
    salaryRange: '',
    employmentType: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  onChangeSalaryRange = event => {
    this.setState({salaryRange: event.target.id}, this.getJobs)
  }

  onChangeEmploymentType = event => {
    const {employmentType} = this.state
    if (employmentType.includes(event.target.id)) {
      const updatedEmploymentType = employmentType.filter(
        eachType => eachType !== event.target.id,
      )
      this.setState({employmentType: updatedEmploymentType}, this.getJobs)
    } else {
      const updatedEmploymentType = employmentType.concat([event.target.id])
      this.setState({employmentType: updatedEmploymentType}, this.getJobs)
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = () => {
    this.getJobs()
  }

  convertProfileToCamelCase = userProfile => ({
    name: userProfile.name,
    profileImageUrl: userProfile.profile_image_url,
    shortBio: userProfile.short_bio,
  })

  convertJobsToCamelCase = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
    title: job.title,
  })

  getProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedUserProfile = this.convertProfileToCamelCase(
        data.profile_details,
      )
      this.setState({
        userProfile: updatedUserProfile,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const {salaryRange, employmentType, searchInput} = this.state
    const employments = employmentType.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employments}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const updatedJobsData = data.jobs.map(job =>
        this.convertJobsToCamelCase(job),
      )

      this.setState({
        jobsList: updatedJobsData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileSuccessView = () => {
    const {userProfile} = this.state
    const {name, profileImageUrl, shortBio} = userProfile
    return (
      <div className="jobs-profile-card">
        <img
          src={profileImageUrl}
          alt="profile"
          className="jobs-profile-image"
        />
        <h1 className="jobs-profile-name">{name}</h1>
        <p className="jobs-profile-designation">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="jobs-profile-failure">
      <button
        type="button"
        className="jobs-profile-retry-btn"
        onClick={this.getProfile}
      >
        Retry
      </button>
    </div>
  )

  renderEmploymentType = () => (
    <div className="jobs-type-container">
      <h1 className="jobs-type-title">Type of Employment</h1>
      <ul className="jobs-type-list">
        {employmentTypesList.map(eachType => (
          <li key={eachType.employmentTypeId} className="jobs-type-item">
            <input
              type="checkbox"
              id={eachType.employmentTypeId}
              onChange={this.onChangeEmploymentType}
            />
            <label
              htmlFor={eachType.employmentTypeId}
              className="jobs-type-label"
            >
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSalaryRange = () => (
    <div className="jobs-type-container">
      <h1 className="jobs-type-title">Salary Range</h1>
      <ul className="jobs-type-list">
        {salaryRangesList.map(salaryRange => (
          <li key={salaryRange.salaryRangeId} className="jobs-type-item">
            <input
              type="radio"
              name="salaryRange"
              id={salaryRange.salaryRangeId}
              onChange={this.onChangeSalaryRange}
            />
            <label
              htmlFor={salaryRange.salaryRangeId}
              className="jobs-type-label"
            >
              {salaryRange.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    return jobsList.length === 0 ? (
      <div className="jobs-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="jobs-failure-image"
        />
        <h1 className="jobs-failure-title">No Jobs Found</h1>
        <p className="jobs-failure-text">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    ) : (
      <ul className="jobs-list-container">
        {jobsList.map(job => (
          <JobItem job={job} key={job.id} />
        ))}
      </ul>
    )
  }

  renderJobsFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-title">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-failure-retry-btn"
        onClick={this.getJobs}
      >
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderJobs = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderLeftSide = () => {
    const {searchInput} = this.state
    return (
      <div className="jobs-left-container">
        <div className="jobs-search-container-sm">
          <input
            type="search"
            className="jobs-search-input"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
          <button
            type="button"
            testid="searchButton"
            className="jobs-search-btn"
            onClick={this.onClickSearchBtn}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {this.renderProfile()}
        <hr className="separator" />
        {this.renderEmploymentType()}
        <hr className="separator" />
        {this.renderSalaryRange()}
      </div>
    )
  }

  renderRightSide = () => {
    const {searchInput} = this.state
    return (
      <div className="jobs-right-container">
        <div className="jobs-search-container-lg">
          <input
            type="search"
            className="jobs-search-input"
            placeholder="Search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
          <button
            type="button"
            testid="searchButton"
            className="jobs-search-btn"
            onClick={this.onClickSearchBtn}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {this.renderJobs()}
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="jobs-container">
          <div className="jobs-content-container">
            {this.renderLeftSide()}
            {this.renderRightSide()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
