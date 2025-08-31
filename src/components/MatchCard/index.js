import './index.css'

const MatchCard = props => {
  const {recentDetails} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = recentDetails
  const resultClass = matchStatus === 'Won' ? 'green-text' : 'red-text'

  return (
    <li className="match-card">
      <img
        className="team-logo"
        alt={`competing team ${competingTeam}`}
        src={competingTeamLogo}
      />
      <p className="team-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={resultClass}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
