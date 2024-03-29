"use client"
import React, { Key, useEffect, useState } from 'react';
import countries, { City, Country, Place, State } from '@/constants/PlaceSelectDataMock';
import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { MdOutlineAddBusiness } from "react-icons/md";
import { MdOutlineAddHome } from "react-icons/md";

interface PlaceSelectProps {
    onSelectPlaceChange: (place: string) => void;
    variant: "商家" | "目的地";
}

const PlaceSelect = ({ onSelectPlaceChange, variant }: PlaceSelectProps) => {
    const [selectedCountry, setSelectedCountry] = useState<Country>();
    const [selectedState, setSelectedState] = useState<State>();
    const [selectedCity, setSelectedCity] = useState<City>();
    const [street, setStreet] = useState("");

    useEffect(() => {
        // const place: Place = {
        //     country: selectedCountry?.name || '',
        //     state: selectedState?.name || '',
        //     city: selectedCity?.name || '',
        //     street: street
        // };
        const placeString = `${selectedCountry?.name || ''}/${selectedState?.name || ''}/${selectedCity?.name || ''}/${street}`;
        onSelectPlaceChange(placeString);
    }, [selectedCountry, selectedState, selectedCity, street]);


    const handleCountrySelectionChange = (country: Key) => {
        console.log(country);
        setSelectedCountry(countries.find((c) => c.name === country));
        setSelectedState(undefined)
    };

    const handleStateSelectionChange = (state: Key) => {
        let curState = selectedCountry?.states.find((s) => s.name === state);
        setSelectedState(curState);
    };

    const handleCitySelectionChange = (city: Key) => {
        let curCity = selectedState?.cities.find((c) => c.name === city);
        setSelectedCity(curCity);
    };

    const handleStreetChange = (value: string) => {
        setStreet(value)
    }


    return (
        <div className='flex flex-col gap-3 w-full p-3 bg-default-600 rounded-3xl shadow-xl'>

            <div className='flex gap-5 justify-start items-center'>
                <h1 className='text-content4 font-extrabold text-3xl'>{variant}</h1>
                {

                    variant === "商家" ? <MdOutlineAddBusiness className='size-9' /> : <MdOutlineAddHome className='size-9' />
                }
            </div>
            <div className='flex space-x-4'>
                <Autocomplete
                    defaultItems={countries || []}
                    className="flex-1"
                    label="Select country"
                    onSelectionChange={handleCountrySelectionChange}
                >
                    {(country) => (
                        <AutocompleteItem
                            key={country.name}
                            startContent={<Avatar alt={country.name} className="w-6 h-6" src={`https://flagcdn.com/${country.code}.svg`} />}
                        >
                            {country.name}
                        </AutocompleteItem>
                    )}
                </Autocomplete>

                <Autocomplete
                    defaultItems={selectedCountry && selectedCountry.states || []}
                    className="flex-1"
                    label="Select state"
                    onSelectionChange={handleStateSelectionChange}
                >
                    {(state) => (
                        <AutocompleteItem key={state.name}>{state.name}</AutocompleteItem>
                    )}
                </Autocomplete>

                <Autocomplete
                    defaultItems={selectedState && selectedState.cities || []}
                    className="flex-1"
                    label="Select city"
                    onSelectionChange={handleCitySelectionChange}
                >
                    {(city) => (
                        <AutocompleteItem key={city.name}>{city.name}</AutocompleteItem>
                    )}
                </Autocomplete>
                <Input type="text" labelPlacement={"inside"} label="Enter your street" onValueChange={handleStreetChange} className='flex-1' />
            </div>

        </div>
    );
};

export default PlaceSelect;
