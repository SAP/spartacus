import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  QuickOrderFacade,
  QuickOrderFormConfig,
} from '@spartacus/cart/quick-order/root';
import { Product, WindowRef } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
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
  results$: Observable<Product[]>;

  get isDisabled(): boolean {
    return this._disabled;
  }

  @Input('isDisabled') set isDisabled(value: boolean) {
    this._disabled = value;
    this.validateProductControl(value);
  }

  get isLoading(): boolean {
    return this._loading;
  }

  @Input('isLoading') set isLoading(value: boolean) {
    this._loading = value;
    this.validateProductControl(value);
  }

  protected subscription = new Subscription();
  protected _disabled: boolean = false;
  protected _loading: boolean = false;
  protected _focusedElementIndex: number | null = null;
  protected _results: Product[] = [];

  constructor(
    public config: QuickOrderFormConfig,
    protected cd: ChangeDetectorRef,
    protected quickOrderService: QuickOrderFacade,
    protected winRef: WindowRef
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.subscription.add(this.watchProductAdd());
    this.subscription.add(this.watchQueryChange());
  }

  onBlur(element?: Element): void {
    if (element) {
      if (
        (element?.className || '').includes('quick-order-results-products') ||
        (element?.className || '').includes('quick-order-form-reset-icon')
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
      this.cd.detectChanges();
    }
  }

  add(product: Product, event?: Event): void {
    event?.preventDefault();
    this.quickOrderService.addProduct(product);
  }

  addProduct(event: Event): void {
    const activeProductIndex = this.getFocusedElementIndex();

    // Add product if there is focus on it
    if (activeProductIndex !== null) {
      const product = this._results[activeProductIndex];
      this.add(product, event);
      // Add product if there is only one in the result list
    } else if (this._results.length === 1) {
      this.add(this._results[0], event);
    }
  }

  focusNextChild(): void {
    if (!this.isResultsBoxOpen()) {
      return;
    }

    const activeFocusedElementIndex = this.getFocusedElementIndex();

    if (
      activeFocusedElementIndex === null ||
      this._results.length - 1 === activeFocusedElementIndex
    ) {
      this.setFocusedElementIndex(0);
    } else {
      this.setFocusedElementIndex(activeFocusedElementIndex + 1);
    }
  }

  focusPreviousChild(): void {
    if (!this.isResultsBoxOpen()) {
      return;
    }

    const activeFocusedElementIndex = this.getFocusedElementIndex();

    if (activeFocusedElementIndex === null || activeFocusedElementIndex === 0) {
      this.setFocusedElementIndex(this._results.length - 1);
    } else {
      this.setFocusedElementIndex(activeFocusedElementIndex - 1);
    }
  }

  getFocusedElementIndex(): number | null {
    return this._focusedElementIndex;
  }

  isResultsBoxOpen(): boolean {
    return !!this._results.length;
  }

  setResults(results: Product[]): void {
    this._results = results;
  }

  setFocusedElementIndex(value: number | null): void {
    this._focusedElementIndex = value;
  }

  protected resetFocusedElementIndex(): void {
    this._focusedElementIndex = null;
  }

  protected open(): void {
    this.toggleBodyClass('quick-order-searchbox-is-active', true);
  }

  protected toggleBodyClass(className: string, add?: boolean) {
    if (add === undefined) {
      this.winRef.document.body.classList.toggle(className);
    } else {
      add
        ? this.winRef.document.body.classList.add(className)
        : this.winRef.document.body.classList.remove(className);
    }
  }

  protected buildForm() {
    const form = new FormGroup({});
    form.setControl('product', new FormControl(null));

    this.form = form;
    this.validateProductControl(this.isDisabled);
  }

  protected isEmpty(product?: string): boolean {
    return product?.trim() === '' || product == null;
  }

  protected watchQueryChange(): Subscription {
    return this.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        filter((value) => {
          if (this.config.quickOrderForm) {
            //Check if input to quick order is an empty after deleting input manually
            if (this.isEmpty(value.product)) {
              //Clear recommendation results on empty string
              this.clear();
              return false;
            }
            return (
              !!value.product &&
              value.product.length >=
                this.config.quickOrderForm.minCharactersBeforeRequest
            );
          }

          return value;
        })
      )
      .subscribe((value) => {
        this.searchProducts(value.product);
        this.open();
        this.cd.detectChanges();
      });
  }

  protected searchProducts(query: string): void {
    this.results$ = this.quickOrderService
      .search(query, this.config?.quickOrderForm?.maxProducts)
      .pipe(
        tap((products: Product[]) => {
          this._results = products;
          this.resetFocusedElementIndex();
        })
      );
  }

  protected clearResults(): void {
    this.results$ = of([]);
    this._results = [];
  }

  protected close(): void {
    this.resetFocusedElementIndex();
    this.clearResults();
  }

  protected watchProductAdd(): Subscription {
    return this.quickOrderService
      .getProductAdded()
      .subscribe(() => this.clear());
  }

  protected validateProductControl(isDisabled: boolean): void {
    if (isDisabled) {
      this.form?.get('product')?.disable();
    } else {
      this.form?.get('product')?.enable();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
