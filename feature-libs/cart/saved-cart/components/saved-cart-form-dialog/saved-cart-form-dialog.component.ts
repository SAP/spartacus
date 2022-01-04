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
  SavedCartFacade,
  SavedCartFormType,
} from '@spartacus/cart/saved-cart/root';
import {
  Cart,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import {
  FocusConfig,
  FormUtils,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { combineLatest, merge, Observable, Subscription } from 'rxjs';
import { map, mapTo, take } from 'rxjs/operators';

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
  isCloneSavedCart = false;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  isLoading$: Observable<boolean>;
  isDisableDeleteButton$: Observable<boolean>;
  isDisableRestoreButton$: Observable<boolean>;

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
    protected savedCartService: SavedCartFacade,
    protected eventService: EventService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.resetSavedCartStates();

    this.isLoading$ = this.savedCartService.getSaveCartProcessLoading();

    this.isDisableDeleteButton$ = merge(
      this.eventService.get(DeleteSavedCartEvent).pipe(take(1), mapTo(true)),
      this.eventService
        .get(DeleteSavedCartFailEvent)
        .pipe(take(1), mapTo(false))
    );

    this.isDisableRestoreButton$ = combineLatest([
      this.savedCartService.getCloneSavedCartProcessLoading(),
      this.savedCartService.getRestoreSavedCartProcessLoading(),
    ]).pipe(
      map(
        ([isCloneLoading, isRestoreLoading]) =>
          isCloneLoading || isRestoreLoading
      )
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

    this.subscription.add(
      this.savedCartService
        .getRestoreSavedCartProcessSuccess()
        .subscribe((success) => this.onComplete(success))
    );
  }

  saveOrEditCart(cartId: string): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(this.form);
    } else {
      const name = this.form.get('name')?.value;
      // TODO(#12660): Remove default value once backend is updated
      const description = this.form.get('description')?.value || '-';

      switch (this.layoutOption) {
        case SavedCartFormType.SAVE: {
          this.savedCartService.saveCart({
            cartId,
            saveCartName: name,
            saveCartDescription: description,
          });

          break;
        }

        case SavedCartFormType.EDIT: {
          this.savedCartService.editSavedCart({
            cartId,
            saveCartName: name,
            saveCartDescription: description,
          });

          break;
        }
      }
    }
  }

  deleteCart(cartId: string): void {
    this.savedCartService.deleteSavedCart(cartId);
  }

  restoreSavedCart(cartId: string): void {
    if (this.isCloneSavedCart) {
      this.savedCartService.cloneSavedCart(
        cartId,
        this.form.get('cloneName')?.value
      );
    } else {
      this.savedCartService.restoreSavedCart(cartId);
    }
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
          this.close('Successfully deleted a saved cart');

          break;
        }

        case SavedCartFormType.SAVE: {
          this.close('Successfully saved cart');
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
          this.close('Successfully edited saved cart');
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

        case SavedCartFormType.RESTORE: {
          this.close('Successfully restored saved cart');
          this.routingService.go({ cxRoute: 'savedCarts' });

          this.resetSavedCartStates();

          break;
        }
      }
    }
  }

  toggleIsCloneSavedCart() {
    return (this.isCloneSavedCart = !this.isCloneSavedCart);
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
    form.setControl('isCloneSavedCart', new FormControl(''));
    form.setControl('cloneName', new FormControl(''));
    this.form = form;
    this.patchData(cart);
  }

  protected patchData(item?: any): void {
    this.form.patchValue({ ...item });
  }

  private resetSavedCartStates(): void {
    this.savedCartService.clearCloneSavedCart();
    this.savedCartService.clearSaveCart();
    this.savedCartService.clearRestoreSavedCart();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.close('close dialog');
  }
}
