import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {HiExternalLink} from 'react-icons/hi'
import Header from '../Header'
import Skills from '../Skills'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    similarJobsList: [],
    jobItemDetails: {},
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobsData = this.convertJobsDataToCamelCase(data.job_details)
      const updatedSimilarJobsList = data.similar_jobs.map(job =>
        this.convertSimilarJobToCamelCase(job),
      )

      this.setState({
        jobItemDetails: updatedJobsData,
        similarJobsList: updatedSimilarJobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  convertJobsDataToCamelCase = jobData => ({
    companyLogoUrl: jobData.company_logo_url,
    companyWebsiteUrl: jobData.company_website_url,
    employmentType: jobData.employment_type,
    id: jobData.id,
    jobDescription: jobData.job_description,
    lifeAtCompany: {
      description: jobData.life_at_company.description,
      imageUrl: jobData.life_at_company.image_url,
    },
    location: jobData.location,
    packagePerAnnum: jobData.package_per_annum,
    rating: jobData.rating,
    skills: jobData.skills.map(skill => ({
      imageUrl: skill.image_url,
      name: skill.name,
    })),
    title: jobData.title,
  })

  convertSimilarJobToCamelCase = similarjob => ({
    companyLogoUrl: similarjob.company_logo_url,
    employmentType: similarjob.employment_type,
    id: similarjob.id,
    jobDescription: similarjob.job_description,
    location: similarjob.location,
    rating: similarjob.rating,
    title: similarjob.title,
  })

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsSuccessView = () => {
    const {similarJobsList, jobItemDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobItemDetails
    return (
      <>
        <div className="job-item-details-container">
          <div className="job-item-details-logo-rating-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-item-details-company-logo"
            />
            <div className="job-item-details-title-rating-container">
              <h1 className="job-item-details-title">{title}</h1>
              <div className="job-item-details-rating-container">
                <BsFillStarFill className="job-item-details-star" />
                <p className="job-item-details-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-details-address-package-container">
            <div className="job-item-details-type-location-container">
              <MdLocationOn className="job-item-details-location-icon" />
              <p className="job-item-details-location">{location}</p>
            </div>
            <div className="job-item-details-type-location-container">
              <BsFillBriefcaseFill className="job-item-details-location-icon" />
              <p className="job-item-details-location">{employmentType}</p>
            </div>
            <p className="job-item-details-package">{packagePerAnnum}</p>
          </div>
          <hr className="job-item-details-separator" />
          <div className="job-item-details-description-container">
            <div className="job-item-details-description-link-container">
              <h1 className="job-item-details-description-title">
                Description
              </h1>
              <a href={companyWebsiteUrl} className="job-item-details-link">
                <p className="job-item-details-visit">Visit</p>
                <HiExternalLink className="job-item-details-link-icon" />
              </a>
            </div>
            <p className="job-item-details-description">{jobDescription}</p>
          </div>
          <div className="job-item-details-skills-container">
            <h1 className="job-item-details-skills">Skills</h1>
            <ul className="job-item-details-skills-list-container">
              {skills.map(skill => (
                <Skills key={skill.name} skill={skill} />
              ))}
            </ul>
          </div>
          <div className="job-item-details-life-container">
            <h1 className="job-item-details-life-title">Life at Company</h1>
            <div className="job-item-details-life-image-container">
              <p className="job-item-details-life-text">
                {lifeAtCompany.description}
              </p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="job-item-details-life-image"
              />
            </div>
          </div>
        </div>
        <div className="job-item-details-similar-container">
          <h1 className="job-item-details-similar-title">Similar Jobs</h1>
          <ul className="job-item-details-similar-list-container">
            {similarJobsList.map(similarJob => (
              <SimilarJobItem key={similarJob.id} similarJob={similarJob} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobDetailsFailureView = () => (
    <div className="job-details-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-details-failure-image"
      />
      <h1 className="job-details-failure-title">Oops! Something Went Wrong</h1>
      <p className="job-details-failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-details-failure-retry-btn"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="job-details-container">
          <div className="job-details-content-container">
            {this.renderJobDetails()}
          </div>
        </div>
      </div>
    )
  }
}
export default JobItemDetails
