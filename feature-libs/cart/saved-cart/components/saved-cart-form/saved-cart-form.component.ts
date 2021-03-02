import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

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

  ngOnInit() {
    this.cart$ = this.launchDialogService.data$;
    this.build();
  }

  constructor(protected launchDialogService: LaunchDialogService) {}

  get descriptionsCharacterLeft(): number {
    return (
      this.descriptionMaxLength -
      (this.form.get('description')?.value?.length || 0)
    );
  }

  saveCart(): void {
    // TODO: ?
  }

  dismissModal(): void {
    this.close('Cancel click');
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
