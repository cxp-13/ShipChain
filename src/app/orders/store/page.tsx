"use client"
import React, { useState } from 'react'
import { Input } from "@nextui-org/react";
import { MdOutlineAddBusiness } from "react-icons/md";
import { MdOutlineHouse } from "react-icons/md";
import PlaceSelect from '@/components/PlaceSelect';
import { Place } from '@/constants/PlaceSelectDataMock';
import DishGallery from '@/components/DishGallery';
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { MdFileDownloadDone } from "react-icons/md";
import { FaBoltLightning } from "react-icons/fa6";
import { MdOutlineGeneratingTokens } from "react-icons/md";

const StoreOrder = () => {
    const [startPlace, setStartPlace] = useState("")
    const [endPlace, setEndPlace] = useState("")
    const [textAreaValue, setTextAreaValue] = useState("")
    const [mealIds, setMealIds] = useState<string[]>([]);
    const [isLighting, setIsLighting] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>(0)


    return (
        <div className='flex flex-col gap-10'>
            {/* 从商家到用户 */}
            <div className='font-bold text-4xl text-content1-foreground'>
                <h1 className='tracking-widest'>
                    {isLighting ? ("时区增强模式") : ("普通模式")}
                </h1>
                {
                    isLighting && <FaBoltLightning />
                }
            </div>
            <div className="flex  gap-4 max-lg:flex-wrap">
                <PlaceSelect onSelectPlaceChange={(place) => setStartPlace(place)} variant='商家' />
                <PlaceSelect onSelectPlaceChange={(place) => setEndPlace(place)} variant='目的地' />
            </div>
            {/* 图片选择 */}
            <div>
                <DishGallery onGetMealIds={(mealIds) => setMealIds(mealIds)} onGetAmount={(amount) => setAmount(amount)} />
            </div>
            <div>
                <Textarea
                    label="Description"
                    placeholder="Enter your description"
                    className="w-full"
                    onValueChange={(text) => setTextAreaValue(text)}
                />
            </div>

            <Button color="success" endContent={<MdOutlineGeneratingTokens size={34} />} size={"lg"} className='h-full px-6 py-3'>
                <p>{`Mint ${amount*0.01} token`}</p>
            </Button>
        </div>
    )
}

export default StoreOrder