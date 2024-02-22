import { Order } from '@/lib/database/models/order'
import React from 'react'
import Image from 'next/image'

const OrderCard = ({ order, handleClick }: { order: Order, handleClick: () => void }) => {
    // 根据备注生成图片
    const imageUrl = "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    const userUrl = "https://images.pexels.com/photos/20267706/pexels-photo-20267706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    return (
        <section>
            <div className="order-card">
                <Image
                    src={imageUrl}
                    width={192}
                    height={120}
                    className='object-fill rounded-xl'
                    alt="Image of the order"
                />
                <div className="flex flex-col  px-2">
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col '>
                            <h6 className="text-lg text-black">用户名</h6>
                            <p className="text-xs text-gray-500">钱包地址</p>
                        </div>
                        <img
                            src={userUrl}
                            className='object-cover object-center rounded-full size-8'
                            alt="User profile picture"
                        />
                    </div>
                    <p className='text-gray-900'>$123</p>
                </div>
            </div>
        </section>
    )
}

export default OrderCard