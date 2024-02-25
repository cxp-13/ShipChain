"use client";
import React from 'react'
import ProfileCard from '@/components/ProfileCard';
import OrderTabs from '@/components/OrderTabs';
import OrderTable from '@/components/OrderTable';
import { orders } from '@/constants/OrderTableDataMock';

const Profile = () => {
  return (
    <section>
      <div className="flex w-full flex-col gap-20">
        <ProfileCard />
        {/* <OrderTabs /> */}
        <OrderTable orders={orders}/>
      </div>
    </section>

  )
}

export default Profile