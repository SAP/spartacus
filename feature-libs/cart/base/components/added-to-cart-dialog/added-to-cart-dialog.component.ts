/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  ActiveCartFacade,
  Cart,
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { RoutingService } from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable, Subscription, of } from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

export interface AddedToCartDialogComponentData {
  productCode: string;
  quantity: number;
  numberOfEntriesBeforeAdd: number;
  pickupStoreName?: string;
  /**
   * Observable emitting the result of adding an item to cart. It emits either
   * {@link CartAddEntrySuccessEvent} or {@link CartAddEntryFailEvent)
   */
  addingEntryResult$?: Observable<
    CartAddEntrySuccessEvent | CartAddEntryFailEvent
  >;
}
@Component({
  selector: 'cx-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddedToCartDialogComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;

  entry$: Observable<OrderEntry | undefined>;
  cart$: Observable<Cart> = this.activeCartFacade.getActive();
  loaded$: Observable<boolean> = this.activeCartFacade.isStable();
  addedEntryWasMerged$: Observable<boolean>;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  quantity = 0;
  pickupStoreName: string | undefined;

  form: UntypedFormGroup = new UntypedFormGroup({});

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.dismissModal('Cross click');
    }
  }

  protected quantityControl$: Observable<UntypedFormControl>;

  protected subscription = new Subscription();

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected launchDialogService: LaunchDialogService,
    protected routingService: RoutingService,
    protected el: ElementRef
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe(
        (dialogData: AddedToCartDialogComponentData) => {
          this.init(
            dialogData.productCode,
            dialogData.quantity,
            dialogData.numberOfEntriesBeforeAdd,
            dialogData.pickupStoreName,
            dialogData.addingEntryResult$
          );
        }
      )
    );
    this.subscription.add(
      this.routingService
        .getRouterState()
        .pipe(filter((state) => !!state.nextState))
        .subscribe(() => this.dismissModal('dismiss'))
    );
  }

  /**
   * Returns an observable formControl with the quantity of the cartEntry,
   * but also updates the entry in case of a changed value.
   * The quantity can be set to zero in order to remove the entry.
   */
  getQuantityControl(): Observable<UntypedFormControl> {
    if (!this.quantityControl$) {
      this.quantityControl$ = this.entry$.pipe(
        filter((e) => !!e),
        map((entry) => this.getQuantityFormControl(entry)),
        switchMap(() =>
          this.form.valueChanges.pipe(
            // eslint-disable-next-line import/no-deprecated
            startWith(null),
            tap((valueChange) => {
              if (valueChange) {
                this.activeCartFacade.updateEntry(
                  valueChange.entryNumber,
                  valueChange.quantity
                );
                if (valueChange.quantity === 0) {
                  this.dismissModal('Removed');
                }
              } else {
                this.form.markAsPristine();
              }
            })
          )
        ),
        map(() => <UntypedFormControl>this.form.get('quantity')),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.quantityControl$;
  }

  init(
    productCode: string,
    quantity: number,
    numberOfEntriesBeforeAdd: number,
    pickupStoreName?: string,
    addingEntryResult$?: Observable<
      CartAddEntrySuccessEvent | CartAddEntryFailEvent
    >
  ): void {
    // Display last entry for new product code. This always corresponds to
    // our new item, independently of whether merging occured or not
    const productCode$: Observable<string> = addingEntryResult$
      ? // get the product code from the backend response, because it might be different
        // from the requested product code. That can e.g. happen for certain kinds of product variants
        addingEntryResult$.pipe(
          filter((event) => event instanceof CartAddEntrySuccessEvent),
          map((event) => {
            const productCodeFromEntry = (event as CartAddEntrySuccessEvent)
              .entry?.product?.code;
            return productCodeFromEntry
              ? productCodeFromEntry
              : event.productCode;
          })
        )
      : of(productCode);

    this.entry$ = productCode$.pipe(
      switchMap((code) => this.activeCartFacade.getLastEntry(code))
    );

    this.quantity = quantity;

    this.pickupStoreName = pickupStoreName;

    this.addedEntryWasMerged$ = this.getAddedEntryWasMerged(
      numberOfEntriesBeforeAdd
    );
  }
  /**
   * Determines if the added entry was merged with an existing one.
   *
   * @param numberOfEntriesBeforeAdd Number of entries in cart before addToCart has been performed
   * @returns Has entry been merged?
   */
  protected getAddedEntryWasMerged(
    numberOfEntriesBeforeAdd: number
  ): Observable<boolean> {
    return this.loaded$.pipe(
      filter((loaded) => loaded),
      switchMap(() => this.activeCartFacade.getEntries()),
      map((entries) => entries.length === numberOfEntriesBeforeAdd)
    );
  }

  /**
   * Adds quantity and entryNumber form controls to the FormGroup.
   * Returns quantity form control.
   */
  protected getQuantityFormControl(entry?: OrderEntry): UntypedFormControl {
    if (!this.form.get('quantity')) {
      const quantity = new UntypedFormControl(entry?.quantity, {
        updateOn: 'blur',
      });
      this.form.addControl('quantity', quantity);

      const entryNumber = new UntypedFormControl(entry?.entryNumber);
      this.form.addControl('entryNumber', entryNumber);
    } else {
      // set the real quantity added to cart
      this.form.get('quantity')?.setValue(entry?.quantity);
    }

    return <UntypedFormControl>this.form.get('quantity');
  }

  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  onAction(action: 'viewCart' | 'checkout'): void {
    const actionDetails = {
      viewCart: {
        reason: 'View Cart click',
        cxRoute: 'cart',
      },
      checkout: {
        reason: 'Proceed To Checkout click',
        cxRoute: 'checkout',
      },
    };

    const { reason, cxRoute } = actionDetails[action];
    this.routingService.go({ cxRoute });
    this.dismissModal(reason);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
