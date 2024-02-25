import React from 'react'
import { Input } from "@nextui-org/react";
import { MdOutlineAddBusiness } from "react-icons/md";
import { MdOutlineHouse } from "react-icons/md";
import PlaceSelect from '@/components/PlaceSelect';

const StoreOrder = () => {
    return (
        <div>
            {/* 从商家到用户 */}
            <div className="flex  gap-4">
                <PlaceSelect />

            </div>
        </div>
    )
}

export default StoreOrder