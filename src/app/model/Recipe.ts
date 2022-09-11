import { Ingredient } from './Ingredient';

export interface Recipe {
  id?: number;
  name: string;
  instructions: string;
  image: string;
  ingredients: Ingredient[];
}
