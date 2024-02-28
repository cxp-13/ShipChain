"use client"
import React, { useContext, useEffect, useState } from 'react'
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
import { useUser } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid';
import { ethers } from 'ethers';
import StateContext from '@/context';

const StoreOrder = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const { publishOrder, storeOrderIsLoading, errorMsg } = useContext(StateContext);
    const [startPoint, setStartPoint] = useState("")
    const [endPoint, setEndPoint] = useState("")
    const [note, setNote] = useState("")
    const [mealIds, setMealIds] = useState<string[]>([]);
    const [isSuper, setIsSuper] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>(0)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)


    useEffect(() => {
        // 在这里实时监测参数的变化并更新 isDisabled 状态
        if (user && startPoint && endPoint && note && mealIds.length > 0 && amount > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [user, startPoint, endPoint, note, mealIds, amount]);

    const handleSubmit = async () => {
        let userId = user?.id;
        let orderId = uuidv4();
        let currentTimestamp = Math.ceil(Date.now() / 1000);
        let createAt = ethers.BigNumber.from(currentTimestamp);
        let amountPrice = ethers.BigNumber.from(amount);

        console.log("startPoint", startPoint, "endPoint", endPoint, "note", note, "isSuper", isSuper);
        console.log("userId", userId, "id", orderId, "createAt", createAt, "amount", amount);
        console.log("mealIds", mealIds);

        try {
            if (userId) {
                publishOrder({
                    id: orderId,
                    createAt,
                    startPoint,
                    endPoint,
                    amount: amountPrice,
                    mealIds,
                    userId,
                    note,
                    isSuper
                })
            }
        } catch (error) {
            console.log("storeOrder", error);
        }
    }


    return (
        <div className='flex flex-col gap-10'>
            {/* 从商家到用户 */}
            <div className='flex font-bold text-4xl text-content1-foreground'>
                <h1 className='tracking-widest'>
                    {isSuper ? ("时区增强模式") : ("普通模式")}
                </h1>
                {
                    isSuper && <FaBoltLightning />
                }
            </div>
            <div className="flex  gap-4 max-lg:flex-wrap">
                <PlaceSelect onSelectPlaceChange={(place) => setStartPoint(place)} variant='商家' />
                <PlaceSelect onSelectPlaceChange={(place) => setEndPoint(place)} variant='目的地' />
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
                    onValueChange={(text) => setNote(text)}
                />
            </div>
            {
                errorMsg ? (
                    <div role="alert" className="daisy-alert daisy-alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <div>
                            <h3 className="font-bold">Publish error!</h3>
                            <div className="text-xs">{errorMsg}</div>
                        </div>
                        <button className="btn btn-sm">retry</button>
                    </div>
                ) : (
                    <Button isDisabled={isDisabled} isLoading={storeOrderIsLoading} color="success" endContent={<MdOutlineGeneratingTokens size={34} />} size={"lg"} className='h-full px-6 py-3' onPress={handleSubmit}>
                        <p>{`Mint ${amount * 0.01} token`}</p>
                    </Button>
                )
            }
        </div>
    )
}

export default StoreOrder