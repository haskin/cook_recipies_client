import { Ingredient } from './Ingredient';
import { Instruction } from './Instruction';

export interface Recipe {
  id?: number;
  name: string;
  instructions: Instruction[];
  image: string;
  ingredients: Ingredient[];
}
