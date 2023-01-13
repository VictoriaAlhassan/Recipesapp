import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
// import { RecipeResolveService } from './recipes.resolve.service';

// Make recipe-edit, recipe-detail and recipe-start child routes of recipe
//  (but let recipe-list render in the main recipe component)
// Add style an active route by adding
// the "active" to the element using the appropriate attribute.

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'recipes',
    component: RecipesComponent,
    // resolve: { recipes: RecipeResolveService },
    canActivate: [AuthGuard],
    children: [
      // { path: 'home', component: RecipesComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
  },

  // { path: 'recipe', component: RecipesComponent },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((x) => x.UserModule),
  },
  // { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
