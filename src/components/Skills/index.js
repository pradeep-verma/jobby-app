import './index.css'

const Skills = props => {
  const {skill} = props

  return (
    <li className="job-item-details-skill-item-container">
      <img
        src={skill.imageUrl}
        alt={skill.name}
        className="job-item-details-skill-image"
      />
      <p className="job-item-details-skill-name">{skill.name}</p>
    </li>
  )
}
export default Skills
