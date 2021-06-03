import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ActiveCartService,
  ConsignmentEntry,
  FeatureConfigService,
  MultiCartService,
  OrderEntry,
  PromotionLocation,
  SelectiveCartService,
  UserIdService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CartItemComponentOptions } from '../cart-item/cart-item.component';

@Component({
  selector: 'cx-cart-item-list',
  templateUrl: './cart-item-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemListComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();
  protected userId: string;

  @Input() readonly: boolean = false;

  @Input() hasHeader: boolean = true;

  @Input() options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };

  @Input() cartId: string;

  private _items: OrderEntry[] = [];
  form: FormGroup = this.featureConfigService?.isLevel('3.1')
    ? new FormGroup({})
    : undefined;

  @Input('items')
  set items(items: OrderEntry[]) {
    this.resolveItems(items);
    this.createForm();
  }
  get items(): OrderEntry[] {
    return this._items;
  }

  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  @Input('cartIsLoading') set setLoading(value: boolean) {
    if (!this.readonly) {
      // Whenever the cart is loading, we disable the complete form
      // to avoid any user interaction with the cart.
      value
        ? this.form.disable({ emitEvent: false })
        : this.form.enable({ emitEvent: false });
    }
  }

  /**
   * @deprecated since version 3.1
   * Use constructor(activeCartService: ActiveCartService, selectiveCartService: SelectiveCartService, featureConfigService: FeatureConfigService, userIdService: UserIdService, multiCartService: MultiCartService); instead
   */
  // TODO(#11037): Remove deprecated constructors
  constructor(
    activeCartService: ActiveCartService,
    selectiveCartService: SelectiveCartService
  );

  /**
   * @deprecated since version 3.2
   * Use constructor(activeCartService: ActiveCartService, selectiveCartService: SelectiveCartService, featureConfigService: FeatureConfigService, userIdService: UserIdService, multiCartService: MultiCartService); instead
   */
  // TODO(#11037): Remove deprecated constructors
  constructor(
    activeCartService: ActiveCartService,
    selectiveCartService: SelectiveCartService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    featureConfigService: FeatureConfigService
  );

  constructor(
    activeCartService: ActiveCartService,
    selectiveCartService: SelectiveCartService,
    featureConfigService: FeatureConfigService,
    userIdService: UserIdService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    multiCartService: MultiCartService
  );

  constructor(
    protected activeCartService: ActiveCartService,
    protected selectiveCartService: SelectiveCartService,
    public featureConfigService?: FeatureConfigService,
    protected userIdService?: UserIdService,
    protected multiCartService?: MultiCartService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userIdService
        ?.getUserId()
        .subscribe((userId) => (this.userId = userId))
    );
  }

  /**
   * Resolves items passed to component input and updates 'items' field
   */
  protected resolveItems(items: OrderEntry[]): void {
    if (!items) {
      this._items = [];
      return;
    }

    // The items we're getting from the input do not have a consistent model.
    // In case of a `consignmentEntry`, we need to normalize the data from the orderEntry.
    if (items.every((item) => item.hasOwnProperty('orderEntry'))) {
      this._items = items.map((consignmentEntry) => {
        const entry = Object.assign(
          {},
          (consignmentEntry as ConsignmentEntry).orderEntry
        );
        entry.quantity = consignmentEntry.quantity;
        return entry;
      });
    } else {
      // We'd like to avoid the unnecessary re-renders of unchanged cart items after the data reload.
      // OCC cart entries don't have any unique identifier that we could use in Angular `trackBy`.
      // So we update each array element to the new object only when it's any different to the previous one.
      if (this.featureConfigService?.isLevel('3.1')) {
        for (let i = 0; i < Math.max(items.length, this._items.length); i++) {
          // Checking if previous item is different than new one
          if (JSON.stringify(this._items?.[i]) !== JSON.stringify(items[i])) {
            // Removing obsolete item's form control
            if (this._items[i] && this.form) {
              this.form.removeControl(this.getControlName(this._items[i]));
            }
            // If given index does not exist in new items list, remove old element on this position. Otherwise, update array element with new item value.
            if (!items[i]) {
              this._items.splice(i, 1);
            } else {
              this._items[i] = items[i];
            }
          }
        }
      } else {
        this._items = items;
      }
    }
  }

  /**
   * Creates form models for list items
   */
  protected createForm(): void {
    if (!this.featureConfigService?.isLevel('3.1')) {
      this.form = new FormGroup({});
    }

    this._items.forEach((item) => {
      const controlName = this.getControlName(item);
      const group = new FormGroup({
        entryNumber: new FormControl(item.entryNumber),
        quantity: new FormControl(item.quantity, { updateOn: 'blur' }),
      });

      this.form.addControl(controlName, group);

      // If we disable form group before adding, disabled status will reset
      // Which forces us to disable control after including to form object
      if (!item.updateable || this.readonly) {
        this.form.controls[controlName].disable();
      }
    });
  }

  protected getControlName(item: OrderEntry): string {
    return item.entryNumber.toString();
  }

  removeEntry(item: OrderEntry): void {
    if (this.selectiveCartService && this.options.isSaveForLater) {
      this.selectiveCartService.removeEntry(item);
    } else if (this.cartId && this.userId) {
      this.multiCartService?.removeEntry(
        this.userId,
        this.cartId,
        item.entryNumber
      );
    } else {
      this.activeCartService.removeEntry(item);
    }
    delete this.form.controls[this.getControlName(item)];
  }

  getControl(item: OrderEntry): Observable<FormGroup> {
    return this.form.get(this.getControlName(item)).valueChanges.pipe(
      // eslint-disable-next-line import/no-deprecated
      startWith(null),
      map((value) => {
        if (value && this.selectiveCartService && this.options.isSaveForLater) {
          this.selectiveCartService.updateEntry(
            value.entryNumber,
            value.quantity
          );
        } else if (value && this.cartId && this.userId) {
          this.multiCartService?.updateEntry(
            this.userId,
            this.cartId,
            value.entryNumber,
            value.quantity
          );
        } else if (value) {
          this.activeCartService.updateEntry(value.entryNumber, value.quantity);
        }
      }),
      map(() => <FormGroup>this.form.get(this.getControlName(item)))
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
