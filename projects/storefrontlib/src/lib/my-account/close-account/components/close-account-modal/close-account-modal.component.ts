import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserService,
  UserToken,
  AuthService,
} from '@spartacus/core';

import { Observable, Subscription } from 'rxjs';

import i18next from 'i18next';

@Component({
  selector: 'cx-close-account-modal',
  templateUrl: './close-account-modal.component.html',
  styleUrls: ['./close-account-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountModalComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  userToken$: Observable<UserToken>;
  isLoading$: Observable<boolean>;

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private authService: AuthService,
    private globalMessageService: GlobalMessageService,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
    this.userToken$ = this.authService.getUserToken();
    this.userService.resetRemoveUserProcessState();
    this.subscription.add(
      this.userService
        .getRemoveUserResultSuccess()
        .subscribe(success => this.onSuccess(success))
    );
    this.isLoading$ = this.userService.getRemoveUserResultLoading();
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
