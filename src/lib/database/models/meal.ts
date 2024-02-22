import { Document, Schema, model, models, InferSchemaType } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
// interface IMeal {
//   name: string;
//   quantity: number;
//   price: number;
//   image: string;
// }

// 2. Create a Schema corresponding to the document interface.
const mealSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export type Meal = InferSchemaType<typeof mealSchema>;
// 3. Create a Model.
export const MealModel = model('Meal', mealSchema);
