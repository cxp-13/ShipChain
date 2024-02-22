"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import OrderCard from './OrderCard'
import { Order } from '@/lib/database/models/order'
const DisplayOrders = ({ orders }: { orders: Array<Order> }) => {

    const router = useRouter()
    const userId = 0

    // 传递参数：orderId + userId(clerk提供) 
    const handleNavigate = (order: Order) => {
        router.push(`/orders/${order.orderId}/userId=${userId}`)
    }


    return (
        <div>
            <div className='flex flex-wrap mt-[20px] gap-[26px]'>
                {
                    orders.length === 0 ? (
                        <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-primary'>
                            You have not publish any order yet.
                        </p>
                    ) : (
                        orders.map((order, index) =>
                            <OrderCard key={index} order={order} handleClick={() => handleNavigate(order)} />)
                    )
                }
            </div>
        </div>
    )
}

export default DisplayOrders