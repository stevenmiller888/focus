import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import countryList from 'country-list'

const countries = countryList.getNames()

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    width: 200
  },
  formControl: {
    marginBottom: theme.spacing(3)
  }
}))

export default function Form ({ sex, country, birthday, onChangeSex, onChangeCountry, onChangeBirthday, onSubmit }) {
  const classes = useStyles()

  return (
    <form className={classes.container} onSubmit={onSubmit}>
      <FormControl component='fieldset' className={classes.formControl}>
        <FormLabel component='legend'>Birthday</FormLabel>
        <TextField
          onChange={e => onChangeBirthday(e.target.value)}
          InputLabelProps={{ shrink: true }}
          className={classes.textField}
          value={birthday}
          type='date'
          id='date'
          required
        />
      </FormControl>
      <FormControl component='fieldset' className={classes.formControl}>
        <FormLabel component='legend'>Country</FormLabel>
        <TextField
          onChange={e => onChangeCountry(e.target.value)}
          SelectProps={{ native: true }}
          className={classes.textField}
          value={country}
          required
          select
        >
          <option />
          {countries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </TextField>
      </FormControl>
      <FormControl component='fieldset' className={classes.formControl}>
        <FormLabel component='legend'>Sex</FormLabel>
        <RadioGroup
          onChange={e => onChangeSex(e.target.value)}
          className={classes.group}
          aria-label='Sex'
          value={sex}
          name='sex'
          required
        >
          <FormControlLabel value='female' control={<Radio />} label='Female' />
          <FormControlLabel value='male' control={<Radio />} label='Male' />
        </RadioGroup>
      </FormControl>
      <Button
        variant='contained'
        color='primary'
        type='submit'
        >
        Focus
      </Button>
    </form>
  )
}
