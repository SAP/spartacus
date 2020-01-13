import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ReturnRequest } from '@spartacus/core';
import { ReturnRequestService } from '../return-request.service';

@Component({
  selector: 'cx-return-request-totals',
  templateUrl: './return-request-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnRequestTotalsComponent implements OnDestroy {
  constructor(protected returnRequestService: ReturnRequestService) {}

  returnRequest$: Observable<
    ReturnRequest
  > = this.returnRequestService.getReturnRequest();

  ngOnDestroy() {
    this.returnRequestService.clearReturnRequest();
  }
}
