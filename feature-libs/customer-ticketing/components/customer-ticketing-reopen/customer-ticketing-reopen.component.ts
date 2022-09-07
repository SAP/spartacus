import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { STATUS } from '@spartacus/customer-ticketing/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CustomerTicketingDetailsService } from '../customer-ticketing-details.service';

@Component({
  selector: 'cx-customer-ticketing-reopen',
  templateUrl: './customer-ticketing-reopen.component.html',
})
export class CustomerTicketingReopenComponent implements OnDestroy {
  protected subscription = new Subscription();

  @ViewChild('element') element: ElementRef;

  enableReopenButton$: Observable<boolean | undefined> = combineLatest([
    this.customerTicketingDetailsService.getTicketStatus(),
    this.customerTicketingDetailsService.getAvailableTransitionStatus(),
  ]).pipe(
    map(
      ([ticketStatus, availableStatus]) =>
        ticketStatus === STATUS.CLOSE &&
        availableStatus?.some(
          (status) =>
            status.id.toUpperCase() === STATUS.INPROCESS ||
            status.id.toUpperCase() === STATUS.OPEN
        )
    )
  );

  constructor(
    protected customerTicketingDetailsService: CustomerTicketingDetailsService,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  openDialog() {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CUSTOMER_TICKETING_REOPEN,
      this.element,
      this.vcr
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
