import React, { useState } from 'react';
import './WeatherApp.css'
import cloudy from '../Assets/cloudy.png'
import drizzle from '../Assets/drizzle.png'
import humidity from '../Assets/humidity.png'
import rain from '../Assets/rain.png'
import snow from '../Assets/snow.png'
import sunny from '../Assets/sunny.png'
import wind from '../Assets/wind.png'
import search from'../Assets/search.png'

const WeatherApp = () => {

    const [wicon, setWicon] = useState(sunny)

    let api_key = '75778798ebe433c7f08f978a31381989';

    const startSearch = async () =>{
        const element = document.getElementsByClassName('cityInput')
        if(element[0].value===''){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Imperial&appid=${api_key}`

        

        let response = await fetch(url)
        let data = await response.json();
        const humidity = document.getElementsByClassName('humidity-percentage')
        const wind = document.getElementsByClassName('wind-rate')
        const temperature = document.getElementsByClassName('weather-temp')
        const location = document.getElementsByClassName('weather-location')

        humidity[0].innerHTML = data.main.humidity+' %';
        wind[0].innerHTML = Math.floor(data.wind.speed)+'mph';
        temperature[0].innerHTML = Math.floor(data.main.temp)+'°f';
        location[0].innerHTML = data.name;

        if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n'){
            setWicon(sunny) 
        }   else if(data.weather[0].icon==='02d' || data.weather[0].icon==='02n'){
                setWicon(cloudy)
        }   else if(data.weather[0].icon==='03d' || data.weather[0].icon==='03n'){
                setWicon(drizzle) 
        }   else if(data.weather[0].icon==='04d' || data.weather[0].icon==='04n'){
                setWicon(drizzle)
        }   else if(data.weather[0].icon==='09d' || data.weather[0].icon==='09n'){
                setWicon(rain)
        }   else if(data.weather[0].icon==='10d' || data.weather[0].icon==='10n'){
                setWicon(rain)
        }   else if(data.weather[0].icon==='13d' || data.weather[0].icon==='13n'){
                setWicon(snow)
        }   else {
            setWicon(sunny)
        }


    }



  return (
    <div className='container'>
        <div className='top-bar'>
            <input type = 'text' className='cityInput' placeholder='Search!'></input>
            <div className='search' onClick={()=>{startSearch()}}> 
                <img src ={search} alt='?' style={{width:'25px'}}></img>
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt='' style={{width:'200px'}}></img>
        </div>
        <div className="weather-temp">75°f</div>
        <div className="weather-location">Tampa</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity} alt="" className="icon" style={{width:'85px'}}/>
                <div className="data">
                    <div className="humidity-percentage">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind} alt="" className="icon" style={{width:'85px'}}/>
                <div className="data">
                    <div className="wind-rate">10mph</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    
    </div>
        
  )
}

export default WeatherApp