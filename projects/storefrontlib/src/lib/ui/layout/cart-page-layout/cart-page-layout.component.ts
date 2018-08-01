import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { CartDetailsComponent } from '../../../cart/components/cart-details/container/cart-details.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'y-cart-page-layout',
  templateUrl: './cart-page-layout.component.html',
  styleUrls: ['./cart-page-layout.component.scss']
})
export class CartPageLayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild(CartDetailsComponent)
  cartDetail: CartDetailsComponent;

  cart: any;
  subscription: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.subscription = this.cartDetail.cart$.subscribe(data => {
      this.cart = data;
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
