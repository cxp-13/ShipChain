"use server";

import { assert } from "console";
import { connectToDatabase } from "../database";
import { MealModel, Meal } from "../database/models/meal";

const createMeal = async ({ name, quantity, price, image }: Meal) => {
  try {
    await connectToDatabase();

    console.log(
      "name",
      name,
      "quantity",
      quantity,
      "price",
      price,
      "image",
      image
    );

    const newMeal = await MealModel.create({
      name: name,
      quantity: quantity,
      price: price,
      image: image,
    });
    console.log("newMeal", newMeal);

    return JSON.parse(JSON.stringify(newMeal));
  } catch (error) {
    console.log(error);
  }
};

const getMealsById = async (mealIds: any[]) => {
  try {
    await connectToDatabase();
    console.log("getMealsById --- mealIds", mealIds);

    const meals = await MealModel.find({ _id: { $in: mealIds } });
    console.log("getMealsById --- meals", meals);

    return JSON.parse(JSON.stringify(meals));
  } catch (error) {
    console.log("getMealsById error", error);
  }
};
export { createMeal, getMealsById };
