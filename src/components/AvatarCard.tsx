import React from 'react'
import { Avatar } from "@nextui-org/react";

type AvatarCardProps = {
    className?: string,
    name?: string
}

const AvatarCard = ({ name, className }: AvatarCardProps) => {
    return (
        <section className={className}>
            <div className="flex gap-4 items-center">
                <Avatar name='Joe' src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-large" />
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold text-content4-foreground'>lantianlaoli</h1>
                    <p className='text-lg  text-content3-foreground'>lantianlaoli@gmail.com</p>
                </div>
            </div>
        </section>
    )
}

export default AvatarCard