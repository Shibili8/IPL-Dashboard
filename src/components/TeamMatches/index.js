import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
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
    latestMatch: {},
    totalStatus: [],
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
      matchStatus: data.latest_match_details.match_status,
    }

    const recentMatchDetails = data.recent_matches.map(each => ({
      competingTeam: each.competing_team,
      id: each.id,
      competingTeamLogo: each.competing_team_logo,
      result: each.result,
      matchStatus: each.match_status,
    }))

    this.setState(
      {
        id,
        isLoading: false,
        coverPic: teamCoverPic,
        recentMatches: recentMatchDetails,
        latestMatch: latestMatchDetails,
      },
      this.getTotalCount,
    )
  }

  getTotalCount = () => {
    const {recentMatches, latestMatch} = this.state

    let wins = 0
    let losses = 0
    let draws = 0

    // Count recent matches
    recentMatches.forEach(each => {
      if (each.matchStatus === 'Won') {
        wins += 1
      } else if (each.matchStatus === 'Lost') {
        losses += 1
      } else {
        draws += 1
      }
    })

    // Count latest match
    if (latestMatch.matchStatus) {
      if (latestMatch.matchStatus === 'Won') {
        wins += 1
      } else if (latestMatch.matchStatus === 'Lost') {
        losses += 1
      } else {
        draws += 1
      }
    }

    const totalStatus = [
      {name: 'Wins', value: wins},
      {name: 'Losses', value: losses},
      {name: 'Draws', value: draws},
    ]

    this.setState({totalStatus})
  }

  onCLickBackButton = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderTeamMatch = () => {
    const {id, recentMatches, latestMatch, coverPic, totalStatus} = this.state

    const COLORS = ['#00C49F', '#FF4C4C', '#FFBB28']

    return (
      <div className={`tm-${id}`}>
        <img className="cover-pic" alt="team banner" src={coverPic} />
        <p className="sub-heading">Latest Matches</p>
        <LatestMatch key="latest" matchDetails={latestMatch} />

        
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={totalStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={120}
                label
              >
                {totalStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="match-card-container">
          {recentMatches.map(eachMatch => (
            <MatchCard key={eachMatch.id} recentDetails={eachMatch} />
          ))}
        </ul>

        <button
          type="button"
          data-testid="back"
          className="back-btn"
          onClick={this.onCLickBackButton}
        >
          Back
        </button>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

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
