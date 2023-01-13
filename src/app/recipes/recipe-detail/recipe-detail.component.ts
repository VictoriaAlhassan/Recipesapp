import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from 'src/app/recipe';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Ingredients } from 'src/app/ingredients.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipe!: Recipe;
  @Output() recipeChange = new EventEmitter<Recipe>();
  @Output() recipeRemove = new EventEmitter<Recipe>();
  errorMessage: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.getItemDetails(this.id);
    });
  }

  getItemDetails(id: number) {
    if (Number.isFinite(id)) {
      this.recipe = this.recipeService.getRecipesbyIndex(id);
      console.log(this.recipe);
      console.log(id);
    } else {
      this.errorMessage = 'The Url you navigated to is invalid';
    }
  }
  ngOnInit(): void {}
  removeRecipe() {
    this.recipeService.deleteRecipes(this.id);
    this.router.navigate(['recipes']);
  }

  recipeEdit() {
    this.router.navigate([`recipes/${this.id}/edit`]);
  }
  toShoppingList() {
    this.shoppingListService.addIngredientsArray(this.recipe.ingredients);
  }
}
