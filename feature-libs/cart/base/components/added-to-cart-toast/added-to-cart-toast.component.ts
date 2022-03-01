import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  EventService,
  ProductService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AddedToCartToastConfig } from '../../../added-to-cart-toast/added-to-cart-toast-config';

import { CartUiEventAddToCart } from '../../root';
import { AddedToCartToastComponentService } from './added-to-cart-toast-component.service';
import { CartToastItem, CART_TOAST_STATE } from './added-to-cart-toast.model';

@Component({
  selector: 'cx-added-to-cart-toast',
  templateUrl: './added-to-cart-toast.component.html',
})
export class AddedToCartToastComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();

  quantity: number;

  customClass?: string;

  headerElement: HTMLElement | null;

  toastContainerClass: string;

  timeout: number;

  toastContainerBaseClass = 'toast-container';

  scrollEventUnlistener: () => void;

  @HostBinding('className') baseClass: string;

  cartToasts$: Observable<
    CartToastItem[]
  > = this.addedToCartToastService.getToasts();

  constructor(
    protected winRef: WindowRef,
    protected addedToCartToastConfig: AddedToCartToastConfig,
    protected addedToCartToastService: AddedToCartToastComponentService,
    protected eventService: EventService,
    protected productService: ProductService,
    protected renderer: Renderer2,
    protected routerService: RoutingService,
    protected cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.headerElement = this.winRef.document.querySelector('header');

    if (!this.customClass) {
      this.customClass = 'cx-added-cart-toast';
    }

    this.baseClass = `${this.customClass}`;
    this.toastContainerClass = this.toastContainerBaseClass;

    if (this.addedToCartToastConfig.addedToCartToast?.timeout) {
      this.timeout = this.addedToCartToastConfig.addedToCartToast?.timeout;
    } else {
      this.timeout = 3000;
    }

    // this.watchCartAddEntrySuccess();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addToast(event: CartUiEventAddToCart) {
    this.productService
      .get(event.productCode)
      .pipe(filter(Boolean))
      .subscribe((product) => {
        let toastContainerClass = `${this.toastContainerBaseClass} `;
        const toastItem = this.addedToCartToastService.addToast(
          event.quantity,
          product,
          toastContainerClass
        );

        this.cd.detectChanges();

        // trigger enter animations with class change
        toastItem.baseClass = this.getToastStyles();

        if (this.scrollEventUnlistener) {
          this.scrollEventUnlistener();
        }

        // wait for enter animation end
        setTimeout(() => {
          this.triggerScrollEvent();
        }, 500);

        // trigger slide out animation after timeout
        toastItem.timeoutRef = setTimeout(() => {
          this._closeToast(toastItem);
        }, this.timeout);
      });
  }

  triggerScrollEvent(): void {
    this.scrollEventUnlistener = this.renderer.listen(
      this.winRef.nativeWindow,
      'scroll',
      this._setPosition
    );
  }

  isHeaderInView(): boolean {
    if (!this.headerElement) {
      return false;
    }
    const headerBounding = this.headerElement.getBoundingClientRect();
    return headerBounding.bottom >= 0;
  }

  isHeaderFixed() {
    if (!this.headerElement) return false;
    const headerPosition = this.headerElement.style.position;
    return headerPosition === 'fixed';
  }

  closeToast(toastItem: CartToastItem) {
    if (toastItem.timeoutRef) {
      clearTimeout(toastItem.timeoutRef);
    }
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
      this.addedToCartToastService.removeToast();
    }, 500);
  };

  _setPosition = () => {
    this.addedToCartToastService.setPosition(
      this.getToastStyles(CART_TOAST_STATE.OPENED)
    );
  };

  getToastStyles(
    toastState: CART_TOAST_STATE = CART_TOAST_STATE.OPENING,
    toastBaseClass: string = ''
  ): string {
    let positionClasses = [this.toastContainerBaseClass];

    if (toastState === CART_TOAST_STATE.CLOSING) {
      if (toastBaseClass.includes('transition-none')) {
        return toastBaseClass.replace('transition-none', 'close-toast');
      } else {
        return (toastBaseClass += ' close-toast');
      }
    }

    if (this.isHeaderFixed()) {
      positionClasses.push('on-fixed-header');
    } else if (this.isHeaderInView()) {
      positionClasses.push('on-header');
    } else {
      positionClasses.push('off-header');
    }

    if (toastState === CART_TOAST_STATE.OPENED) {
      positionClasses.push('transition-none');
    }

    return positionClasses.join(' ');
  }
}
