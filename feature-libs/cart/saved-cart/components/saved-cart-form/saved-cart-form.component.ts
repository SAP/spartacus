import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { SavedCartService } from '../../core/services/saved-cart.service';

@Component({
  selector: 'cx-saved-cart-form',
  templateUrl: './saved-cart-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartFormComponent implements OnInit {
  form: FormGroup;
  iconTypes = ICON_TYPE;
  cart$: Observable<Cart>;

  descriptionMaxLength: number = 500;
  nameMaxLength: number = 50;

  ngOnInit(): void {
    this.cart$ = this.launchDialogService.data$;
    this.build();
  }

  constructor(
    protected savedCartService: SavedCartService,
    protected launchDialogService: LaunchDialogService
  ) {}

  get descriptionsCharacterLeft(): number {
    return (
      this.descriptionMaxLength -
      (this.form.get('description')?.value?.length || 0)
    );
  }

  saveCart(cartCode: string): void {
    const cartId = cartCode;
    const cartDescription = this.form.get('description')?.value;
    const cartName = this.form.get('name')?.value;

    this.savedCartService.saveCart(cartId, cartDescription, cartName);
  }

  dismissModal(): void {
    this.close('Cancel click');
  }

  protected build() {
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
