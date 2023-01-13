import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  startedEditing = new Subject<number>();

  private recipes: Recipe[] = [];
  constructor(private httpClient: HttpClient) {}

  getRecipes() {
    return this.recipes;
  }

  allRecipes() {
    return this.recipesChanged.asObservable();
  }
  getRecipesbyIndex(index: number) {
    return this.recipes[index];
  }

  addRecipes(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }
  addRecipesArray(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes);
    console.log(recipes);
  }
  updateRecipes(index: number, newRecipe: Recipe) {
    console.log(index, newRecipe);
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes);
  }

  deleteRecipes(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes);
  }

  onFetchData() {
    this.httpClient
      .get<Recipe[]>(
        'https://recipe-book-97166-default-rtdb.firebaseio.com/recipes.json'
      )
      .subscribe((recipes) => {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes);

        console.log(this.recipes);
      });
  }

  onSaveData() {
    const recipes = this.getRecipes();
    console.log(recipes);
    return this.httpClient.put(
      'https://recipe-book-97166-default-rtdb.firebaseio.com/recipes.json',
      recipes
    );
  }
}
