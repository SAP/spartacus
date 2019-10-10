import { Component, OnDestroy } from '@angular/core';
import { NotificationPreference } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../../../shared';

@Component({
  selector: 'cx-stock-notification-dialog',
  templateUrl: './stock-notification-dialog.component.html',
})
export class StockNotificationDialogComponent implements OnDestroy {
  
  subscribeSuccess$: Observable<boolean>;
  enabledPrefs: NotificationPreference[] = [];

  constructor(
    private modalService: ModalService,
  ) {}


  close(){
    this.modalService.closeActiveModal();
  }

  ngOnDestroy(): void {
    if(this.subscribeSuccess$){
      this.subscribeSuccess$.subscribe(success=>{
        if(success){
//
        }
      }).unsubscribe();
    }
  }

}
