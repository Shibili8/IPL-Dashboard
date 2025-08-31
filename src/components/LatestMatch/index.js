import './index.css'

const LatestMatch = props => {
  const {matchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    manOfTheMatch,
    result,
    secondInnings,
    umpires,
    venue,
  } = matchDetails

  return (
    <div className="latest-match-container">
      <div className="container-1">
        <p className="team-name">{competingTeam}</p>
        <p className="date">{date}</p>
        <p className="venue">{venue}</p>
        <p className="result">{result}</p>
      </div>
      <img
        className="team-logo"
        alt={`latest match ${competingTeam}`}
        src={competingTeamLogo}
      />
      <div className="container-2">
        <p className="sub-headings">First Innings</p>
        <p className="sub-headings-reply">{firstInnings}</p>
        <p className="sub-headings">Second Innings</p>
        <p className="sub-headings-reply">{secondInnings}</p>
        <p className="sub-headings man-of-the-match">Man of The Match</p>
        <p className="sub-headings-reply man-of-the-match-reply">
          {manOfTheMatch}
        </p>
        <p className="sub-headings">Umpires</p>
        <p className="sub-headings-reply">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
