import { Component, OnInit } from '@angular/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { IntendedPickupLocationFacade } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-pickup-delivery-info-container',
  templateUrl: './pickup-delivery-info-container.component.html',
  styleUrls: ['./pickup-delivery-info-container.component.scss'],
})
export class PickupDeliveryInfoContainerComponent implements OnInit {
  cart$: Observable<Cart>;
  constructor(
    protected readonly activeCartService: ActiveCartFacade,
    protected readonly intendedPickupLocationService: IntendedPickupLocationFacade
  ) {}
  ngOnInit(): void {
    this.cart$ = this.activeCartService.getActive();
    this.cart$.subscribe((data) => console.log('cart', data));

    this.intendedPickupLocationService
      .getIntendedLocation('300310300')
      .subscribe((code) => {
        console.log('location', code);
      });
  }
}
