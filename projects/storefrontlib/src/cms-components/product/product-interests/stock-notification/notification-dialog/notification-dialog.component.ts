import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductInterestService } from '@spartacus/core';

@Component({
  selector: 'cx-notification-dialog',
  templateUrl: './notification-dialog.component.html',
})
export class NotificationDialogComponent implements OnDestroy {
  selectedChannels: any[];
  subscribeSuccess$: Observable<boolean>;

  constructor(
    public activeModal: NgbActiveModal,
    private productInterestService: ProductInterestService
  ) {}

  ngOnDestroy(): void {
    this.subscribeSuccess$
      .subscribe(success => {
        if (success) {
          this.productInterestService.resetCreateState();
        }
      })
      .unsubscribe();
  }
}
