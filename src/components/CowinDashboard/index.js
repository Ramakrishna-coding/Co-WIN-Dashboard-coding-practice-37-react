import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusText = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusText.initial,
    last7DaysData: [],
    byGenderList: [],
    byAgeList: [],
  }

  componentDidMount() {
    this.getDashBoard()
  }

  getDashBoard = async () => {
    this.setState({apiStatus: apiStatusText.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data/'
    const response = await fetch(vaccinationDataApiUrl)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const fetchedData = data.last_7_days_vaccination.map(eachItem => ({
        vaccineDate: eachItem.vaccine_date,
        dose1: eachItem.dose_1,
        dose2: eachItem.dose_2,
      }))
      this.setState({
        last7DaysData: fetchedData,
        byGenderList: data.vaccination_by_gender,
        byAgeList: data.vaccination_by_age,
        apiStatus: apiStatusText.success,
      })
    } else {
      this.setState({apiStatus: apiStatusText.failure})
    }
  }

  SuccessView = () => {
    const {last7DaysData, byGenderList, byAgeList} = this.state
    return (
      <>
        <div className="box">
          <h1 className="box-heading">Vaccination Coverage</h1>
          <VaccinationCoverage last7Days={last7DaysData} />
        </div>
        <div className="box">
          <h1 className="box-heading">Vaccination by gender</h1>
          <VaccinationByGender vaccinationByGender={byGenderList} />
        </div>
        <div className="box">
          <h1 className="box-heading">Vaccination by Age</h1>
          <VaccinationByAge vaccinationByAge={byAgeList} />
        </div>
      </>
    )
  }

  FailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  LoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderVaccinationDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusText.success:
        return this.SuccessView()
      case apiStatusText.failure:
        return this.FailureView()
      case apiStatusText.inProgress:
        return this.LoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-img"
          />
          <h1 className="web-heading">Co-WIN</h1>
        </div>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        {this.renderVaccinationDetails()}
      </div>
    )
  }
}

export default CowinDashboard
