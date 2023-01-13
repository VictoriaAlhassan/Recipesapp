import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f', { static: false })
  slForm!: NgForm;

  startEditSub!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editItem!: Ingredients;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.startEditSub = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngredientsbyIndex(index);

        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIng = new Ingredients(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredients(this.editedItemIndex, newIng);
    } else {
      this.shoppingListService.addIngredients(newIng);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredients(this.editedItemIndex);
    this.onClear();
  }
}
