import React, { useContext, createContext, useEffect, ReactNode, useState } from "react";

import { useAddress, useContract, useMetamask, useContractWrite, useContractMetadata, useContractRead, TransactionError } from "@thirdweb-dev/react";
import { Order } from "@/lib/database/models/order";
import { getErrorArgs } from "@/utils";


interface StateContextType {
    publishOrder: (order: Order) => Promise<void>;
    storeOrderIsLoading: boolean;
    errorMsg: string | null;
}

// 定义一个默认的 StateContext 值
const defaultStateContext: StateContextType = {
    publishOrder: async (order: Order) => {
        console.warn("publishOrder is not implemented");
    },
    storeOrderIsLoading: false,
    errorMsg: null,
};

const StateContext = createContext<StateContextType>(defaultStateContext);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {

    // const mealContract = process.env.SMART_CONTRACT_MANAGER;
    const mealContract = process.env.NEXT_PUBLIC_SMART_CONTRACT_MANAGER_NOT_TIME_VALID_LOCAL;

    const { contract } = useContract(mealContract);

    const { mutateAsync: storeOrder, isLoading: storeOrderIsLoading, error: storeOrderError } = useContractWrite(
        contract,
        "storeOrder",
    );

    const [errorMsg, setErrorMsg] = useState<string | null>("");

    const publishOrder = async ({ id, createAt, startPoint, endPoint, amount, mealIds, userId, note, isSuper }: Order) => {

        console.log("MealManageAddress:", mealContract);
        try {
            // await storeOrder({ args: [userId, id, createAt, startPoint, endPoint, amount, mealIds, note, isSuper] });
            await storeOrder({ args: [userId, id, startPoint, endPoint, amount, mealIds, note, isSuper] });
            console.log("storeOrderError:", storeOrderError);

        } catch (error: TransactionError | any) {
            console.log("storeOrder error:", error);
            console.log("storeOrderError:", storeOrderError);

            const errorReason = error.reason;
            setErrorMsg(getErrorArgs(errorReason));
            console.log("Execution reverted with reason:", errorReason);
        }
    }

    return (
        <StateContext.Provider value={{ publishOrder, storeOrderIsLoading, errorMsg }}>{children}</StateContext.Provider>
    )
}

export default StateContext