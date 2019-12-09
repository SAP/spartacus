import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReturnRequest } from '@spartacus/core';
import { ReturnRequestService } from '../return-request.service';

@Component({
  selector: 'cx-return-request-overview',
  templateUrl: './return-request-overview.component.html',
})
export class ReturnRequestOverviewComponent {
  constructor(protected returnRequestService: ReturnRequestService) {}

  returnRequstCode: string;

  returnRequest$: Observable<
    ReturnRequest
  > = this.returnRequestService
    .getReturnRequest()
    .pipe(tap(returnRequest => (this.returnRequstCode = returnRequest.rma)));

  cancelReturn(): void {
    this.returnRequestService.cancelReturnRequest(this.returnRequstCode);
  }
}
