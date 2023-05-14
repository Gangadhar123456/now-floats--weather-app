import { Box,Text, Button,  Heading, Image, Input,  } from '@chakra-ui/react'
import {Component} from 'react'

import './App.css'

class App extends Component {
 state = {longitude : "", latitude : "", data : [], deviceLocation : false,
 searchLocationShows : false ,name : "" , serachError : ''}

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => (
      this.setState({longitude : position.coords.longitude, latitude : position.coords.latitude})
    ))
    }


  getCurrentLocationDetails = async () => {
   const {longitude, latitude} = this.state
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=9ac7d643b60e48f990a65231231303&q=${latitude},${longitude}&aqi=yes`)
    const data = await response.json()
      const gettingData = {
        country : data.location.country,
        localTime : data.location.localtime,
        region : data.location.region,
        name : data.location.name,
        timeZoneId : data.location.tz_id,
        weatherConditionIcon : data.current.condition.icon,
        weatherConditionText : data.current.condition.text,
        humidity : data.current.humidity,
        temperatureinCelsius : data.current.temp_c,
        temperatureFahrenheit : data.current.temp_f,
        windDirecion : data.current.wind_dir,
        windSpeed : data.current.wind_kph
      } 
      this.setState({data : gettingData, deviceLocation : true})
      
    }

    weatherReports = () => {
      return(
        <div className='border-container'>
          <Text
            fontSize="xl" // sets the font size to extra-large
            fontWeight="bold" // sets the font weight to bold
            textDecoration="underline" // sets the text decoration to underline
            color="white" mt='5' // sets the text color to red
            >
            Weather Reports
          </Text>
          <div className='weather-box'>
            <div>
              <Text fontFamily="-moz-initial" fontWeight='semibold' color='white'  >Country : {this.state.data.country}</Text>
              <Text fontFamily="-moz-initial" fontWeight='semibold' color='white' >Region : {this.state.data.region}</Text>
              <Text fontFamily="-moz-initial" fontWeight='semibold' color='white' >Current location : {this.state.data.name}</Text>
              <Text fontFamily="-moz-initial" fontWeight='semibold' color='white' >local Time : {this.state.data.localTime}</Text>
              <Text fontFamily="-moz-initial" fontWeight='semibold' color='white' >time zone from : {this.state.data.timeZoneId}</Text>
            </div>
            <div>
              <Text fontFamily="-moz-initial" fontWeight='semibold' color='white'>Weather Condition : {this.state.data.weatherConditionText}</Text>
              <center>
              <Image     
                  boxSize='100px'
                  borderRadius='full'
                  objectFit='cover'
              src={this.state.data.weatherConditionIcon} alt="weather icon" 
              />
              </center>
            </div>
            <div>
              <Text fontFamily="-moz-initial" fontWeight='semibold' color='white'>temperature in Celsius : {this.state.data.temperatureinCelsius}<span>  °C</span></Text>
              <Text fontFamily="-moz-initial" fontWeight='semibold' color='white'>temperature in Fahrenheit : {this.state.data.temperatureFahrenheit} °F</Text>
              <Text fontFamily="-moz-initial" fontWeight='semibold' color='white'>wind speed : {this.state.data.windSpeed} kmph</Text>
              <Text fontFamily="-moz-initial" fontWeight='semibold' color='white'>wind direction : {this.state.data.windDirecion}</Text>
              <Text fontFamily="-moz-initial" fontWeight='semibold' color='white'>humidity : {this.state.data.humidity} %</Text>
            </div>
            </div>
          </div>
      ) 
    }

    searchLocation =  () => {
      this.setState({ searchLocationShows : true})      
    }

    onInputSubmit = async event => {
      event.preventDefault()
      const {name} = this.state
      if (name === ""){
        this.setState({serachError : "*Enter Valid Location"})
      }
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=9ac7d643b60e48f990a65231231303&q=${name}&aqi=yes`)
   const data = await response.json()
     const gettingData = {
       country : data.location.country,
       localTime : data.location.localtime,
       region : data.location.region,
       name : data.location.name,
       timeZoneId : data.location.tz_id,
       weatherConditionIcon : data.current.condition.icon,
       weatherConditionText : data.current.condition.text,
       humidity : data.current.humidity,
       temperatureinCelsius : data.current.temp_c,
       temperatureFahrenheit : data.current.temp_f,
       windDirecion : data.current.wind_dir,
       windSpeed : data.current.wind_kph
     } 
     this.setState({data : gettingData, deviceLocation : true})
     this.setState({ name: '' });
     
    }
  
    onChangeName = event => {
      this.setState({name: event.target.value})
    }
    

render() {
  const {deviceLocation,serachError } = this.state
  console.log(serachError)
  return (
    <div className="App">
      <Box bgGradient="linear(to-r, teal.500, blue.500)"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      h="100vh"
      w="100vw">
      <Heading my='30px' textColor='white' fontFamily="-moz-initial" textDecoration="underline">Welcome To Weather App</Heading>
      <div className='for-row'>
      <Text
        fontFamily="-moz-initial" fontWeight='semibold' color='white'
              htmlFor='cl'>Curren Location Weather Details
      </Text> &nbsp;
      <Button colorScheme='orange' size="sm" onClick={this.getCurrentLocationDetails} id="cl">Click here</Button> <br /><br />
      </div>
      <form className="contact-form-container" onSubmit={this.onInputSubmit}>
      <Input color='white' 
        _placeholder={{ color: 'inherit' }} width="210px"  size='sm' placeholder='search location' onChange={this.onChangeName} /> &nbsp;&nbsp;
      <Button mb='1' colorScheme='gray' size='sm' type="submit" className="button">
          Search
      </Button>
      </form>
      {deviceLocation ? <h1>{this.weatherReports()}</h1> : <Text fontFamily="-moz-initial" fontWeight='none' color='red'>{serachError}</Text>}
      </Box>
      
    </div>
  );
}
}

export default App;
