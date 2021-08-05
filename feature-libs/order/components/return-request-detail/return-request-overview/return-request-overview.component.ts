import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ReturnRequest } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReturnRequestService } from '../return-request.service';

@Component({
  selector: 'cx-return-request-overview',
  templateUrl: './return-request-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnRequestOverviewComponent implements OnInit, OnDestroy {
  constructor(protected returnRequestService: ReturnRequestService) {}

  rma: string;
  subscription: Subscription;

  returnRequest$: Observable<ReturnRequest> = this.returnRequestService
    .getReturnRequest()
    .pipe(tap((returnRequest) => (this.rma = returnRequest.rma ?? '')));

  isCancelling$ = this.returnRequestService.isCancelling$;

  ngOnInit(): void {
    this.subscription = this.returnRequestService.isCancelSuccess$.subscribe(
      (success) => {
        if (success) {
          this.returnRequestService.cancelSuccess(this.rma);
        }
      }
    );
  }

  cancelReturn(returnRequestCode: string): void {
    this.returnRequestService.cancelReturnRequest(returnRequestCode);
  }

  back(): void {
    this.returnRequestService.backToList();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
