import React from 'react'
import { User } from "@nextui-org/react";
import Stat from './Stat';
import TimeLine from './TimeLine';
import AvatarCard from './AvatarCard';

const ProfileCard = () => {
    return (
        <section className='flex flex-nowrap gap-8'>
            <div className='flex flex-col  gap-8'>
                <AvatarCard  className='rounded-md bg-background shadow-2xl p-3'/>
                <Stat className='rounded-md bg-background shadow-2xl p-3'/>
            </div>
            <TimeLine className='rounded-md bg-background shadow-2xl p-3' />
        </section>
    )
}

export default ProfileCard