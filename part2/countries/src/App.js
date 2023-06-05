import React, { useEffect, useState } from 'react'
import dataService from './dataService'

const Filter = (props) => {
  return (
    <form>
      <div>
        Search country: <input value={props.searchValue} onChange={props.handleSearchChange} />
      </div>
    </form>
  )
}

const TopTenCountryItem = (props) => {
  var country = props.country

  const handleSelect = () => {
    props.handleSelect(country.name.common.toLowerCase())
  }

  return (
    <div key={country.name.common}>
      {country.name.common} <button onClick={handleSelect}>show</button>
    </div>
  )
}

const TopTenCountries = (props) => {
  var countries = props.countries

  const handleSelect = countryName => {
    props.handleSelect(countryName)
  }

  return (
    <div>
      {countries.map(country => 
        <TopTenCountryItem country={country} handleSelect={handleSelect} />  
      )}
    </div>
  )
}

const CountryDetails = (props) => {
  const country = props.country
  console.log('%cApp.js line:24 props', 'color: #007acc;', props);
  console.log('%cApp.js line:47 country.languages', 'color: #007acc;', Object.values(country.languages));
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h2>languages: </h2>
      <ul>
      {Object.values(country.languages).map(language => <li>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag" height="100" />
    </div>
  )
}



const CountryList = (props) => {
  var countries = props.countries
  const filter = props.filter.toLowerCase()
  const checkFilter = (country) => country.name.common.toLowerCase().includes(filter)

  const handleSelect = (countryName) => {
    props.handleSelect(countryName)
  }

  let filteredCountries = countries.filter(checkFilter)

  if (filteredCountries[0] === undefined) {
    return(
      null
    )
    }

  if (filteredCountries.length > 10 ){
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10){
    return (
      <TopTenCountries countries={filteredCountries} handleSelect={handleSelect} />
    )
  } else {
    return( 
      <CountryDetails country={filteredCountries[0]}  />
    )
  }
}

const App = (props) => {
  const [ searchValue, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    dataService.getAll()
      .then(initialData => {
        setCountries(initialData)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSelect = countryName => {
    setSearch(countryName)
  }

  return (
  <div>
    <Filter searchValue={searchValue} handleSearchChange={handleSearchChange} />
    <CountryList countries={countries} filter={searchValue} handleSelect={handleSelect}/>
  </div>
  
  )
}

export default App