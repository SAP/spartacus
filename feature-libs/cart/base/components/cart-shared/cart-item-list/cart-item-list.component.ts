import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ActiveCartFacade,
  CartItemComponentOptions,
  ConsignmentEntry,
  EntryGroup,
  MultiCartFacade,
  OrderEntry,
  PromotionLocation,
  SelectiveCartFacade,
} from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

interface ItemListContext {
  readonly?: boolean;
  hasHeader?: boolean;
  options?: CartItemComponentOptions;
  cartId?: string;
  items?: OrderEntry[];
  promotionLocation?: PromotionLocation;
  cartIsLoading?: boolean;
}

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
    displayAddToCart: false,
  };

  @Input() cartId: string;

  protected _items: OrderEntry[] = [];
  protected _bundles: EntryGroup[] = [];
  form: FormGroup = new FormGroup({});

  @Input('items')
  set items(items: OrderEntry[]) {
    this.resolveItems(items);
    this.createForm(items);
  }
  get items(): OrderEntry[] {
    return this._items;
  }

  @Input('bundles')
  set bundles(bundles: EntryGroup[]) {
    this._bundles = bundles;
    this.createBundleForm(bundles);
    for (let bundle of bundles) {
      this.createForm(bundle.entries ?? []);
    }
  }
  get bundles(): EntryGroup[] {
    return this._bundles;
  }

  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  @Input('cartIsLoading') set setLoading(value: boolean) {
    if (!this.readonly) {
      // Whenever the cart is loading, we disable the complete form
      // to avoid any user interaction with the cart.
      value
        ? this.form.disable({ emitEvent: false })
        : this.form.enable({ emitEvent: false });
      this.cd.markForCheck();
    }
  }

  constructor(
    protected activeCartService: ActiveCartFacade,
    protected selectiveCartService: SelectiveCartFacade,
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartFacade,
    protected cd: ChangeDetectorRef,
    @Optional() protected outlet?: OutletContextData<ItemListContext>
  ) {}

  ngOnInit(): void {
    this.subscription.add(this.getInputsFromContext());
    this.subscription.add(
      this.userIdService
        ?.getUserId()
        .subscribe((userId) => (this.userId = userId))
    );
  }

  protected getInputsFromContext(): Subscription | undefined {
    return this.outlet?.context$.subscribe((context) => {
      if (context.readonly !== undefined) {
        this.readonly = context.readonly;
      }
      if (context.hasHeader !== undefined) {
        this.hasHeader = context.hasHeader;
      }
      if (context.options !== undefined) {
        this.options = context.options;
      }
      if (context.cartId !== undefined) {
        this.cartId = context.cartId;
      }
      if (context.items !== undefined) {
        this.items = context.items;
      }
      if (context.promotionLocation !== undefined) {
        this.promotionLocation = context.promotionLocation;
      }
      if (context.cartIsLoading !== undefined) {
        this.setLoading = context.cartIsLoading;
      }
    });
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
      for (let i = 0; i < Math.max(items.length, this._items.length); i++) {
        if (JSON.stringify(this._items?.[i]) !== JSON.stringify(items[i])) {
          if (this._items[i] && this.form) {
            this.form.removeControl(this.getControlName(this._items[i]));
          }
          if (!items[i]) {
            this._items.splice(i, 1);
            i--;
          } else {
            this._items[i] = items[i];
          }
        }
      }
    }
  }

  /**
   * Creates form models for list items
   */
  protected createForm(items: OrderEntry[]): void {
    items.forEach((item) => {
      const controlName = this.getControlName(item);
      const control = this.form.get(controlName);
      if (control) {
        if (control.get('quantity')?.value !== item.quantity) {
          control.patchValue({ quantity: item.quantity }, { emitEvent: false });
        }
      } else {
        const group = new FormGroup({
          entryNumber: new FormControl(item.entryNumber),
          quantity: new FormControl(item.quantity, { updateOn: 'blur' }),
        });
        this.form.addControl(controlName, group);
      }

      // If we disable form group before adding, disabled status will reset
      // Which forces us to disable control after including to form object
      if (!item.updateable || this.readonly) {
        this.form.controls[controlName].disable();
      }
    });
  }

  protected createBundleForm(bundles: EntryGroup[]): void {
    bundles.forEach((bundle) => {
      const controlName = this.getBundleControlName(bundle);
      const control = this.form.get(controlName);
      if (control) {
        // @TODO: Change '1' to bundle.quantity (see this.createForm function)
        if (control.get('quantity')?.value !== 1) {
          control.patchValue({ quantity: 1 }, { emitEvent: false });
        }
      } else {
        const group = new FormGroup({
          entryGroupNumber: new FormControl(bundle.entryGroupNumber),
          quantity: new FormControl(1, { updateOn: 'blur' }),
        });
        this.form.addControl(controlName, group);
      }

      if (this.readonly) {
        this.form.controls[controlName].disable();
      }
    });
  }

  protected getBundleControlName(item: EntryGroup): string {
    return `bundle_${item.entryGroupNumber?.toString()}`;
  }

  protected getControlName(item: OrderEntry): string {
    return item.entryNumber?.toString() || '';
  }

  removeEntry(item: OrderEntry): void {
    if (this.options.isSaveForLater) {
      this.selectiveCartService.removeEntry(item);
    } else if (this.cartId && this.userId) {
      this.multiCartService.removeEntry(
        this.userId,
        this.cartId,
        item.entryNumber as number
      );
    } else {
      this.activeCartService.removeEntry(item);
    }
    delete this.form.controls[this.getControlName(item)];
  }

  getBundleControl(bundle: EntryGroup): Observable<FormGroup> | undefined {
    return of(<FormGroup>this.form.get(this.getBundleControlName(bundle)));
  }

  getControl(item: OrderEntry): Observable<FormGroup> | undefined {
    return this.form.get(this.getControlName(item))?.valueChanges.pipe(
      // eslint-disable-next-line import/no-deprecated
      startWith(null),
      tap((value) => {
        if (item.updateable && value && !this.readonly) {
          if (this.options.isSaveForLater) {
            this.selectiveCartService.updateEntry(
              value.entryNumber,
              value.quantity
            );
          } else if (this.cartId && this.userId) {
            this.multiCartService.updateEntry(
              this.userId,
              this.cartId,
              value.entryNumber,
              value.quantity
            );
          } else {
            this.activeCartService.updateEntry(
              value.entryNumber,
              value.quantity
            );
          }
        }
      }),
      map(() => <FormGroup>this.form.get(this.getControlName(item)))
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
