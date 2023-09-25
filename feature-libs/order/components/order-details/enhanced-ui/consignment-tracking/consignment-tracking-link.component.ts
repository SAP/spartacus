import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { OrderDetailsService } from '../../order-details.service';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Consignment } from '@spartacus/order/root';

@Component({
  selector: 'cx-consignment-tracking-link',
  templateUrl: './consignment-tracking-link.component.html',
  host: { class: 'cx-list-header col-12' },
})
export class ConsignmentTrackingLinkComponent implements OnInit, OnDestroy {
  consignment: Consignment;
  protected subscription = new Subscription();
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef,
    protected cd: ChangeDetectorRef,
    protected outlet?: OutletContextData<{
      item?: Consignment;
    }>
  ) {}
  @ViewChild('element') element: ElementRef;
  consignmentStatus: string[] = this.orderDetailsService.consignmentStatus;
  ngOnInit(): void {
    this.subscription.add(
      this.outlet?.context$.subscribe((context) => {
        if (context.item !== undefined) {
          this.consignment = context.item;
        }
        this.cd.markForCheck();
      })
    );
  }
  openTrackingDialog() {
    const modalInstanceData = {
      tracking$: of(this.consignment.tracking),
      shipDate: this.consignment.statusDate,
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CONSIGNMENT_TRACKING,
      this.element,
      this.vcr,
      modalInstanceData
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
