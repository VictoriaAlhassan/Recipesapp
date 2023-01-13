import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

// @Injectable()
// export class RecipeResolveService implements Resolve<any> {
//   constructor(private recipeService: RecipeService) {}
//
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
// return this.recipeService.getRecipes().then((recipes) => {
//   return recipes;
// });
//   }
// }
