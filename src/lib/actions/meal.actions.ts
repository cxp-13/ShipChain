"use server"

import { connectToDatabase } from "../database"
import { MealModel, Meal } from "../database/models/meal"



export const createMeal = async ({ name, quantity, price, image }: Meal) => {
  try {
    await connectToDatabase();

    console.log("name", name, "quantity", quantity, "price", price, "image", image);
    

    const newMeal = await MealModel.create({
      name: name,
      quantity: quantity,
      price: price,
      image: image
    });
    console.log("newMeal", newMeal);
    
    return JSON.parse(JSON.stringify(newMeal));
  } catch (error) {
    console.log(error);
  }
}

export const getAllMeals = async () => {
  try {
    await connectToDatabase();

    const meals = await MealModel.find();

    return JSON.parse(JSON.stringify(meals));
  } catch (error) {
    console.log(error);
  }
}