import { Component } from '@angular/core';
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

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
  showForm: boolean = false;
  preview: string = '';
  recipeForm!: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.recipeForm = this.createRecipeForm();
  }

  addRecipe() {
    this.recipes.push(this.recipeForm.value);
    console.log(this.recipeForm.value);
  }

  createRecipeForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ingredients = new FormArray([]);

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }
}
