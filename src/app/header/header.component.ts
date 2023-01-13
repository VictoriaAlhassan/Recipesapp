import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    public authService: AuthService
  ) {}

  private recipes: Recipe[] = [];

  onNavigate(path: string) {
    this.router.navigate([`/${path}`]);
    // console.log('shopping list');
  }
  fetchRecipes() {
    this.recipeService.onFetchData();
  }
  saveRecipes() {
    this.recipeService.onSaveData().subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
