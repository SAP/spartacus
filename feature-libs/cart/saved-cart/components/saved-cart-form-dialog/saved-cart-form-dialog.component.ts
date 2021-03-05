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
import { Subscription } from 'rxjs';
import { SavedCartFormType } from '../../core/model/saved-cart.model';
import { SavedCartService } from '../../core/services/saved-cart.service';

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
    protected el: ElementRef,
    protected savedCartService: SavedCartService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.build();

    this.subscription.add(
      this.launchDialogService.data$.subscribe((data) => {
        this.cart = data.cart;
        this.layoutOption = data.layoutOption;
      })
    );

    this.subscription.add(
      this.savedCartService
        .getSaveCartProcessSuccess()
        .subscribe((success) => this.onSuccess(success, SavedCartFormType.EDIT))
    );
  }

  get descriptionsCharacterLeft(): number {
    return (
      this.descriptionMaxLength -
      (this.form.get('description')?.value?.length || 0)
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
    // TODO: replace logic and use the DeleteCartEvents when they're available.
    // race condition (thinking of a fix)
    this.savedCartService.deleteSavedCart(cartId);
    this.routingService.go({ cxRoute: 'savedCartDetails' });
    this.globalMessageService.add(
      {
        key: 'savedCartDialog.deleteCartSuccess',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  onSuccess(success: boolean, saveCartAction: string): void {
    if (success) {
      switch (saveCartAction) {
        case SavedCartFormType.DELETE: {
          // when events become available
          break;
        }

        default: {
          this.close('Succesfully saved cart');
          this.savedCartService.clearSaveCart();

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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
