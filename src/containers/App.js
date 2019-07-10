import React, { Component } from 'react'
import App from '../components/App'
import { getDiffDate } from './helpers'
import moment from 'moment'

const storage = window.localStorage

export default class AppContainer extends Component {
  constructor (props) {
    super(props)

    const birthday = storage.getItem('birthday') || ''
    const country = storage.getItem('country') || ''
    const sex = storage.getItem('sex') || ''

    this.state = {
      hasSubmitted: birthday && country && sex,
      milliseconds: null,
      year: null,
      birthday,
      country,
      sex
    }

    this.onChangeBirthday = this.onChangeBirthday.bind(this)
    this.onChangeCountry = this.onChangeCountry.bind(this)
    this.onChangeSex = this.onChangeSex.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  render () {
    return React.createElement(App, {
      ...this.props,
      ...this.state,
      onChangeBirthday: this.onChangeBirthday,
      onChangeCountry: this.onChangeCountry,
      onChangeSex: this.onChangeSex,
      onSubmit: this.onSubmit
    })
  }

  componentDidMount () {
    const { hasSubmitted } = this.state
    if (hasSubmitted) {
      this.renderRemainingTime()
    }
  }

  renderRemainingTime () {
    const { birthday, country, sex } = this.state
    const diffDate = getDiffDate({ birthday, country, sex })
    let duration = moment.duration(diffDate * 1000, 'milliseconds')
    const interval = 100

    this.interval = setInterval(() => {
      duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds')
      const years = duration.asYears().toFixed(9).split('.')
      this.setState({ year: years[0], milliseconds: years[1] })
    }, interval)
  }

  onChangeBirthday (birthday) {
    this.setState({ birthday })
  }

  onChangeCountry (country) {
    this.setState({ country })
  }

  onChangeSex (sex) {
    this.setState({ sex })
  }

  onSubmit () {
    const { birthday, country, sex } = this.state

    storage.setItem('birthday', birthday)
    storage.setItem('country', country)
    storage.setItem('sex', sex)

    this.setState({ hasSubmitted: true }, () => {
      this.renderRemainingTime()
    })
  }
}
