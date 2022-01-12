import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = job

  return (
    <Link to={`/jobs/${id}`} className="job-item-link-class">
      <li className="job-item-container">
        <div className="job-item-logo-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-item-company-logo"
          />
          <div className="job-item-title-rating-container">
            <h1 className="job-item-title">{title}</h1>
            <div className="job-item-rating-container">
              <BsFillStarFill className="job-item-star" />
              <p className="job-item-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-item-address-package-container">
          <div className="job-item-type-location-container">
            <MdLocationOn className="job-item-location-icon" />
            <p className="job-item-location">{location}</p>
          </div>
          <div className="job-item-type-location-container">
            <BsFillBriefcaseFill className="job-item-location-icon" />
            <p className="job-item-location">{employmentType}</p>
          </div>
          <p className="job-item-package">{packagePerAnnum}</p>
        </div>
        <hr className="job-item-separator" />
        <h1 className="job-item-description-title">Description</h1>
        <p className="job-item-description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobItem
