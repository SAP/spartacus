import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  TranslationService,
  UserService,
  UserToken,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/index';
import { ModalService } from '../../../../../shared/components/modal/index';

@Component({
  selector: 'cx-close-account-modal',
  templateUrl: './close-account-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountModalComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;

  private subscription = new Subscription();
  userToken$: Observable<UserToken>;
  isLoading$: Observable<boolean>;

  constructor(
    protected modalService: ModalService,
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
      this.dismissModal();
      this.translationService
        .translate('closeAccount.accountClosedSuccessfully')
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

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }

  closeAccount() {
    this.userService.remove();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
