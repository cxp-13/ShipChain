"use client"
import React from 'react'
import { Input } from "@nextui-org/react";
import { MdOutlineAddBusiness } from "react-icons/md";
import { MdOutlineHouse } from "react-icons/md";
import PlaceSelect from '@/components/PlaceSelect';
import { Place } from '@/constants/PlaceSelectDataMock';

const StoreOrder = () => {

    const onSelectPlace = (place: Place) => {
        console.log("place", place);
    };

    return (
        <div>
            {/* 从商家到用户 */}
            <div className="flex  gap-4">
                <PlaceSelect onSelectPlace={onSelectPlace} />
            </div>
        </div>
    )
}

export default StoreOrder