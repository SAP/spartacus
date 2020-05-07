import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ReturnRequest } from '@spartacus/core';
import { ReturnRequestService } from '../return-request.service';

@Component({
  selector: 'cx-return-request-items',
  templateUrl: './return-request-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnRequestItemsComponent {
  constructor(protected returnRequestService: ReturnRequestService) {}

  returnRequest$: Observable<
    ReturnRequest
  > = this.returnRequestService.getReturnRequest();
}
