import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReturnRequest } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ReturnRequestService } from '../return-request.service';

/**
 * @deprecated since 4.2 - use order lib instead
 */
@Component({
  selector: 'cx-return-request-items',
  templateUrl: './return-request-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnRequestItemsComponent {
  constructor(protected returnRequestService: ReturnRequestService) {}

  returnRequest$: Observable<ReturnRequest> =
    this.returnRequestService.getReturnRequest();
}
