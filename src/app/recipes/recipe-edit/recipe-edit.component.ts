import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/recipe';
import { RecipeService } from 'src/app/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;
  showForm: boolean = false;
  recipeChangSub: Subscription = new Subscription();
  recipe!: Recipe;
  action: 'create' | 'update' = 'create';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private httpClient: HttpClient
  ) {
    this.recipeForm = this.createRecipeForm();
    this.activatedRoute.params.subscribe((param) => {
      this.id = +param['id'];
      this.recipe = this.recipeService.getRecipesbyIndex(this.id);
      if (this.recipe) {
        this.action = 'update';
        this.patchRecipeForm(this.recipe);
      }
      console.log(this.id);
    });
  }
  ngOnInit(): void {}

  addRecipe() {
    if (this.action == 'create') {
      this.recipeService.addRecipes(this.recipeForm.value);

      console.log(this.recipeForm.value);
      this.recipeForm.reset();
    } else if (this.action == 'update') {
      this.recipeService.updateRecipes(this.id, this.recipeForm.value);

      this.recipeForm.reset();
      this.action = 'create';
      this.recipe = null;
    }
  }
  createRecipeForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.formBuilder.array([]),
    });
  }
  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(
      this.formBuilder.group({
        name: ['', Validators.required],
        amount: ['', Validators.required],
      })
    );
  }
  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }
  patchRecipeForm(recipe: Recipe) {
    this.recipeForm.patchValue(recipe);
    this.recipeForm.setControl(
      'ingredients',
      this.formBuilder.array(
        recipe.ingredients.map((ingredient) => {
          return this.formBuilder.group({
            name: [ingredient.name, Validators.required],
            amount: [ingredient.amount, Validators.required],
          });
        })
      )
    );
  }
}
