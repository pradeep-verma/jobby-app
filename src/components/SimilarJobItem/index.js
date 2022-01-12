import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobItem = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob
  return (
    <li className="similar-item-container">
      <div className="similar-item-logo-rating-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-item-company-logo"
        />
        <div className="similar-item-title-rating-container">
          <h1 className="similar-item-title">{title}</h1>
          <div className="similar-item-rating-container">
            <BsFillStarFill className="similar-item-star" />
            <p className="similar-item-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-item-description-title">Description</h1>
      <p className="similar-item-description-text">{jobDescription}</p>
      <div className="similar-item-address-container">
        <div className="similar-item-type-location-container">
          <MdLocationOn className="similar-item-location-icon" />
          <p className="similar-item-location">{location}</p>
        </div>
        <div className="similar-item-type-location-container">
          <BsFillBriefcaseFill className="similar-item-location-icon" />
          <p className="similar-item-location">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItem
