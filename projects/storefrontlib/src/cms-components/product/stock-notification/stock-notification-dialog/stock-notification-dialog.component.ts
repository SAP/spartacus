import { Component, OnDestroy } from '@angular/core';
import { NotificationPreference, UserInterestsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../../../shared/components/modal/modal.service';

@Component({
  selector: 'cx-stock-notification-dialog',
  templateUrl: './stock-notification-dialog.component.html',
})
export class StockNotificationDialogComponent implements OnDestroy {
  subscribeSuccess$: Observable<boolean>;
  enabledPrefs: NotificationPreference[] = [];

  constructor(
    private modalService: ModalService,
    private interestsService: UserInterestsService
  ) {}

  close() {
    this.modalService.dismissActiveModal();
  }

  ngOnDestroy(): void {
    if (this.subscribeSuccess$) {
      this.subscribeSuccess$
        .subscribe((success) => {
          if (success) {
            this.interestsService.resetAddInterestState();
          }
        })
        .unsubscribe();
    }
  }
}
