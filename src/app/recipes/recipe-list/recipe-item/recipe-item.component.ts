import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input()
  recipe!: Recipe;
  @Input()
  index!: number;

  @Output() itemClick: EventEmitter<any> = new EventEmitter();

  onItemClick() {
    this.itemClick.emit(this.recipe);
  }
}
