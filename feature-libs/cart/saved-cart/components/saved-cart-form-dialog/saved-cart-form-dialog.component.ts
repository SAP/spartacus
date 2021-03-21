import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  SavedCartEventsService,
  SavedCartFormType,
  SavedCartService,
} from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { mapTo, take } from 'rxjs/operators';

export interface SavedCartFormDialogOptions {
  cart: Cart;
  layoutOption?: string;
}

@Component({
  selector: 'cx-saved-cart-form-dialog',
  templateUrl: './saved-cart-form-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartFormDialogComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  savedCartFormType = SavedCartFormType;
  form: FormGroup;
  iconTypes = ICON_TYPE;
  cart: Cart;
  layoutOption: string | undefined;

  descriptionMaxLength: number = 250;
  nameMaxLength: number = 50;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  isLoading$: Observable<boolean>;

  get descriptionsCharacterLeft(): number {
    return (
      this.descriptionMaxLength -
      (this.form.get('description')?.value?.length || 0)
    );
  }

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    // Close on click outside the dialog window
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.close('Cross click');
    }
  }

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef,
    protected savedCartService: SavedCartService,
    protected savedCartEventsService: SavedCartEventsService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.savedCartService.getSaveCartProcessLoading();

    this.subscription.add(
      this.launchDialogService.data$.subscribe(
        (data: SavedCartFormDialogOptions) => {
          this.cart = data.cart;
          this.layoutOption = data.layoutOption;

          this.build(this.cart);
        }
      )
    );

    this.subscription.add(
      this.savedCartService
        .getSaveCartProcessSuccess()
        .subscribe((success) => this.onSuccess(success, SavedCartFormType.EDIT))
    );

    this.subscription.add(
      this.savedCartEventsService
        .getDeleteSavedCartSuccessEvent()
        .pipe(take(1), mapTo(true))
        .subscribe((success) =>
          this.onSuccess(success, SavedCartFormType.DELETE)
        )
    );
  }

  saveOrEditCart(cartId: string): void {
    this.savedCartService.saveCart({
      cartId,
      saveCartName: this.form.get('name')?.value,
      saveCartDescription: this.form.get('description')?.value,
      extraData: !this.layoutOption ? { edit: false } : { edit: true },
    });
  }

  deleteCart(cartId: string): void {
    this.savedCartService.deleteSavedCart(cartId);
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  onSuccess(success: boolean, saveCartAction: string): void {
    if (success) {
      switch (saveCartAction) {
        case SavedCartFormType.DELETE: {
          this.routingService.go({ cxRoute: 'savedCarts' });
          this.globalMessageService.add(
            {
              key: 'savedCartDialog.deleteCartSuccess',
            },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
          this.close('Succesfully deleted a saved cart');

          break;
        }

        case SavedCartFormType.SAVE: {
          this.close('Succesfully saved cart');
          this.savedCartService.clearSaveCart();
          this.savedCartService.clearRestoreSavedCart();

          this.globalMessageService.add(
            {
              key: !this.layoutOption
                ? 'savedCartCartPage.messages.cartSaved'
                : 'savedCartDialog.editCartSuccess',
              params: {
                cartName: this.form.get('name')?.value || this.cart?.code,
              },
            },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );

          break;
        }
      }
    }
  }

  protected build(cart?: Cart) {
    const form = new FormGroup({});
    form.setControl(
      'name',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(this.nameMaxLength),
      ])
    );
    form.setControl(
      'description',
      new FormControl('', [Validators.maxLength(this.descriptionMaxLength)])
    );
    this.form = form;
    this.patchData(cart);
  }

  protected patchData(item?: any): void {
    this.form.patchValue({ ...item });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
