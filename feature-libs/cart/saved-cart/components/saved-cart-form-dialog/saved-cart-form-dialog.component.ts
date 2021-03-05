import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
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

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    // Close on click outside the dialog window
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.close('Cross click');
    }
  }

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef
  ) {}

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
