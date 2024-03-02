"use client";
import React, { useContext, useState, useEffect } from "react";
import ProfileCard from "@/components/ProfileCard";
import OrderTabs from "@/components/OrderTabs";
import OrderTable from "@/components/OrderTable";
import { orders } from "@/constants/OrderTableDataMock";
import StateContext from "@/context";
import { OrderPopulateMealAndUser } from "@/lib/database/models/order";
import { getMealsById } from "@/lib/actions/meal.actions";
import { clerkClient, currentUser } from "@clerk/nextjs";

const Profile = () => {
  const { getUserOrders, getUserOrdersIsLoading, isFetchOrders } =
    useContext(StateContext);
  const [orders, setOrders] = useState<OrderPopulateMealAndUser[]>([]);

  useEffect(() => {
    console.log("isFetchOrders", isFetchOrders);
    const fetchOrders = async () => {
      let res = await getUserOrders();
      setOrders(res);
      console.log("getUserOrders res", res);
    };
    if (!getUserOrdersIsLoading || !isFetchOrders) {
      fetchOrders();
    }
  }, [getUserOrdersIsLoading, isFetchOrders]);

  return (
    <section>
      <div className="flex w-full flex-col gap-20">
        <ProfileCard />
        {/* <OrderTabs /> */}
        {/* <OrderTable orders={orders} /> */}
      </div>
    </section>
  );
};

export default Profile;
