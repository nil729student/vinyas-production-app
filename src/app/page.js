"use client"

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      //const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=02230d36bb6244048c0121043242405&q=${lat},${lon}`);
      const data = {
        location: {
          name: 'Vic',
          region: 'Catalonia',
          country: 'Spain',
          lat: 41.95,
          lon: 2.29,
          tz_id: 'Europe/Madrid',
          localtime_epoch: 1716553530,
          localtime: '2024-05-24 14:25'
        },
        current: {
          last_updated_epoch: 1716552900,
          last_updated: '2024-05-24 14:15',
          temp_c: 19,
          temp_f: 66.2,
          is_day: 1,
          condition: {
            text: 'Partly cloudy',
            icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
            code: 1003
          },
          wind_mph: 5.6,
          wind_kph: 9,
          wind_degree: 50,
          wind_dir: 'NE',
          pressure_mb: 1018,
          pressure_in: 30.06,
          precip_mm: 0.14,
          precip_in: 0.01,
          humidity: 68,
          cloud: 50,
          feelslike_c: 19,
          feelslike_f: 66.2,
          vis_km: 10,
          vis_miles: 6,
          uv: 4,
          gust_mph: 6.5,
          gust_kph: 10.5
        }
      }
      console.log(data);
      console.log(data.current.icon);
      setWeather({
        location: data.location.name,
        current: data.current.temp_c,
        humidity: data.current.humidity,
        temps: data.current.condition.icon,
        localtime: data.location.localtime,
        bent_km: data.current.wind_kph,
        //min: data.forecast.forecastday[0].day.mintemp_c,
        //max: data.forecast.forecastday[0].day.maxtemp_c,
      });
    });
  }, []);


  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Grup Viñas - Página Principal</title>
        {/* Aquí puedes agregar metadatos, como descripción, palabras clave, etc. */}
      </Head>

      <main className="container mx-auto py-8">
        <div className="flex justify-center">
          <div className="relative">
            <Image src="/images/marca-grup-viñas-transparent-left.png" alt="Grup Viñas Logo" width={500} height={400} />

            <div className="mt-0 text-center text-2xl bg-slate-100 shadow-lg rounded-lg justify-center px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
              
              {weather ? (
                <div className="space-y-4">
                  <p className="mb-2 text-lx font-bold">Ubicació: {weather.location}</p>
                  <p className="text-lx"> <span className="font-semibold">{weather.localtime}</span></p>
                  <div className="flex items-center justify-center mb-2">
                    <p className="mr-2 text-4xl font-semibold">{weather.current}°C</p>
                    <img
                      src={weather.temps}
                      alt="Weather icon"
                      width={80}
                      height={80}
                      className="inline-block"
                    />
                  </div>
                  <p className="text-lx">Humitat: {weather.humidity}%</p>
                  <p className="text-lx">Vent: {weather.bent_km} km/h</p>
                  
                </div>
              ) : (
                <p className="text-lg font-semibold">Loading...</p>
              )}
            </div>
          </div>
          <div className="relative py-32">
            <Image src="/images/vaca.jpg" alt="Paisaje" width={1000} height={1000} />
            <div className="absolute top-0 left-0 bottom-0 w-1/2 h- bg-gradient-to-r from-gray-100 to-transparent"></div>
          </div>
        </div>
        {/* Aquí puedes agregar otros elementos de la página, como información sobre la empresa, etc. */}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto">
          {/* Aquí puedes agregar el pie de página, como enlaces a redes sociales, información de contacto, etc. */}
        </div>
      </footer>
    </div>
  );
}
