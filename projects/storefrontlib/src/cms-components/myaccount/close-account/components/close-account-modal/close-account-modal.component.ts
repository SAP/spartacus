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
  TranslationService,
} from '@spartacus/core';

import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ICON_TYPES } from '../../../../../cms-components/misc/icon/index';

@Component({
  selector: 'cx-close-account-modal',
  templateUrl: './close-account-modal.component.html',
  styleUrls: ['./close-account-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountModalComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPES;

  private subscription = new Subscription();
  userToken$: Observable<UserToken>;
  isLoading$: Observable<boolean>;

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private authService: AuthService,
    private globalMessageService: GlobalMessageService,
    private routingService: RoutingService,
    private translationService: TranslationService
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
      this.closeModal();
      this.translationService
        .translate('closeAccount.message.success')
        .pipe(first())
        .subscribe(text => {
          this.globalMessageService.add(
            text,
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        });
      this.routingService.go({ cxRoute: 'home' });
    }
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }

  closeAccount(userId: string) {
    this.userService.remove(userId);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
