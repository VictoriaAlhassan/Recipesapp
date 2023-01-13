import { Ingredients } from '../ingredients.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredients[]>();
  startedEditing = new Subject<number>();

  constructor() {}

  private ingredients: Ingredients[] = [
    new Ingredients('fish', 4),
    new Ingredients('beans', 4),
  ];

  getIngredients() {
    return this.ingredients;
  }

  getIngredientsbyIndex(index: number) {
    return this.ingredients[index];
  }

  addIngredients(ing: Ingredients) {
    this.ingredients.push(ing);
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredientsArray(ingredients: Ingredients[]) {
    this.ingredients = [...this.ingredients, ...ingredients];
    this.ingredientsChanged.next(this.ingredients);
  }

  updateIngredients(index: number, newIng: Ingredients) {
    this.ingredients[index] = newIng;
    this.ingredientsChanged.next(this.ingredients);
  }

  deleteIngredients(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients);
  }
}
