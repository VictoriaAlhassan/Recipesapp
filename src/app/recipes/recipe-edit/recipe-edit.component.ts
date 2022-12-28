import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Recipe } from 'src/app/recipe';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;
  recipes: Recipe[] = [];
  showForm: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.recipeForm = this.createRecipeForm();
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
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
}
