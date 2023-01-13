import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Recipe } from 'src/app/recipe';
import { RecipeService } from 'src/app/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {
    // console.log('this is recipe list');
  }
  ngOnInit(): void {
    this.getRecipes();
    this.recipeService.onFetchData();
    // this.recipes = this.route.snapshot.data['/recipes'];
  }

  newRecipe() {
    this.router.navigate(['/recipes/new']);
  }

  getRecipes() {
    this.recipeService.recipesChanged.subscribe((recipes) => {
      this.recipes = recipes;
      console.log(recipes);
    });
  }
}
