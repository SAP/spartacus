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
  DeleteSavedCartEvent,
  DeleteSavedCartFailEvent,
  DeleteSavedCartSuccessEvent,
  SavedCartFormType,
  SavedCartService,
} from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  ClearCheckoutService,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { merge, Observable, Subscription } from 'rxjs';
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
  isDisableDeleteButton$: Observable<boolean>;

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
    protected eventService: EventService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected clearCheckoutService: ClearCheckoutService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.savedCartService.getSaveCartProcessLoading();

    this.isDisableDeleteButton$ = merge(
      this.eventService.get(DeleteSavedCartEvent).pipe(take(1), mapTo(true)),
      this.eventService
        .get(DeleteSavedCartFailEvent)
        .pipe(take(1), mapTo(false))
    );

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
        .subscribe((success) => this.onComplete(success))
    );

    this.subscription.add(
      this.eventService
        .get(DeleteSavedCartSuccessEvent)
        .pipe(take(1), mapTo(true))
        .subscribe((success) => this.onComplete(success))
    );
  }

  saveOrEditCart(cartId: string): void {
    switch (this.layoutOption) {
      case SavedCartFormType.SAVE: {
        this.savedCartService.saveCart({
          cartId,
          saveCartName: this.form.get('name')?.value,
          saveCartDescription: this.form.get('description')?.value,
        });

        break;
      }

      case SavedCartFormType.EDIT: {
        this.savedCartService.editSavedCart({
          cartId,
          saveCartName: this.form.get('name')?.value,
          saveCartDescription: this.form.get('description')?.value,
        });

        break;
      }
    }
  }

  deleteCart(cartId: string): void {
    this.savedCartService.deleteSavedCart(cartId);
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  onComplete(success: boolean): void {
    if (success) {
      switch (this.layoutOption) {
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
          this.clearCheckoutService.resetCheckoutProcesses();
          this.savedCartService.clearSaveCart();

          this.globalMessageService.add(
            {
              key: 'savedCartCartPage.messages.cartSaved',
              params: {
                cartName: this.form.get('name')?.value || this.cart?.code,
              },
            },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );

          break;
        }

        case SavedCartFormType.EDIT: {
          this.close('Succesfully edited saved cart');
          this.savedCartService.clearSaveCart();
          this.globalMessageService.add(
            {
              key: 'savedCartDialog.editCartSuccess',
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
    this.close('close dialog');
  }
}
