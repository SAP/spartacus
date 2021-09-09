import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  CartAddEntrySuccessEvent,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { EventService } from 'projects/core/src/event';
import { WindowRef } from 'projects/core/src/window';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CartToastConfig } from './cart-toast-config';
import { CartToastItem, CART_TOAST_STATE } from './cart-toast.model';
import { CartToastService } from './cart-toast.service';

@Component({
  selector: 'cx-cart-toast',
  templateUrl: './cart-toast.component.html',
})
export class CartToastComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();
  quantity: number;

  /**
   * Custom class name passed to popover component.
   *
   * If this property is not set the default popover class is `cx-popover`.
   */
  customClass?: string;

  /**
   * Binding class name property.
   */
  @HostBinding('className') baseClass: string;

  headerElement: HTMLElement | null;

  toastContainerClass: string;

  timeout: number;

  toastContainerBaseClass = 'toast-container';

  scrollEventUnlistener: () => void;

  cartAddEntrySuccess$: Observable<CartAddEntrySuccessEvent> = this.eventService.get(
    CartAddEntrySuccessEvent
  );

  cartToasts$: Observable<CartToastItem[]> = this.cartToastService.getToasts();

  constructor(
    protected winRef: WindowRef,
    protected cartToastConfig: CartToastConfig,
    protected cartToastService: CartToastService,
    protected eventService: EventService,
    protected productService: ProductService,
    protected renderer: Renderer2,
    protected routerService: RoutingService
  ) {}

  ngOnInit() {
    this.headerElement = this.winRef.document.querySelector('header');
    if (!this.customClass) this.customClass = 'cx-cart-toast';
    this.baseClass = `${this.customClass}`;
    this.toastContainerClass = this.toastContainerBaseClass;
    if (this.cartToastConfig.cartToast?.timeout)
      this.timeout = this.cartToastConfig.cartToast?.timeout;
    else this.timeout = 3000;
    this.subscription.add(
      this.cartAddEntrySuccess$
        .pipe(
          switchMap((cartEntry) => {
            return combineLatest([
              of(cartEntry),
              this.productService.get(cartEntry.productCode),
            ]).pipe(
              filter((result) => result[1] !== undefined),
              map(([cartEntry, product]) => ({
                quantityAdded: cartEntry.quantityAdded,
                product,
              }))
            );
          })
        )
        .subscribe(({ quantityAdded, product }) => {
          let toastContainerClass = `${this.toastContainerBaseClass} `;
          console.log(product);
          const toastItem = this.cartToastService.addToast(
            quantityAdded,
            product,
            toastContainerClass
          );
          // trigger enter animations with class change
          setTimeout(() => {
            toastItem.baseClass = this.getToastStyles();
          });
          this.scrollEventUnlistener && this.scrollEventUnlistener();
          // wait for enter animation end
          setTimeout(() => {
            this.triggerScrollEvent();
          }, 500);
          // trigger slide out animation after timeout
          toastItem.timeoutRef = setTimeout(() => {
            this._closeToast(toastItem);
          }, this.timeout);
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  triggerScrollEvent() {
    this.scrollEventUnlistener = this.renderer.listen(
      this.winRef.nativeWindow,
      'scroll',
      this._setPosition
    );
  }

  isHeaderInView(): boolean {
    if (!this.headerElement) return false;
    const headerBounding = this.headerElement.getBoundingClientRect();
    return headerBounding.bottom >= 0;
  }

  isHeaderFixed() {
    if (!this.headerElement) return false;
    const headerPosition = this.headerElement.style.position;
    return headerPosition === 'fixed';
  }

  closeToast(toastItem: CartToastItem) {
    toastItem.timeoutRef && clearTimeout(toastItem.timeoutRef);
    this._closeToast(toastItem);
  }

  _closeToast = (toastItem: CartToastItem) => {
    this.scrollEventUnlistener();

    toastItem.baseClass = this.getToastStyles(
      CART_TOAST_STATE.CLOSING,
      toastItem.baseClass
    );
    // wait for animation and remove toast
    setTimeout(() => {
      this.cartToastService.removeToast();
    }, 500);
  };

  _setPosition = () => {
    this.cartToastService.setPosition(
      this.getToastStyles(CART_TOAST_STATE.OPENED)
    );
  };

  getToastStyles(
    toastState: CART_TOAST_STATE = CART_TOAST_STATE.OPENING,
    toastBaseClass: string = ''
  ): string {
    let positionClasses = [this.toastContainerBaseClass];
    if (toastState === CART_TOAST_STATE.CLOSING) {
      if (toastBaseClass.includes('transition-none'))
        return toastBaseClass.replace('transition-none', 'close-toast');
      else return (toastBaseClass += ' close-toast');
    }

    if (this.isHeaderFixed()) positionClasses.push('on-fixed-header');
    else if (this.isHeaderInView()) positionClasses.push('on-header');
    else positionClasses.push('off-header');

    if (toastState === CART_TOAST_STATE.OPENED)
      positionClasses.push('transition-none');

    return positionClasses.join(' ');
  }
}
