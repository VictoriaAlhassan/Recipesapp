import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes/recipes.component';

// Make recipe-edit, recipe-detail and recipe-start child routes of recipe
//  (but let recipe-list render in the main recipe component)
// Add style an active route by adding
// the "active" to the element using the appropriate attribute.

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
