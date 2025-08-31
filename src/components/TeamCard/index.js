import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {name, id, teamImageUrl} = teamDetails

  return (
    <Link to={`/team-matches/${id}`} className="link-item">
      <li className="team-container">
        <img className="team-logo" alt={`${name}`} src={teamImageUrl} />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
