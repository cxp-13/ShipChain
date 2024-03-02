"use client";
import React, {
  useContext,
  createContext,
  useEffect,
  ReactNode,
  useState,
} from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractMetadata,
  useContractRead,
  TransactionError,
} from "@thirdweb-dev/react";
import { Order, OrderPopulateMealAndUser } from "@/lib/database/models/order";
import { getErrorArgs } from "@/utils";
import { getMealsById } from "@/lib/actions/meal.actions";
import { Meal } from "@/lib/database/models/meal";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@/lib/database/models/user";

interface StateContextType {
  publishOrder: (order: Order) => Promise<void>;
  storeOrderIsLoading: boolean;
  getUserOrdersIsLoading: boolean;
  isFetchOrders: boolean;
  getUserOrders: () => Promise<OrderPopulateMealAndUser[]>;
}

// 定义一个默认的 StateContext 值
const defaultStateContext: StateContextType = {
  publishOrder: async (order: Order) => {
    console.warn("publishOrder is not implemented");
  },
  storeOrderIsLoading: false,
  getUserOrdersIsLoading: false,
  isFetchOrders: false,
  getUserOrders: async () => {
    return [];
  },
};

const StateContext = createContext<StateContextType>(defaultStateContext);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
  // const mealContract = process.env.SMART_CONTRACT_MANAGER;
  const mealContract =
    process.env.NEXT_PUBLIC_SMART_CONTRACT_MANAGER_NOT_TIME_VALID_LOCAL;

  const { contract } = useContract(mealContract);
  const address = useAddress();

  const {
    mutateAsync: storeOrder,
    isLoading: storeOrderIsLoading,
    error: storeOrderError,
  } = useContractWrite(contract, "storeOrder");

  const {
    data: orderDatas,
    isLoading: getUserOrdersIsLoading,
    error: getUserOrdersError,
  } = useContractRead(contract, "getUserOrders", [address]);

  const [isFetchOrders, setIsFetchOrders] = useState<boolean>(false);

  const publishOrder = async ({
    id,
    createAt,
    startPoint,
    endPoint,
    amount,
    mealIds,
    userId,
    note,
    isSuper,
  }: Order) => {
    console.log("MealManageAddress:", mealContract);
    try {
      // await storeOrder({ args: [userId, id, createAt, startPoint, endPoint, amount, mealIds, note, isSuper] });
      await storeOrder({
        args: [
          userId,
          id,
          startPoint,
          endPoint,
          amount,
          mealIds,
          note,
          isSuper,
        ],
      });
      console.log("storeOrderError:", storeOrderError);
    } catch (error: TransactionError | any) {
      console.log("storeOrder error:", error);
      console.log("storeOrderError:", storeOrderError);

      const errorReason = error.reason;
      //   setErrorMsg(getErrorArgs(errorReason));
      console.log("Execution reverted with reason:", errorReason);
    }
  };

  const populateMealsAndUserInOrder = async (orderData: any) => {
    let user: User | null = null;

    // 从Mongoose
    console.log("orderData.mealIds:", orderData.mealIds);

    let meals = (await getMealsById(orderData.mealIds)) as Meal[];
    if (!meals) {
      setIsFetchOrders(false);
    }
    console.log("meals:", meals);
    //从clerk
    const userInfoRes = await fetch(`/api/user/${orderData.userId}`);
    let userInfo = await userInfoRes.json();
    console.log("context get user info:", userInfo);

    if (!userInfo) {
      setIsFetchOrders(false);
    } else {
      user = {
        id: orderData.userId,
        name: userInfo.lastName + userInfo.firstName,
        avatar: userInfo.imageUrl, 
        email: userInfo.emailAddresses[0].emailAddress,
      };
    }

    console.log("populate user:", user);

    if (!userInfo || !meals) {
      setIsFetchOrders(false);
      return {};
    } else {
      setIsFetchOrders(true);
      return {
        owner: orderData.owner,
        id: orderData.id,
        createAt: orderData.createAt,
        startPoint: orderData.startPoint,
        endPoint: orderData.endPoint,
        amount: orderData.amount,
        note: orderData.note,
        status: "success",
        meals: meals,
        user: user,
      };
    }
  };

  const getUserOrders = async () => {
    console.log(
      "orderDatas",
      orderDatas,
      "address",
      address,
      "getUserOrdersError",
      getUserOrdersError,
      "getUserOrdersIsLoading",
      getUserOrdersIsLoading
    );
    if (orderDatas !== undefined) {
      return await Promise.all(orderDatas.map(populateMealsAndUserInOrder));
    }
    return [];
  };

  return (
    <StateContext.Provider
      value={{
        publishOrder,
        storeOrderIsLoading,
        getUserOrdersIsLoading,
        isFetchOrders,
        getUserOrders,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
