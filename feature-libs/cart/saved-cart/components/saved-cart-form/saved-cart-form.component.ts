import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SavedCartService } from '../../core/services/saved-cart.service';

@Component({
  selector: 'cx-saved-cart-form',
  templateUrl: './saved-cart-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartFormComponent implements OnInit {
  cart$: Observable<Cart>;
  form: FormGroup;
  iconTypes = ICON_TYPE;
  isLoading$: Observable<boolean>;

  descriptionMaxLength: number = 500;
  nameMaxLength: number = 50;

  protected isEdition = false;

  constructor(
    protected savedCartService: SavedCartService,
    protected launchDialogService: LaunchDialogService
  ) {}

  ngOnInit(): void {
    this.build();
    this.cart$ = this.launchDialogService.data$.pipe(
      tap((cart: Cart) => {
        this.fillForm(cart);
      })
    );
    this.isLoading$ = this.savedCartService.getSaveCartProcessLoading();
  }

  get descriptionsCharacterLeft(): number {
    return (
      this.descriptionMaxLength -
      (this.form.get('description')?.value?.length || 0)
    );
  }

  saveCart(cartCode: string): void {
    const cartId = cartCode;
    const saveCartDescription = this.form.get('description')?.value;
    const saveCartName = this.form.get('name')?.value;
    const extraData = {
      edit: this.isEdition,
    };

    this.savedCartService.saveCart({
      cartId,
      saveCartName,
      saveCartDescription,
      extraData,
    });
  }

  dismissModal(): void {
    this.close('Cancel click');
  }

  protected fillForm(cart: Cart): void {
    if (cart.saveTime) {
      const cartName = cart.name || '';
      const cartDescription = cart.description || '';

      this.form.get('name')?.setValue(cartName);
      this.form.get('description')?.setValue(cartDescription);

      this.isEdition = true;
    }
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

  protected close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
