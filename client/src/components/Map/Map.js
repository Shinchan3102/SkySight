import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import location from '../../assets/location.png';
import './Map.css';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import Pagination from '../Pagination/Pagination';
import { BsSnow, BsFillCloudsFill, BsFillCloudFog2Fill } from 'react-icons/bs';
import { FaCloudSun } from 'react-icons/fa';
import { IoMdRainy } from 'react-icons/io';
import { IoThunderstorm } from 'react-icons/io5';
import { GiDustCloud } from 'react-icons/gi';
import { WiSmoke } from 'react-icons/wi';
import Loader from '../Loader/Loader';

const Map = () => {

    //setting marker properties
    var myIcon = L.icon({
        iconUrl: location,
        iconSize: [48, 50],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });

    //array for the moods of the climate
    const icon = [
        [<FaCloudSun className='city-icon' />, "sunny"],
        [<BsFillCloudsFill className='city-icon' />, "clouds"],
        [<FaCloudSun className='city-icon' />, "clear"],
        [<IoMdRainy className='city-icon' />, "rain"],
        [<IoMdRainy className='city-icon' />, "drizzle"],
        [<BsSnow className='city-icon' />, "snow"],
        [<IoThunderstorm className='city-icon' />, "thunderstorm"],
        [<BsFillCloudFog2Fill className='city-icon' />, "fog"],
        [<BsFillCloudFog2Fill className='city-icon' />, "mist"],
        [<BsFillCloudFog2Fill className='city-icon' />, "haze"],
        [<GiDustCloud className='city-icon' />, "dust"],
        [<FaCloudSun className='city-icon' />, "default"],
        [<WiSmoke className='city-icon' />, "smoke"]
    ];

    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);

    //function to fetch data from the server
    const getData = async () => {
        setLoader(true);
        const response = await fetch(`https://sky-sight.vercel.app/?page=${page}`, {
            method: "GET",
        });
        const { data } = await response.json();
        //setting data in the client
        setData(data);
        setLoader(false);
    };

    useEffect(() => {

        //calling data whenever the page no. is changed or reloaded
        getData();
    }, [page]);

    return (
        <div className='Map-container'>
            {
                loader?
                <Loader />
                :
                <>
                    <div className='text-design' id='map'>Cities</div>
                    <div className='city-container'>
                        {

                            //card for data of each cities' climatic condition
                            data?.map((city, index) => {
                                return (
                                    <div className='city' key={index}>
                                        <div className='city-name'>{city.name}</div>
                                        <div>
                                            <div>{icon.filter((i) => i[1] === city.weather[0].main.toLowerCase())[0][0]} {city.weather[0].main}</div>
                                            <div> {(city.main.temp - 273.15).toFixed(2)}°C</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='Map-title'>Map</div>
                    <MapContainer center={[24, 80]} zoom={4} scrollWheelZoom={false} className="Map-view">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {

                            //setting marker points for each cities
                            data?.map((city, index) => {
                                return (
                                    <Marker position={[city.coord.lat, city.coord.lon]} icon={myIcon} key={index}>
                                        <Popup>
                                            <div>
                                                City: {city.name}
                                            </div>
                                            <div>
                                                Temp: {(city.main.temp - 273.15).toFixed(2)} <br />
                                                Max temp: {(city.main.temp_max - 273.15).toFixed(2)}<br />
                                                Min temp: {(city.main.temp_min - 273.15).toFixed(2)}<br />
                                                Humdity: {city.main.humidity}
                                            </div>
                                        </Popup>
                                    </Marker>
                                )
                            })
                        }
                    </MapContainer>
                    <Pagination setPage={setPage} page={page} />
                </>
            }
        </div>
    )
}

export default Map
