import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import {
  Config,
  GlobalMessageService,
  Product,
  WindowRef,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  take,
} from 'rxjs/operators';

@Component({
  selector: 'cx-quick-order-form',
  templateUrl: './quick-order-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  iconTypes = ICON_TYPE;
  isSearching: boolean = false;
  noResults: boolean = false;
  results: Product[] = [];

  @Input()
  isDisabled = false;

  @Input()
  isLoading = false;

  protected subscription = new Subscription();
  protected _disabled: boolean = false;
  protected _loading: boolean = false;
  protected _focusedElementIndex: number | null = null;

  /**
   * @deprecated since version 4.2
   * Use constructor(globalMessageService: GlobalMessageService, quickOrderService: QuickOrderFacade, config: Config, cd: ChangeDetectorRef, winRef: WindowRef); instead
   */
  // TODO(#14058): Remove deprecated constructor
  constructor(
    globalMessageService: GlobalMessageService,
    quickOrderService: QuickOrderFacade
  );

  constructor(
    protected globalMessageService: GlobalMessageService, // TODO(#14058): Remove it as it is not in use anymore
    protected quickOrderService: QuickOrderFacade,
    public config?: Config, // TODO(#14058): Make it required
    protected cd?: ChangeDetectorRef, // TODO(#14058): Make it required
    protected winRef?: WindowRef // TODO(#14058): Make it required
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.subscription.add(this.watchProductAdd());
    this.subscription.add(this.watchQueryChange());
  }

  onBlur(element?: Element): void {
    if (element) {
      if (
        (element.className || '').includes('quick-order-results-products') ||
        (element.className || '').includes('quick-order-form-reset-icon')
      ) {
        return;
      }
    }

    this.close();
  }

  clear(event?: Event): void {
    event?.preventDefault();

    if (this.isResultsBoxOpen()) {
      this.toggleBodyClass('quick-order-searchbox-is-active', false);

      let product = this.form.get('product')?.value;

      if (!!product) {
        this.form.reset();
      }

      // We have to call 'close' method every time to make sure results list is empty and call detectChanges to change icon type in form
      this.close();
      this.cd?.detectChanges();
    }
  }

  add(product: Product, event: Event): void {
    event?.preventDefault();

    // TODO change to nonpurchasable flag once we will support multidimensional products in search and when the purchasable flag will be available in search product response

    // Check if product is purchasable / non multidimensional
    if (product.multidimensional) {
      this.quickOrderService.setNonPurchasableProductError(product);
      this.clear();
      return;
    } else {
      this.quickOrderService.clearNonPurchasableProductError();
    }

    this.quickOrderService.addProduct(product);
  }

  addProduct(event: Event): void {
    this.quickOrderService
      .canAdd()
      .pipe(take(1))
      .subscribe((canAdd: boolean) => {
        if (canAdd) {
          const activeProductIndex = this.getFocusedElementIndex();

          // Add product if there is focus on it
          if (activeProductIndex !== null) {
            const product = this.results[activeProductIndex];
            this.add(product, event);
            // Add product if there is only one in the result list
          } else if (this.results.length === 1) {
            this.add(this.results[0], event);
          }
        }
      });
  }

  focusNextChild(): void {
    if (!this.results.length) {
      return;
    }

    const activeFocusedElementIndex = this.getFocusedElementIndex();

    if (
      activeFocusedElementIndex === null ||
      this.results.length - 1 === activeFocusedElementIndex
    ) {
      this.setFocusedElementIndex(0);
    } else {
      this.setFocusedElementIndex(activeFocusedElementIndex + 1);
    }
  }

  focusPreviousChild(): void {
    if (!this.results.length) {
      return;
    }

    const activeFocusedElementIndex = this.getFocusedElementIndex();

    if (activeFocusedElementIndex === null || activeFocusedElementIndex === 0) {
      this.setFocusedElementIndex(this.results.length - 1);
    } else {
      this.setFocusedElementIndex(activeFocusedElementIndex - 1);
    }
  }

  getFocusedElementIndex(): number | null {
    return this._focusedElementIndex;
  }

  isResultsBoxOpen(): boolean {
    return !!(this.results.length || this.noResults);
  }

  setResults(results: Product[]): void {
    this.results = results;
  }

  setFocusedElementIndex(value: number | null): void {
    this._focusedElementIndex = value;
  }

  canAddProduct(): Observable<boolean> {
    return this.quickOrderService.canAdd();
  }

  protected resetFocusedElementIndex(): void {
    this._focusedElementIndex = null;
  }

  protected open(): void {
    this.toggleBodyClass('quick-order-searchbox-is-active', true);
  }

  protected toggleBodyClass(className: string, add?: boolean) {
    // TODO(#14058): Remove condition
    if (this.winRef) {
      if (add === undefined) {
        this.winRef.document.body.classList.toggle(className);
      } else {
        add
          ? this.winRef.document.body.classList.add(className)
          : this.winRef.document.body.classList.remove(className);
      }
    }
  }

  protected buildForm() {
    const form = new FormGroup({});
    form.setControl('product', new FormControl(null));

    this.form = form;
  }

  protected isEmpty(string?: string): boolean {
    return string?.trim() === '' || string == null;
  }

  protected watchQueryChange(): Subscription {
    return this.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        filter((value) => {
          if (this.config?.quickOrder?.searchForm) {
            //Check if input to quick order is an empty after deleting input manually
            if (this.isEmpty(value.product)) {
              //Clear recommendation results on empty string
              this.clear();
              return false;
            }
            return (
              !!value.product &&
              value.product.length >=
                this.config.quickOrder?.searchForm?.minCharactersBeforeRequest
            );
          }

          return value;
        })
      )
      .subscribe((value) => {
        this.searchProducts(value.product);
      });
  }

  protected searchProducts(query: string): void {
    this.canAddProduct()
      .pipe(
        filter(Boolean),
        switchMap(() =>
          this.quickOrderService
            .searchProducts(
              query,
              this.config?.quickOrder?.searchForm?.maxProducts
            )
            .pipe(take(1))
        )
      )
      .subscribe((products) => {
        this.results = products;

        if (this.results.length) {
          this.noResults = false;
        } else {
          this.noResults = true;
        }

        this.open();
        this.resetFocusedElementIndex();
        this.cd?.detectChanges();
      });
  }

  protected clearResults(): void {
    this.results = [];
  }

  protected close(): void {
    this.resetFocusedElementIndex();
    this.clearResults();
    this.noResults = false;
  }

  protected watchProductAdd(): Subscription {
    return this.quickOrderService
      .getProductAdded()
      .subscribe(() => this.clear());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
