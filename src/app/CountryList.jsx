"use client";

import { useState, useEffect } from "react";

export default function CountryList({ list }) {
    const [countries, setCountries] = useState(list);

    const handleDelete = (index) => {
        setCountries(prevCountries => 
            prevCountries.map((country, i) => 
                i === index ? { ...country, isDeleted: true } : country
            )
        );
    };

    return (
      <div className="flex justify-center items-center pt-8 pb-8 overflow-hidden">
        <div className="flex flex-col gap-5">
          {countries.map((country, index) => (
            <div className={!country.isDeleted ? "h-[60px] transition-all duration-1000" : "h-0 opacity-0 transition-all duration-1000 m-[-10px]"} key={country.id || index}>
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
