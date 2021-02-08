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
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/icon.model';
import { ModalService } from '../../../../../shared/components/modal/modal.service';

@Component({
  selector: 'cx-close-account-modal',
  templateUrl: './close-account-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountModalComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;

  private subscription = new Subscription();
  isLoggedIn$: Observable<boolean>;
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
    this.isLoggedIn$ = this.authService.isUserLoggedIn();
    this.userService.resetRemoveUserProcessState();
    this.subscription.add(
      this.userService
        .getRemoveUserResultSuccess()
        .subscribe((success) => this.onSuccess(success))
    );

    this.subscription.add(
      this.userService
        .getRemoveUserResultError()
        .subscribe((error) => this.onError(error))
    );
    this.isLoading$ = this.userService.getRemoveUserResultLoading();
  }

  onSuccess(success: boolean): void {
    if (success) {
      this.dismissModal();
      this.translationService
        .translate('closeAccount.accountClosedSuccessfully')
        .pipe(first())
        .subscribe((text) => {
          this.globalMessageService.add(
            text,
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        });
      this.routingService.go({ cxRoute: 'home' });
    }
  }

  onError(error: boolean): void {
    if (error) {
      this.dismissModal();
      this.translationService
        .translate('closeAccount.accountClosedFailure')
        .pipe(first())
        .subscribe((text) => {
          this.globalMessageService.add(text, GlobalMessageType.MSG_TYPE_ERROR);
        });
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
