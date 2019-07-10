import life from './life.json'
import moment from 'moment'

export { getDiffDate }

function getDiffDate ({ birthday, country, sex }) {
  const expectancyData = lifeExpectancy(country)
  const lifeExpectancyYears = expectancyData[sex]
  const currentDate = moment().unix()
  const birthDate = moment(birthday)
  const deathDate = birthDate.add(lifeExpectancyYears, 'years').unix()
  const diffDate = deathDate - currentDate
  return diffDate
}

function lifeExpectancy (name) {
  const country = life.filter(data => data.country.toUpperCase() === name.toUpperCase())
  return country[0]
}
