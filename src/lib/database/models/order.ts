import { Meal } from "./meal";
import { User } from "./user";
export type Order = {
  owner: string;
  id: string;
  createAt: number;
  startPoint: string;
  endPoint: string;
  amount: number;
  mealIds: string[];
  userId: string;
  note: string;
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








