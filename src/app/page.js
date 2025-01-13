"use client";

import { useEffect, useState } from "react";
import './page.scss';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/sanchezzzhak/8606e9607396fb5f8216/raw/39de29950198a7332652e1e8224f988b2e94b166/ISO3166_RU.json');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        setCountries(data.map(country => ({ ...country, isDeleted: false })));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleDelete = (index) => {
    setCountries(countries => 
      countries.map((country, i) => 
        i === index ? { ...country, isDeleted: true } : country
      )
    );
  };

  if (isLoading) return <p className="text-center font-sans h-screen flex items-center justify-center">Loading...</p>;
  if (error) return <p className="text-center font-sans h-screen flex items-center justify-center">Error: {error}</p>;

  return (
    <div className="flex justify-center items-center pt-8 pb-8 overflow-hidden">
      <div className="flex flex-col gap-5">
        {countries.map((country, index) => (
          <div className={ !country.isDeleted ? "h-[60px] transition-all duration-1000" : "h-0 opacity-0 transition-all duration-1000 m-[-10px]"} key={index}>
          <div className={`flex justify-between items-center bg-white text-black p-3 rounded-xl border border-gray-300 transition-all duration-300 ${country.isDeleted ? 'transform translate-x-full opacity-0' : ''}`}>
            <div className="flex items-center gap-3">
              <img 
                src={country.flag_url} 
                onError={(e) => { e.target.onerror = null; e.target.src = 'empty-flag.png'; }} 
                className="h-8 w-12 rounded-[6px] border border-gray-300" 
                alt={`Flag of ${country.name_ru}`}/>
              <p className="font-sans select-none">{country.name_ru}</p>
            </div>
            <p className="bg-red-500 text-white px-6 py-2 rounded-[10px] cursor-pointer transition-opacity duration-300 hover:opacity-50" onClick={() => handleDelete(index)}>удалить</p>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}









