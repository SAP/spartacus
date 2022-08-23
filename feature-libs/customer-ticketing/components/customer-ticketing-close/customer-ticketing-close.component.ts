import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  CustomerTicketingDialogType,
  STATUS,
} from '@spartacus/customer-ticketing/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CustomerTicketingDataService } from '../customer-ticketing-data.service';

@Component({
  selector: 'cx-customer-ticketing-close',
  templateUrl: './customer-ticketing-close.component.html',
})
export class CustomerTicketingCloseComponent implements OnDestroy {
  protected subscription = new Subscription();

  @ViewChild('element') element: ElementRef;

  isStatusOpen$: Observable<boolean> = this.customerTicketingDataService
    .getTicketStatus()
    .pipe(
      map((status) => status === STATUS.OPEN || status === STATUS.INPROCESS)
    );

  constructor(
    protected customerTicketingDataService: CustomerTicketingDataService,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  openDialog() {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CUSTOMER_TICKETING,
      this.element,
      this.vcr,
      { layoutOption: CustomerTicketingDialogType.CLOSE }
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
