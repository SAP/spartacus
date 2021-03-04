import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { SavedCartFormType } from '../../core/model/saved-cart.model';

@Component({
  selector: 'cx-saved-cart-form-dialog',
  templateUrl: './saved-cart-form-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartFormDialogComponent implements OnInit {
  private subscription = new Subscription();

  savedCartFormType = SavedCartFormType;
  form: FormGroup;
  iconTypes = ICON_TYPE;
  cart: Cart;
  layoutOption: string;

  descriptionMaxLength: number = 500;
  nameMaxLength: number = 50;

  constructor(protected launchDialogService: LaunchDialogService) {}

  ngOnInit() {
    this.subscription.add(
      this.launchDialogService.data$.subscribe((data) => {
        this.cart = data.cart;
        this.layoutOption = data.layoutOption;
      })
    );
    this.build();
  }

  get descriptionsCharacterLeft(): number {
    return (
      this.descriptionMaxLength -
      (this.form.get('description')?.value?.length || 0)
    );
  }

  saveCart(): void {
    // TODO: ?
  }

  protected build(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.nameMaxLength),
      ]),
      description: new FormControl('', [
        Validators.maxLength(this.descriptionMaxLength),
      ]),
    });
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
