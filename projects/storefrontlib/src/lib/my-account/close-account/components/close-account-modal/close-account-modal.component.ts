import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  UserService,
  UserToken,
  GlobalMessageService,
  RoutingService,
  GlobalMessageType,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import i18next from 'i18next';

@Component({
  selector: 'cx-close-modal-account',
  templateUrl: './close-account-modal.component.html',
  styleUrls: ['./close-account-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountModalComponent implements OnInit {
  private subscription = new Subscription();
  userToken$: UserToken;

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private globalMessageService: GlobalMessageService,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
    this.userService.resetRemoveUserProcessState();
    this.subscription.add(
      this.userService
        .getRemoveUserResultSuccess()
        .subscribe(success => this.onSuccess(success))
    );
  }

  onSuccess(success: boolean): void {
    if (success) {
      this.globalMessageService.add({
        text: `${i18next.t('closeAccount:closeAccount.message.success')}`,
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      });
      this.routingService.go({ route: ['home'] });
    }
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }

  closeAccount(userId: string) {
    this.userService.remove(userId);
    this.closeModal();
  }
}
