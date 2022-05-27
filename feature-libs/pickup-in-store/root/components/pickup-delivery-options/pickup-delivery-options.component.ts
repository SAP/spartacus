import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AddToCartContainerContext } from '@spartacus/cart/base/components/add-to-cart';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { PickupInStoreFacade } from '../../facade/pickup-in-store.facade';

@Component({
  selector: 'cx-pickup-delivery-options',
  templateUrl: './pickup-delivery-options.component.html',
})
export class PickupDeliveryOptionsComponent implements OnInit, OnDestroy {
  @ViewChild('open') element: ElementRef;
  subscription = new Subscription();

  private productCode: string;

  constructor(
    protected pickupInStoreFacade: PickupInStoreFacade,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef,
    @Optional() protected outlet?: OutletContextData<AddToCartContainerContext>
  ) {}

  ngOnInit() {
    this.pickupInStoreFacade.getStore();
    this.outlet?.context$.subscribe(
      ({ productCode }) => (this.productCode = productCode)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.PICKUP_IN_STORE,
      this.element,
      this.vcr,
      { msg: 'London', productCode: this.productCode }
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }
}
