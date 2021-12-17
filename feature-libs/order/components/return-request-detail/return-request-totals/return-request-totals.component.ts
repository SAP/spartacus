import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ReturnRequest } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ReturnRequestService } from '../return-request.service';

@Component({
  selector: 'cx-return-request-totals',
  templateUrl: './return-request-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnRequestTotalsComponent implements OnDestroy {
  constructor(protected returnRequestService: ReturnRequestService) {}

  returnRequest$: Observable<ReturnRequest> =
    this.returnRequestService.getReturnRequest();

  ngOnDestroy() {
    this.returnRequestService.clearReturnRequest();
  }
}
