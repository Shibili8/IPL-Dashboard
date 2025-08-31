import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    id: '',
    coverPic: '',
    isLoading: true,
    recentMatches: [],
    latestMatch: [],
  }

  componentDidMount() {
    this.getTeamDetails()
  }

  getTeamDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const teamCoverPic = data.team_banner_url
    const latestMatchDetails = {
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      date: data.latest_match_details.date,
      firstInnings: data.latest_match_details.first_innings,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      result: data.latest_match_details.result,
      secondInnings: data.latest_match_details.second_innings,
      umpires: data.latest_match_details.umpires,
      venue: data.latest_match_details.venue,
    }
    const recentMatchDetails = data.recent_matches.map(each => ({
      competingTeam: each.competing_team,
      id: each.id,
      competingTeamLogo: each.competing_team_logo,
      result: each.result,
      matchStatus: each.match_status,
    }))
    this.setState({
      id,
      isLoading: false,
      coverPic: teamCoverPic,
      recentMatches: recentMatchDetails,
      latestMatch: latestMatchDetails,
    })
  }

  renderTeamMatch = () => {
    const {id, recentMatches, latestMatch, coverPic} = this.state

    return (
      <div className={`tm-${id}`}>
        <img className="cover-pic" alt="team banner" src={coverPic} />
        <p className="sub-heading">Latest Matches</p>
        <LatestMatch key="latest" matchDetails={latestMatch} />

        <ul className="match-card-container">
          {recentMatches.map(eachMatch => (
            <MatchCard key={eachMatch.id} recentDetails={eachMatch} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading, id} = this.state

    return (
      <div className="teamMatch-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamMatch()
        )}
      </div>
    )
  }
}

export default TeamMatches
