import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Cart } from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SavedCartService } from '../../core/services/saved-cart.service';
import { SavedCartFormService } from './saved-cart-form.service';

@Component({
  selector: 'cx-saved-cart-form',
  templateUrl: './saved-cart-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartFormComponent implements OnInit {
  cart$: Observable<Cart>;
  form: FormGroup = this.savedCartFormService.getForm();
  iconTypes = ICON_TYPE;
  isLoading$: Observable<boolean>;

  protected isEdition = false;

  constructor(
    public savedCartFormService: SavedCartFormService,
    protected savedCartService: SavedCartService,
    protected launchDialogService: LaunchDialogService
  ) {}

  ngOnInit(): void {
    this.cart$ = this.launchDialogService.data$.pipe(
      tap((cart: Cart) => {
        this.fillForm(cart);
      })
    );
    this.isLoading$ = this.savedCartService.getSaveCartProcessLoading();
  }

  get descriptionsCharacterLeft(): number {
    return (
      this.savedCartFormService.descriptionMaxLength -
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
      this.form = this.savedCartFormService.getForm(cart);
      this.isEdition = true;
    }
  }

  protected close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
