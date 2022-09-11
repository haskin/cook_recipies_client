import { Injectable } from '@angular/core';
import { Ingredient } from '../model/Ingredient';

@Injectable({
  providedIn: 'root',
})
export class UpdateRecipeService {
  private readonly DELIMETER = '|';
  constructor() {}

  convertInstructionStringToArray(instructionString: string): string[] {
    return instructionString.split(this.DELIMETER);
  }
}
