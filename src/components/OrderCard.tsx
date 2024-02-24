import { OrderPopulateMeal } from '@/lib/database/models/order'
import React from 'react'
// import Image from 'next/image'
import { Card, CardFooter, Image, Button, CardHeader } from "@nextui-org/react";

const OrderCard = ({ order, handleClick }: { order: OrderPopulateMeal, handleClick: () => void }) => {
    // 根据备注生成图片
    const imageUrl = "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    const userUrl = "https://images.pexels.com/photos/20267706/pexels-photo-20267706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none w-[300px] max-sm:w-full"
        >
            <CardHeader className="flex gap-3">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">NextUI</p>
                    <p className="text-small text-default-500">nextui.org</p>
                </div>
            </CardHeader>
            <Image
                alt="meal "
                className="object-cover"
                src={imageUrl}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_12px)] shadow-small ml-1 z-10">
                <p className="text-bold text-content3-foreground">2024/02/11</p>
                <p className="text-xl text-content3-foreground bg-black/20 p-3 rounded-large">
                    12.3232 ETH
                </p>
            </CardFooter>
        </Card>
    )
}

export default OrderCard