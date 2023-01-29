import React from 'react';
import './Main.css';
import weather from '../../assets/weather3-removebg-preview.png';
import '../../App.css';
import Navbar from '../Navbar/Navbar';
import { FaStreetView } from 'react-icons/fa';

const Main = () => {
    return (
        <div className='Main-container'>
            <Navbar />
            <div className='flex flex-reverse'>
                <div className='flex flex-col Main-write-section'>
                    <div className='Main-title'>
                        Get yourself one step ahead <FaStreetView className='Main-icon' />
                    </div>
                    <div className='Main-description'>
                        Never get caught in the rain again with our hour-by-hour forecast.
                        Get customized weather alerts for your location to stay ahead of the weather.
                    </div>
                    <a href='#map' className='button btn-started'>Get Started</a>
                </div>
                <div>
                    <img src={weather} className='weather-image' alt='weather-image' />
                </div>
            </div>
        </div>
    )
}

export default Main
