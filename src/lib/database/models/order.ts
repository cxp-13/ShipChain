import { BigNumber } from "ethers";
import { Meal } from "./meal";
import { User } from "./user";
// 订单表单对象
export type Order = {
  id: string;
  createAt: BigNumber;
  startPoint: string;
  endPoint: string;
  amount: BigNumber;
  mealIds: string[];
  userId: string;
  note: string;
  isSuper: boolean;
};

export type OrderPopulateMeal = {
  owner: string;
  id: string;
  createAt: number;
  startPoint: string;
  endPoint: string;
  amount: number;
  meals: Meal[];
  user: User;
  note: string;
  status: string
};








