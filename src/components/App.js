import React from 'react'
import Typography from '@material-ui/core/Typography'
import Form from './Form'

const App = ({ year, milliseconds, sex, country, birthday, hasSubmitted, onChangeBirthday, onChangeSex, onChangeCountry, onSubmit }) => {
  if (hasSubmitted) {
    return (
      <div>
        <Typography variant='h5'>Years Left</Typography>
        <Typography variant='h3'>{year}.{milliseconds}</Typography>
      </div>
    )
  }

  return (
    <Form
      onChangeBirthday={onChangeBirthday}
      onChangeCountry={onChangeCountry}
      onChangeSex={onChangeSex}
      onSubmit={onSubmit}
      birthday={birthday}
      country={country}
      sex={sex}
    />
  )
}

export default App
