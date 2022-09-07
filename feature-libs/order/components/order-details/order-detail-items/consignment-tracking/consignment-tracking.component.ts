import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  Consignment,
  ConsignmentTracking,
  OrderHistoryFacade,
} from '@spartacus/order/root';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  ModalRef,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-consignment-tracking',
  templateUrl: './consignment-tracking.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsignmentTrackingComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  consignmentStatus: string[] = [
    'SHIPPED',
    'IN_TRANSIT',
    'DELIVERY_COMPLETED',
    'DELIVERY_REJECTED',
    'DELIVERING',
  ];
  modalRef: ModalRef;
  @ViewChild('element') element: ElementRef;

  @Input()
  consignment: Consignment;
  @Input()
  orderCode: string;
  consignmentTracking$: Observable<ConsignmentTracking>;

  constructor(
    private orderHistoryFacade: OrderHistoryFacade,
    private launchDialogService: LaunchDialogService,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.consignmentTracking$ =
      this.orderHistoryFacade.getConsignmentTracking();
  }

  openTrackingDialog(consignment: Consignment) {
    if (consignment.code) {
      this.orderHistoryFacade.loadConsignmentTracking(
        this.orderCode,
        consignment.code
      );
    }
    let modalInstanceData = {
      tracking$: this.consignmentTracking$,
      shipDate: consignment.statusDate,
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CONSIGNMENT_TRACKING,
      this.element,
      this.vcr,
      modalInstanceData
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.orderHistoryFacade.clearConsignmentTracking();
    this.subscription?.unsubscribe();
  }
}
